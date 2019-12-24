import { Contact } from './contact';
import { Review } from './review';

export interface Hotel {
    id: number;
    name: string;
    contact: Contact;
    reviews: Review[];
    avrgRating: number;
    numOfReviews: number;

    stars: number;
    breakfastIncl: boolean;
}