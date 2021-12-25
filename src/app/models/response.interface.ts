import { Card } from './card.interface';
import { Set } from './set.interface';

export interface ScryfallApiResponse {
  object: string;
  has_more: boolean;
  data: Set[];
}

export interface ScryfallCardResponse {
  object: string;
  has_more: boolean;
  data: Card[];
}
