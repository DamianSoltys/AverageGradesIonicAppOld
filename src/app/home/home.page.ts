import { Component, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OcenyService } from './oceny.service';
import { Router } from '@angular/router';
import { Platform, IonicModule, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  degree_values: number;
  degrees_set =false;
  button_text = '';
  formProfile = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^[a-zA-Z ]+$/))]),
    surname: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^[a-zA-Z ]+$/))]),
    degrees: new FormControl('',
    [Validators.min(1), Validators.max(15),
      Validators.required, Validators.pattern(new RegExp(/^[0-9]+$/))])
  });
  constructor(private service: OcenyService, private router: Router,
    private cdr: ChangeDetectorRef, private platform: Platform,
    private alertController: AlertController) {
    service.values$.subscribe(values => {
      this.degree_values = values;

    });
    service.values_set$.subscribe(set => {
      this.degrees_set = set;
    });
    service.button_text$.subscribe(text => {
      this.button_text = text;
    });

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    if (this.button_text === 'Super :)') {
      alert.message = 'Gratulacje! Otrzymujesz zaliczenie!';
    } else {
      alert.message = 'Wysyłam podanie o zaliczenie warunkowe';
    }
    
    
    await alert.present();
   alert.addEventListener("ionAlertDidDismiss",this.closeApp);
  }

onSubmit() {
  if (this.formProfile.valid) {
    this.service.saveProfileData(this.formProfile);
 this.router.navigate(['/home/oceny']);
}

}
finalclick() {
 this.presentAlert();
}
closeApp(){
  if ((navigator as any).app) {
    (navigator as any).app.exitApp();
} else if ((navigator as any).device) {
    (navigator as any).device.exitApp();
} else {
    window.close();
}
}
}
