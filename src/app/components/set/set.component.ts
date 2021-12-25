import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card.interface';
import { SetsService } from 'src/app/services/sets.service';
import { Set } from '../../models/set.interface'

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  set!: Set;
  cards: Card[] = [];
  mythics: Card[] = [];
  rares: Card[] = [];
  uncommons: Card[] = [];
  commons: Card[] = [];
  loading: boolean = true;
  loaded: boolean = false;
  showCardsFlag: boolean = false;

  constructor(
    private setsService: SetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const setCode = this.activatedRoute.snapshot.paramMap.get('code');
    this.setsService.getSetByCode(setCode).subscribe((set) => {
      // the set properties are not always the same
      this.set = {
        object: set.object,
        id: set.id,
        code: set.code,
        tcgplayer_id: set.tcgplayer_id,
        name: set.name,
        uri: set.uri,
        scryfall_uri: set.scryfall_uri,
        search_uri: set.search_uri,
        released_at: set.released_at,
        set_type: set.set_type,
        card_count: set.card_count,
        digital: set.digital,
        nonfoil_only: set.nonfoil_only,
        foil_only: set.foil_only,
        icon_svg_uri: set.icon_svg_uri,
      }
      console.log(this.set);
      this.loading = false;
      this.loaded = true;
    });
  }

  showCards(): void {
    this.setsService.getCards(this.set.search_uri).subscribe(
      (cards) => {
        this.cards = cards;
        this.mythics = cards.filter((card) => card.rarity == 'mythic');
        this.rares = cards.filter((card) => card.rarity == 'rare');
        this.uncommons = cards.filter((card) => card.rarity == 'uncommon');
        this.commons = cards.filter((card) => card.rarity == 'common');
      }
    );
    this.showCardsFlag = true;
  }

}
