import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';
import { AlertService } from 'src/app/services/alert.service';
import { PrescribeService } from 'src/app/services/prescribe.service';
import { NgForm } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private feedbackService: FeedbackService) { }
  sessionId;
  doctor;
  type;
  value = 1;
  patientId = this.authService.patient.id;

  disabled = false;

  ngOnInit() {
    this.assignService.getSessionId(this.patientId).subscribe(() => {
      this.sessionId = this.assignService.sessionId;
      this.assignService.getDoctor(this.assignService.sessionId).subscribe(
      (value) => {
        this.doctor = this.assignService.doctor;
      });
    });
  }

  sendFeedback(form: NgForm) {
    this.assignService.getSessionId(this.patientId).subscribe(() => {
      this.sessionId = this.assignService.sessionId;
      this.assignService.getDoctor(this.assignService.sessionId).subscribe(
        (value) => {
          this.doctor = value;
          this.feedbackService
          .sendFeedback(this.patientId, this.assignService.sessionId, form.value.type, form.value.details,
            this.assignService.doctor.id).subscribe(() => {
            this.alertService.presentToast(this.feedbackService.message);
            this.navCtrl.navigateForward('/dashboard');
          });
        });
    });
  }

  onChange(type: number) {
    if (type === 1) {
      this.value = 1;
    } else {
      this.value = 0;
    }
  }
}
