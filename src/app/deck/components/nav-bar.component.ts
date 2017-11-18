import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter as EE } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as uuidv4 from 'uuid/v4';

import { Deck } from '../models/deck';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bfr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('open', style({
        overflow: 'hidden',
        maxHeight: '300px',
      })),
      state('closed',   style({
        opacity: '0',
        overflow: 'hidden',
        maxHeight: '0'
      })),
      transition('closed => open', animate('200ms ease-in-out')),
      transition('open => closed', animate('200ms ease-in-out'))
    ])
  ]
})
export class NavBarComponent {
  @Input() decks: Deck[] = [];
  @Output() addDeck: EE<Deck> = new EE<Deck>();

  public deckName: string;
  public deckSubreddits: string;
  public navbarCollapsed: boolean = true;
  _isNavbarCollapsedAnim = 'closed';

  toggleNavbar(): void {
    if(this.navbarCollapsed){
      this._isNavbarCollapsedAnim = 'open';
      this.navbarCollapsed = false;
    } else {
      this._isNavbarCollapsedAnim = 'closed';
      this.navbarCollapsed = true;
    }
  }

  closeNavbar(): void {
    if (! this.navbarCollapsed) {
      this._isNavbarCollapsedAnim = 'closed';
      this.navbarCollapsed = true;
    }
  }

  get isNavbarCollapsedAnim() : string {
    return this._isNavbarCollapsedAnim;
  }

  onSubmit(form: FormGroup) {
    const deck = {
      id: uuidv4(),
      name: this.deckName,
      subredditIds: this.deckSubreddits.split(',').map(sr => sr.trim())
    };

    this.addDeck.emit(deck);

    form.reset();
    this.closeNavbar();
  }
}
