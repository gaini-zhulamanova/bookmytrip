import { MuseumType } from './museumType';

export interface Hotel {
    id: number;
    city: string;
    name: string;
    priceLevel: number;
    types: MuseumType[];
    avrgRating: number;
    numOfReviews: number;
}