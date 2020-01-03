import { Restaurant } from './restaurant.model';

export interface Cuisine {
    
    type: string;
    restaurants?: Restaurant[];
}