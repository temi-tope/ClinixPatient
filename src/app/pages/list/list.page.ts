import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AssignService } from 'src/app/services/assign.service';
import { ComplainService } from 'src/app/services/complain.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { PrescribeService } from 'src/app/services/prescribe.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  patient = this.authService.patient;
  prescription;
  sessionId;
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private assignService: AssignService,
    private navCtrl: NavController,
    private complainService: ComplainService,
    private alertService: AlertService,
    private prescribeService: PrescribeService
  ) {}

  ngOnInit() {
    this.assignService.getSessionId(this.patient.id).subscribe(() => {
      this.sessionId = this.assignService.sessionId;
      console.log(this.assignService.sessionId);
      this.prescribeService.getPresc(this.assignService.sessionId)
    .subscribe(res => {
      console.log(res);
      this.prescription = res.prescribeRequest;
  });
    });
}
  feedback() {
    this.navCtrl.navigateForward('/feedback');
  }
}
