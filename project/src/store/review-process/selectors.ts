import { NameSpace } from '../../const';
import { ReviewType } from '../../types/review';
import { State } from '../../types/state';

export const getLoadedReviewsStatus = (state: State): boolean => state[NameSpace.Review].isReviewsDataLoaded;
export const getReviews = (state: State): ReviewType[] => state[NameSpace.Review].reviews;
export const getPostReviewStatus = (state: State): boolean => state[NameSpace.Review].isReviewPosted;
export const getModalVisibilityStatus = (state: State): boolean => state[NameSpace.Review].showReview;
export const getModalSuccessVisibilityStatus = (state: State): boolean => state[NameSpace.Review].showReviewSuccess;
