import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './containers/home-page';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomePageComponent }
    ])
  ],
  declarations: [HomePageComponent]
})
export class HomeModule {}