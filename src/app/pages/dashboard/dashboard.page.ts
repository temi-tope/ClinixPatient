import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ComplainService } from 'src/app/services/complain.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AssignService } from 'src/app/services/assign.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  user = this.authService.patient;
  name: string;
  sessionId;
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private complainService: ComplainService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private assignService: AssignService
  ) {
    this.menu.enable(true);
  }
  ngOnInit() {
    this.assignService.getSessionId(this.user.id).subscribe(() => {
      this.sessionId = this.assignService.sessionId;
      console.log(this.sessionId);
    });
  }

  complain(form: NgForm) {
    this.complainService
      .sendComplain(this.authService.patient.id, form.value.complain, form.value.others)
      .subscribe((value) => {
        if (this.complainService.responseCode === '00') {
        this.alertService.presentToast('Complain has been sent');
        this.complainService.assign(this.authService.patient.id, this.complainService.sessionId).subscribe(res => {
          this.navCtrl.navigateForward('/home');
      });
    } else {
      this.alertService.presentToast('Error sending complian');
    }
    });
  }
}
