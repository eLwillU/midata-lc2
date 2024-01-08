import { JSOnFhir } from '@i4mi/js-on-fhir';
import { Appointment, Patient, Questionnaire } from '@i4mi/fhir_r4';

export default class MidataService {
  jsOnFhir: JSOnFhir;

  constructor() {
    this.jsOnFhir = new JSOnFhir(
      process.env.VUE_FHIR_BASE_URL,
      process.env.VUE_FHIR_APP_NAME,
      process.env.VUE_FHIR_REDIRECT_URL,
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
  public authenticate(params?: { [p: string]: string }): void {
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

  public loadAppointments() {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Appointment')
        .then((result) => {
          if (result) {
            const appointments =
              result.entry?.map((entry) => entry.resource as Appointment) || [];
            resolve(appointments);
          } else {
            reject('No results found');
          }
        })
        .catch((error) => reject(error));
    });
  }
  public loadQuestionnaireByTitle(title: string) {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Questionnaire')
        .then((result) => {
          if (result) {
            const questionnaires =
              result.entry?.map((entry) => entry.resource as Questionnaire) ||
              [];
            console.log('Quets: ', questionnaires);
            const filteredQuestionnaire = questionnaires.find(
              (questionnaire) => questionnaire.title === title,
            );
            if (filteredQuestionnaire) {
              resolve(filteredQuestionnaire);
            } else {
              reject('No questionnaire found with the given title');
            }
          } else {
            reject('No results found');
          }
        })
        .catch((error) => reject(error));
    });
  }

  public loadQuestionnaire() {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Questionnaire')
        .then((result) => {
          if (result) {
            const questionnaires =
              result.entry?.map((entry) => entry.resource as Questionnaire) ||
              [];
            resolve(questionnaires);
          } else {
            reject('No results found');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Gets the patient resource from the fhir endpoint.
   * @returns patient resource as JSON.
   */
  public getPatientResource(): Promise<Patient> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .getResource('Patient', this.jsOnFhir.getUserId())
        .then((result) => {
          if (result.resourceType === 'Patient') {
            resolve(result as Patient);
          } else {
            reject('No Patient resource found');
          }
        })
        .catch((error) => reject(error));
    });
  }

  public createObservation() {
    console.log('Creating...');
  }
}
