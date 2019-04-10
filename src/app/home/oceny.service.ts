import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OcenyService {

  formProfile = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    degrees: new FormControl('')
  });
   values = new Subject<number>();
   values_set = new Subject<boolean>();
   values_set$ = this.values_set.asObservable();
   values$ = this.values.asObservable();
   button_text=new Subject<string>();
   button_text$=this.button_text.asObservable();
  constructor() {
    this.values.next(0);
    this.values_set.next(false);
    this.button_text.next("");
   }

  getProfileData() {
      return this.formProfile;
  }
  saveProfileData(form: FormGroup) {
     this.formProfile = form;
  }
  saveValues(values) {
   this.values.next(values);
  }
}
