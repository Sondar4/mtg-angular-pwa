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

  getAllSets(): Observable<ScryfallApiResponse> {
    return this.http.get<ScryfallApiResponse>(this.api_uri);
  }

  getSetByCode(code: string | null): Observable<Set> {
    if (code === null || code === '') code = 'arn'; // first set
    return this.http.get<Set>(this.api_uri + code);
  }

  getCards(cardsUri: string): Observable<Card[]> {
    return this.http.get<ScryfallCardResponse>(cardsUri).pipe(
      map(
        (res) => res.data.map(
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
