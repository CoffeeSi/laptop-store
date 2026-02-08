export interface IBrand {
    _id: string;
    brand_name: string;
    country: string;
}

export interface IBrandStats {
    _id: string;
    avgRating: number;
    minRating: number;
    maxRating: number;
    totalReviews: number;
    totalLaptops: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    twoStarCount: number;
    oneStarCount: number;
}