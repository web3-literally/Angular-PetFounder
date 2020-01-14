import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';  
import { InputFileModule } from 'ngx-input-file';
import { RegisterFoundPetComponent } from './register-foundpet.component';

export const routes = [
  { path: '', component: RegisterFoundPetComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [RegisterFoundPetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmCoreModule, 
    InputFileModule
  ]
})
export class RegisterFoundPetModule { }
