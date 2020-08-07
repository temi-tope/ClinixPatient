import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;
  loading: boolean;
  message: string;
  patient: PatientResponse;
  responseCode;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private alert: AlertService
  ) {}

  register(
    name: string,
    address: string,
    religion: string,
    // tslint:disable-next-line: variable-name
    sex: string,
    occupation: string,
    // tslint:disable-next-line: variable-name
    username: string,
    password: string,
    dob: string
  ) {
    const body = {
      name,
      address,
      religion,
      sex,
      occupation,
      username,
      password,
      dob
    };
    return this.http.post<string>(this.env.API_URL + '/registration/patients', body)
    .pipe(map(val => (this.message = val)));
  }

  login(username: string, password: string, role: number = 0) {
    const body = { username, password, role };
    return this.http
      .post<{ patient: PatientResponse[]; responseCode: PatientResponse }>(
        this.env.API_URL + '/login/patients',
        body
      )
      .pipe(map(val => {
        this.patient = val.patient[0];
        this.responseCode = val.responseCode;
      }
        ));
  }

  logout() {
    const headers = new HttpHeaders({
      Authorization: this.token.token_type + ' ' + this.token.access_token
    });
    return this.http
      .get(this.env.API_URL + '/auth/logout.json', { headers })
      .pipe(
        tap(data => {
          this.storage.remove('token');
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      );
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}

export interface PatientResponse {
  [x: string]: any;
  patient: [{
    id: number;
    name: string;
    address: string;
    religion: string;
    sex: string;
    occupation: string;
    reg_date: string;
    username: string;
    dob: string;
  }];
  responseCode: string;
  responseMessage: string;
}
