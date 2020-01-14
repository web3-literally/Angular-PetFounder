import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';  
import { InputFileModule } from 'ngx-input-file';
import { RegisterLostPetComponent } from './register-lostpet.component';

export const routes = [
  { path: '', component: RegisterLostPetComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [RegisterLostPetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmCoreModule, 
    InputFileModule
  ]
})
export class RegisterLostPetModule { }
