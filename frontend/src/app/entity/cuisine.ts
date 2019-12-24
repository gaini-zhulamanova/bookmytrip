import { Restaurant } from './restaurant';

export interface Cuisine {
    type: string;
    restaurants: Restaurant[];
}