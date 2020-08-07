import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ComplainService } from 'src/app/services/complain.service';
import { AlertService } from 'src/app/services/alert.service';
import { AssignService } from 'src/app/services/assign.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user = this.assignService.doctor;
  patientId = this.authService.patient.id;
  sessionId;
  doctor;
  constructor(
    private authService: AuthService,
    private assignService: AssignService
  ) {}

  ngOnInit() {
    console.log(this.doctor);
    this.assignService.getSessionId(this.patientId).subscribe(() => {
      this.sessionId = this.assignService.sessionId;
      this.assignService.getDoctor(this.assignService.sessionId).subscribe(
        (value) => {
          if (this.assignService.responseCode === '00') {
          this.doctor = this.assignService.doctor;
          console.log(this.assignService.doctor.id);
        } else {
          console.log(this.assignService.responseCode);
        }
         });
    });
  }
}
