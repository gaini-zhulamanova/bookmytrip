export interface Review {
    id?: number;
    entry: any;
    rating: number;
    comment?: string;
    reviewerName: string;
    reviewTitle: string;
    dateTime: string;
}