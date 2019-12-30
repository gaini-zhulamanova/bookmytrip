import { Contact } from './contact.model';
import { Review } from './review.model';

export interface Hotel {
    id?: number;
    name: string;
    contact: Contact;
    reviews?: Review[];
    avrgRating?: number;
    numOfReviews?: number;

    stars: number;
    breakfastIncl: boolean;
}