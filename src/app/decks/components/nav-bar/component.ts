import { Component, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as uuidv4 from 'uuid/v4';

import { Deck } from '../../models/deck';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bfr-nav-bar',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
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
  @Output() addDeck: EventEmitter<Deck> = new EventEmitter<Deck>();

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
    const subredditIds = this.deckSubreddits.split(',').map(sr => sr.trim())
    const settings: any = subredditIds.reduce((acc, id) => {
      acc[id] = {
        type: 'rising',
        sort: 'score'
      };

      return acc;
    }, {})
    const deck = {
      id: uuidv4(),
      name: this.deckName,
      subredditIds,
      subredditSettings: settings
    };

    this.addDeck.emit(deck);

    form.reset();
    this.closeNavbar();
  }
}
