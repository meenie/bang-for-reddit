import { NgModule } from '@angular/core';
import {
  MatListModule, 
  MatIconModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  exports: [
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}