import { JSOnFhir } from '@i4mi/js-on-fhir';
import { Bundle, Observation, ObservationStatus, Patient } from '@i4mi/fhir_r4';
import moment from 'moment';
import fhirDataJson from '../data/fhirData.json';
import { Notify } from 'quasar';

// import moment library. More information under https://momentjs.com
const now = moment();

/**
 * ENUM for all the supported Observation Types of the application
 */
export const enum ObservationType {
  BODY_TEMPERATURE = 'Body temperature',
  HEART_RATE = 'Heartrate',
  BLOOD_PRESSURE = 'Blood Pressure'
}

export default class MidataService {
  jsOnFhir: JSOnFhir;

  constructor() {
    this.jsOnFhir = new JSOnFhir(
      process.env.VUE_FHIR_BASE_URL,
      process.env.VUE_FHIR_APP_NAME,
      process.env.VUE_FHIR_REDIRECT_URL
    );
  }

  /**
   * Returns the jsOnFhir object for making direct method calls.
   * @returns the jsOnFhir as JSON.
   */
  public getJSonFhir(): JSOnFhir {
    return this.jsOnFhir;
  }

  /**
   * Checks that the token isn't empty and hasn't expired yet. Therefore returns the status of the login status.
   * @returns true if the user is logged in (token valid and not expired yet) and false otherwise.
   */
  public isLoggedIn(): boolean {
    return this.jsOnFhir.isLoggedIn();
  }

  /**
   * Logs the user out by resetting authentification details.
   */
  public logout(): void {
    this.jsOnFhir.logout();
  }

  /**
   * Initiates the oAuth process.
   * @param params
   */
  public authenticate(params?: {[p: string]: string}): void {
    this.jsOnFhir.authenticate(params);
  }

  /**
   * Handles the response of oAuth portal (server).
   * @returns a promise:
   *              - if successfull -> response of the oAuth portal (server) includes: token, refreshtoken etc.
   *              - if not successfull -> error response.
   */
  public handleAuthResponse(): Promise<any> {
    return this.jsOnFhir.handleAuthResponse();
  }

  /**
   * Gets the patient resource from the fhir endpoint.
   * @returns patient resource as JSON
   */
  public getPatientResource(): Promise<Patient> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .getResource('Patient', this.jsOnFhir.getUserId())
        .then((result) => {
          if (result.resourceType === 'Patient'){
            resolve(result as Patient)
          }
          else {
            reject('No Patient resource found');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Gets the observation resources as bundle from the fhir endpoint.
   * @returns bundle with observation resources as JSON.
   */
  getObservationResourcesAsBundle(): Promise<Bundle> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Observation')
        .then((result) => {
          result.entry?.length > 0
            ? resolve(result)
            : reject('No entries in observation bundle found!');
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Gets all observations from the fhir endpoint that do not have the status
   * "ENTERED_IN_ERROR"
   * @returns bundle with observations
   */
  public async loadObservations() {
      const result = await this.jsOnFhir.search('Observation');
      const observations = result.entry?.map(entry => entry.resource as Observation) || [];
      return observations.filter(obs => obs.status !== ObservationStatus.ENTERED_IN_ERROR);
  }

  /**
   * searches the fhir endpoint for one or more resources.
   * @param resourceType resource type to look up
   * @param params search parameters according to fhir resource guide (not mandatory)
   * @returns a promise:
   *              - if successfull -> response with resource(s) as JSON
   *              - if not successfull -> error message
   */
  search(resourceType: any, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.search(resourceType, params).then((result) => {
        result ? resolve(result) : reject('Error');
      }).catch((error)=> reject(error));
    });
  }

  /**
   * searches the fhir endpoint for one resource with the id.
   * @param resourceType resource type to look up
   * @param _id The id of the fhir resource
   * @returns a promise:
   *              - if successfull -> response with resource(s) as JSON
   *              - if not successfull -> error message
   */
  searchWithId(resourceType: any, _id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.getResource(resourceType, _id).then((result) => {
        result ? resolve(result) : reject('Error');
      }).catch((error)=> reject(error));
    });
  }

  /**
   * Creates an observation resource on the fhir server
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite String representing the bodySite of the Observation.
   * Needs to be present in the fhirData.json file
   * @param value the measured body temperature value.
   * @param observationType Type of the Observation (ObservationType enum)
   * @param dateString String representing a by momentJS readable date
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number,
    observationType: ObservationType,
    dateString: string = now.format()
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {

      let observation;
      if (observationType == ObservationType.BODY_TEMPERATURE){
        observation = this.newBtObservation(_status, bodySite, value, dateString);
      }
      else if (observationType == ObservationType.HEART_RATE){
        observation = this.newHrObservation(_status, bodySite, value, dateString);
      }
      else {
        throw new Error('No matching ObservationType found for creating an Observation')
      }
      this.jsOnFhir.create(observation).then((result) => {
        result ? resolve(result as Observation) : reject('internal error');
      }).catch((error)=> reject(error));
    });
  }

  /**
   * Updates an observation (of type bodytemperature) resource on the fhir server.
   * @param _id identification for the observation to be updated.
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @param observationType Type of the fhir Observation
   * @param observationStatus optional status for Observation. The default is
   * ObservationStatus.PRELIMINARY
   * @returns a promise:
   *              - if successfull -> response with the updated resource as JSON
   *              - if not successfull -> error message
   */
  updateObservation(
    _id: string,
    bodySite: string,
    value: number,
    observationType: ObservationType,
    observationStatus: ObservationStatus = ObservationStatus.PRELIMINARY
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.getResource('Observation', _id).then((result) => {
        if (result) {
          const fhirObservation = result as Observation;
          fhirObservation.valueQuantity.value = value;
          fhirObservation.bodySite = this.getBodySiteFromJson(bodySite, observationType);
          fhirObservation.method = this.getMethodFromJson(bodySite, observationType);
          fhirObservation.issued = now.format();
          fhirObservation.status = observationStatus
          this.jsOnFhir
            .update(fhirObservation)
            .then((res) => {
              resolve(res as Observation);
            })
            .catch((error: Error) => {
              console.warn('Could not update observation ' + _id, error);
              reject(error);
            });
        } else {
          reject(
            new Error(
              'Invalid observation id: Observation ' + _id + ' was not found.'
            )
          );
        }
      }).catch((error)=> reject(error));
    });
  }

  /**
   * Creates an observation (of type body temperature)
   * @param _status the status of the observation
   * according to: http://hl7.org/fhir/observation-status
   * @param bodySite String representing the bodySite of the Observation.
   * Needs to be present in the fhirData.json file
   * @param value the measured body temperature value.
   * @param dateString String representing a by momentJS readable date
   * @returns
   */
  newBtObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number,
    dateString: string
  ): Observation {
    return {
      resourceType: 'Observation',
      status: _status,
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8310-5',
            display: 'Body temperature',
          },
        ],
        text: 'Temperature',
      },
      subject: {
        reference: 'Patient/' + this.jsOnFhir.getUserId(),
      },
      issued: dateString,
      performer: [
        {
          reference: 'Practitioner/mdh0us3',
        },
      ],
      valueQuantity: {
        value: value,
        unit: 'degrees C',
        system: 'http://unitsofmeasure.org',
        code: 'Cel',
      },
      bodySite: this.getBodySiteFromJson(bodySite, ObservationType.BODY_TEMPERATURE),
      method: this.getMethodFromJson(bodySite, ObservationType.BODY_TEMPERATURE),
    };
  }

  /**
   * Creates an observation (of type body heart rate)
   * @param _status the status of the observation
   * according to: http://hl7.org/fhir/observation-status
   * @param bodySite String representing the bodySite of the Observation
   * Needs to be present in the fhirData.json file
   * @param value the measured heart rate value
   * @param dateString String representing a by momentJS readable date
   * @returns
   */
  newHrObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number,
    dateString: string
  ): Observation {
    return {
      resourceType: 'Observation',
      status: _status,
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8867-4',
            display: 'Heart rate',
          },
        ],
        text: 'Heart rate',
      },
      subject: {
        reference: 'Patient/' + this.jsOnFhir.getUserId(),
      },
      issued: dateString,
      performer: [
        {
          reference: 'Practitioner/mdh0us3',
        },
      ],
      valueQuantity: {
        value: value,
        unit: '{beats}/min',
        system: 'http://unitsofmeasure.org',
        code: '{beats}/min',
      },
      bodySite: this.getBodySiteFromJson(bodySite, ObservationType.HEART_RATE),
      method: this.getMethodFromJson(bodySite, ObservationType.HEART_RATE),
    };
  }

  /**
   * Creates an observation (of type blood pressure)
   * @param _status the status of the observation
   * according to: http://hl7.org/fhir/observation-status
   * @param bodySite String representing the bodySite of the Observation
   * Needs to be present in the fhirData.json file
   * @param valueSystolic Systolic blood pressure value in mmHg
   * @param valueDiastolic Diastolic blood pressure value in mmHg
   * @param dateString String representing a by momentJS readable date
   * @returns
   * @returns
   */
  newBpObservation(
    _status: ObservationStatus,
    bodySite: string,
    valueSystolic: number,
    valueDiastolic: number,
    dateString: string
  ): Observation {
    return {
      resourceType: 'Observation',
      status: _status,
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '85354-9',
            display: 'Blood pressure panel with all children optional',
          },
        ],
        text: 'Blood pressure systolic & diastolic',
      },
      subject: {
        reference: 'Patient/' + this.jsOnFhir.getUserId(),
      },
      issued: dateString,
      performer: [
        {
          reference: 'Practitioner/mdh0us3',
        },
      ],
      component: [
        {
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271649006',
                display: 'Systolic blood pressure'
              }
            ]
          },
          valueQuantity: {
            value: valueSystolic,
            unit: 'mmHg',
            system: 'http://unitsofmeasure.org',
            code: 'mm[Hg]'
          }
        },
        {
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '8462-4',
                display: 'Diastolic blood pressure'
              }
            ]
          },
          valueQuantity: {
            value: valueDiastolic,
            unit: 'mmHg',
            system: 'http://unitsofmeasure.org',
            code: 'mm[Hg]'
          }
        }
      ],
      bodySite: this.getBodySiteFromJson(bodySite, ObservationType.BLOOD_PRESSURE),
      method: this.getMethodFromJson(bodySite, ObservationType.BLOOD_PRESSURE),
    };
  }

  /**
   * Function for getting a fhir Body site object from a given
   * bodySite string. It searches the fhirDataJson file in the data folder
   * @param bodySite body site String to search with
   * @param observationType
   */
  getBodySiteFromJson(bodySite: string, observationType: ObservationType) {

    let dataArray;
    switch (observationType) {
      case ObservationType.BLOOD_PRESSURE:
        dataArray = fhirDataJson.BLOOD_PRESSURE;
        break;
      case ObservationType.BODY_TEMPERATURE:
        dataArray = fhirDataJson.BODY_TEMPERATURE;
        break;
      case ObservationType.HEART_RATE:
        dataArray = fhirDataJson.HEART_RATE;
        break;
      default:
        throw new Error('No matching Observation Type found')
    }

    for (const data of dataArray) {
      if (data.id === bodySite){
        return data.bodySite
      }
    }
    throw new Error('No matching body Site found in fhirJson')
  }

  /**
   * Function for getting a fhir Observation method object from a given
   * bodySite string. It searches the fhirDataJson file in the data folder
   * @param bodySite body site String to search with
   * @param observationType
   */
  getMethodFromJson(bodySite: string, observationType: ObservationType) {

    let dataArray;
    switch (observationType) {
      case ObservationType.BLOOD_PRESSURE:
        dataArray = fhirDataJson.BLOOD_PRESSURE;
        break;
      case ObservationType.BODY_TEMPERATURE:
        dataArray = fhirDataJson.BODY_TEMPERATURE;
        break;
      case ObservationType.HEART_RATE:
        dataArray = fhirDataJson.HEART_RATE;
        break;
      default:
        throw new Error('No matching Observation Type found')
    }

    for (const data of dataArray) {
      if (data.id === bodySite){
        return data.method
      }
    }
    throw new Error('No matching body Site found in fhirJson')
  }

  /**
   * Generates 16 fhir Observations of Type "body temperature" and "heart rate"
   * and adds them to the Midata Account. The Data is modelled with a progression
   * in mind. The values first rise and then fall of again. There is some noise
   * applied with the Math.random() function to each of the values every time
   * they get generated.
   */
  async generateRandomData() {
    const bodyTemperaturesBase = [36, 36.5, 37, 37.5, 38, 38, 38.5, 39.5, 41, 39, 38.5, 40, 41, 39.5, 38, 36.5]
    const bodyTemperaturesNoised = bodyTemperaturesBase.map(bt => {
      return bt + Math.round(Math.random()*10)/10
    })

    const heartRateBase = [70, 70, 75, 80, 90, 95, 105, 110, 115, 120, 110, 100, 95, 85, 80, 70]
    const heartRateNoised = heartRateBase.map(hr => {
      return hr + Math.round(Math.random()*4)
    })

    const dat = now
    const dates = []
    for (let i = 0; i < heartRateBase.length; i++){
      dat.subtract(Math.round(Math.random()*4), 'h')
      dat.subtract(Math.round(Math.random()*10), 'm')
      dat.subtract(Math.round(Math.random()*10), 's')
      dates.push(dat.format())
    }

    try {
      for (let i = 0; i < heartRateBase.length; i++) {

        await this.createObservation(ObservationStatus.PRELIMINARY,
          this.getRandomBodySite(ObservationType.HEART_RATE),
          heartRateNoised[i],
          ObservationType.HEART_RATE,
          dates[i]);

        await this.createObservation(ObservationStatus.PRELIMINARY,
          this.getRandomBodySite(ObservationType.BODY_TEMPERATURE),
          bodyTemperaturesNoised[i],
          ObservationType.BODY_TEMPERATURE,
          dates[i]);
      }
      Notify.create({
        message: '16 randomisierte Observationen wurden erstellt. Bitte die Seite neu laden',
        color: 'green',
        position: 'top',
        icon: 'announcement'
      });
    } catch (error) {
      Notify.create({
        message: 'Ein Fehler ist aufgetreten beim erstellen der Observationen',
        color: 'green',
        position: 'top',
        icon: 'announcement'
      });
    }
  }

  /**
   * Helper for the generateRandomData() function. It picks a random body site
   * from the options provided in the json data file.
   * @param observationType Type of the Observation for picking the random body site
   */
  getRandomBodySite(observationType: ObservationType): any {
    if (observationType == ObservationType.BODY_TEMPERATURE){
      return fhirDataJson.BODY_TEMPERATURE[Math.floor(Math.random() * fhirDataJson.BODY_TEMPERATURE.length)].bodySite.coding[0].display
    }

    else if (observationType == ObservationType.HEART_RATE){
      return fhirDataJson.HEART_RATE[Math.floor(Math.random() * fhirDataJson.HEART_RATE.length)].bodySite.coding[0].display
    }

    else {
      throw new Error('No matching Observation Type found')
    }
  }
}
