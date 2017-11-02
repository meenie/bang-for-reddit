import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'bfr-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>This is home!</h1>
  `
})
export class HomePageComponent {}