import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScryfallApiResponse, ScryfallCardResponse } from '../models/response.interface';
import { Set } from '../models/set.interface';
import { Card } from '../models/card.interface';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  api_uri: string = 'https://api.scryfall.com/sets/'

  constructor(private http: HttpClient) {}

  getAllExpansions(): Observable<Set[]> {
    return this.http.get<ScryfallApiResponse>(this.api_uri).pipe(
      map(
        (res) => res.data.filter((set) => {
          return set.set_type == 'expansion' && !set.digital
        })
      )
    );
  }

  getSetByCode(code: string | null): Observable<Set> {
    if (code === null || code === '') code = 'arn'; // first set
    return this.http.get<Set>(this.api_uri + code).pipe(
      // Some sets have additional fields that we don't want
      map(
        (set) => {
          return {
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
        }
      )
    );
  }

  getCards(cardsUri: string): Observable<Card[]> {
    return this.http.get<ScryfallCardResponse>(cardsUri).pipe(
      map(
        (res) => res.data.map(
          // Cards have more fields than we want
          (card) => {
            return {
              name: card.name,
              scryfall_uri: card.scryfall_uri,
              mana_cost: card.mana_cost,
              rarity: card.rarity,
            }
          }
        )
      )
    );
  }
}
