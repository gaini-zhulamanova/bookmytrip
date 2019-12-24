import { Cuisine } from './cuisine';
import { Contact } from './contact';
import { Review } from './review';

export interface Restaurant {
    id: number;
    name: string;
    contact: Contact;
    reviews: Review[];
    avrgRating: number;
    numOfReviews: number;

    cuisines: Cuisine[];
    priceLevel: number;
}