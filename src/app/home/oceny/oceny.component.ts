import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { OcenyService } from '../oceny.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-oceny',
  templateUrl: './oceny.component.html',
  styleUrls: ['./oceny.component.scss'],
})
export class OcenyComponent implements OnInit, AfterViewInit {

  ocenyform: FormGroup;
  ocenyradio: FormGroup;
  items: FormArray;
  values = 0;
  kloc:FormControl;
  can_apply=true;
  can_applys=true;
  constructor(private service: OcenyService, private formBuilder: FormBuilder,
    private router: Router, private cdr: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.ocenyform = this.service.getProfileData();
    this.ocenyradio = this.formBuilder.group({
      items: this.formBuilder.array([])

    });
    }
    ngAfterViewInit(): void {
      this.addItem(this.ocenyform.get('degrees').value);
      this.cdr.detectChanges();

    }
    createItem(): FormGroup {
      return this.formBuilder.group({
        ocena: [0, Validators.required]
      });
    }
    addItem(oceny_count): void {
      console.log(oceny_count);
      let i;
      this.items = this.ocenyradio.get('items') as FormArray;
      for (i = 0; i < oceny_count; i++) {
        this.items.push(this.createItem());
        }
    }
    onSubmit() {
      let items: Object = [];
      items = this.items.value;
      console.log(items);
      // this.values=parseInt(itemy[0].ocena)+parseInt(itemy[1].ocena);
      (items as any).forEach((item) => {
        if(item.ocena==0) {
          this.can_apply=false;
          this.can_applys=false;
        }

      });
      if(this.can_apply) {
      (items as any).forEach((item) => {
        console.log(item);
        console.log(item.ocena);
        this.values += parseInt(item.ocena);
      });
      this.values /= this.ocenyform.get('degrees').value;

      if (this.values >= 3) {
         this.service.button_text.next('Super :)');
      } else {
        this.service.button_text.next('Tym razem mi nie poszło');
      }
      this.service.saveValues(this.values);
      this.service.values_set.next(true);

      this.router.navigate(['/home']);
    }
      this.can_apply=true;


}
}
