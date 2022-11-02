export type ReviewType = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
}

export type ReviewPostType = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type reviewDataType = {
  rating: number;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
}

export type InputType = 'rating' | 'userName' | 'advantage' | 'disadvantage' | 'review';
