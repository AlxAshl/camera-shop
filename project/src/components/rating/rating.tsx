import { RATING_STARS_COUNT } from '../../const';

type RatingProps = {
  id: number;
  rating: number;
  ariaHiddenState: boolean;
}

function Rating({id, rating, ariaHiddenState}: RatingProps): JSX.Element {
  const starsRating = [];
  for (let i = 1; i <= RATING_STARS_COUNT; i++) {
    starsRating.push(i);
  }
  return (
    <>
      {starsRating.map((i) => (
        <svg key = {`${id}-${i}`} width="17" height="16" aria-hidden={ariaHiddenState}>
          {rating >= i
            ? <use xlinkHref='#icon-full-star' data-testid='star-test'></use>
            : <use xlinkHref='#icon-star'> </use>}
        </svg>
      ))}
    </>
  );
}

export default Rating;
