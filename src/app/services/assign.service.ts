import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignService {
  doctor: AssignedDoc;
  sessionId: string;
  responseCode: string;

  constructor(private http: HttpClient, private env: EnvService) { }

getDoctor(session: any) {
  return this.http
    .get<{ doctor: AssignedDoc[]; responseCode: string; }>(
      this.env.API_URL + '/patient/doctor/' + session
    )
    .pipe(map(value => {
      if (value.responseCode === '00') {
       this.doctor = value.doctor[0];
       this.responseCode = value.responseCode;
    } else {
      this.responseCode = value.responseCode;
    }
  }
      ));
}

// tslint:disable-next-line: variable-name
getSessionId(patient_id: number) {
  return this.http
    .get<{ sessionId: string; responseCode: string; }>(
      this.env.API_URL + '/assign/' + patient_id,
    )
    .pipe(map(val => {
      this.sessionId = val.sessionId;
      this.responseCode = val.responseCode;
    } ));
}

}


export interface AssignedDoc {
  id: number;
  name: string;
  workplace: string;
  licence_no: string;
  sex: string;
  address: string;
  avaliable: number;
  specialization: string;
  reg_date: string;
  username: string;
  dob: string;
}
export interface Session {
  sessionId: string;
  responseCode: string;
}
