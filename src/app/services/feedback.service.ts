import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  message: string;

  constructor(private http: HttpClient, private env: EnvService) { }

  sendFeedback(
    patientId: number,
    sessionId: string,
    feedType: number,
    feedDetails: string,
    doctorId: number,
  ) {
    const body = {
      sessionId,
      feedType,
      feedDetails,
      doctorId,
      patientId
    };
    return this.http
      .post<string>(this.env.API_URL + '/feedback', body)
      .pipe(map(val => (this.message = val)));
  }

}
