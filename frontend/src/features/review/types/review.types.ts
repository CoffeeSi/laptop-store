export interface IReview {
    _id: string;
    rating: number;
    comment: string;
    review_date: string;
    laptop_id: string;
    user_id: {
        _id: string;
        full_name: string;
    } | null;
}

export interface ICreateReviewPayload {
    rating: number;
    comment: string;
    laptop_id: string;
}
