import { MuseumType } from './museumType.model';
import { Contact } from './contact.model';
import { Review } from './review.model';

export interface Museum {
    id?: number;
    name: string;
    contact: Contact;
    reviews?: Review[];
    avrgRating?: number;
    numOfReviews?: number;

    museumTypes: MuseumType[];
    priceLevel: number;
}