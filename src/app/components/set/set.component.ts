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
      this.set = set;
      this.loading = false;
      this.loaded = true;
    });
  }

  showCards(): void {
    this.setsService.getCards(this.set.search_uri).subscribe(
      (cards) => {
        this.mythics = cards.filter((card) => card.rarity == 'mythic');
        this.rares = cards.filter((card) => card.rarity == 'rare');
        this.uncommons = cards.filter((card) => card.rarity == 'uncommon');
        this.commons = cards.filter((card) => card.rarity == 'common');
      }
    );
    this.showCardsFlag = true;
  }

}
