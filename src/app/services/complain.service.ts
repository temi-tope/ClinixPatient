import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  complain: ComplainResponse;
  responseCode: string;
  sessionId: string;

  constructor(private http: HttpClient, private env: EnvService) { }

  // Returns session_id
  // tslint:disable-next-line: variable-name
  sendComplain(patientId: number, complain: string, additionalInfo: string) {
    const body = { patientId, complain, additionalInfo };
    return this.http
      .post<{sessionId: string; responseCode: string; }>(
        this.env.API_URL + '/complain',
        body
      )
      .pipe(map(val => {
        console.log(val.sessionId);
        this.sessionId = val.sessionId;
        this.responseCode = val.responseCode;
      }
        ));
  }

  // tslint:disable-next-line: variable-name
  assign(patientId: number, sessionId: string) {
    const body = { patientId, sessionId};
    return this.http
      .post<string>(
        this.env.API_URL + '/assign',
        body
      )
      .pipe(map(val => (
        this.responseCode = val
        )
        ));
  }

}

export interface ComplainResponse {
  patientId: number;
  complain: string;
  complainId: number;
  sessionId: string;
  date: string;
  additionalInfo: string;
}

export interface SessionResponse {
  sessionId: string;
  responseCode: string;
}
