import { Cuisine } from './cuisine.model';
import { Contact } from './contact.model';
import { Review } from './review.model';

export interface Restaurant {
    id?: number;
    name: string;
    contact: Contact;
    reviews?: Review[];
    avrgRating?: number;
    numOfReviews?: number;

    cuisines: Cuisine[];
    priceLevel: number;
}