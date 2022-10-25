function setRating(id: number, rating: number, ariaHiddenState: boolean) {
  const starsRating = [];
  for (let i = 1; i < 6; i++) {
    starsRating.push(
      <svg key = {`${id}-${i}`} width="17" height="16" aria-hidden={ariaHiddenState}>
        <use xlinkHref={rating >= i
          ? '#icon-full-star'
          : '#icon-star'}
        >
        </use>
      </svg>);
  }
  return starsRating;
}

export default setRating;


