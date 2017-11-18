import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from './nav-bar.component';

export const COMPONENTS = [
  NavBarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [...COMPONENTS],
  exports: COMPONENTS
})
export class ComponentsModule {}
