import { MuseumType } from './museumType';
import { Contact } from './contact';
import { Review } from './review';

export interface Museum {
    id: number;
    name: string;
    contact: Contact;
    reviews: Review[];
    avrgRating: number;
    numOfReviews: number;

    museumTypes: MuseumType[];
    priceLevel: number;
}