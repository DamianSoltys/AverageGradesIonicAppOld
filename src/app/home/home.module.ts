import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { OcenyComponent } from './oceny/oceny.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path:'oceny',
        component:OcenyComponent
      }
      
      
    ])
  ],
  declarations: [HomePage,OcenyComponent]
})
export class HomePageModule {}
