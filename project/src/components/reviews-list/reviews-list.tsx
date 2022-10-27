import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchReviewsAction } from '../../store/api-actions';
import { getLoadedReviewsStatus, getReviews } from '../../store/review-process/selectors';
import { toggleReview } from '../../store/utils-process/utils-process';
import ReviewCard from './review-card/review-card';

type ReviewListProps = {
  id: number;
}

function ReviewsList({id}: ReviewListProps): JSX.Element {

  const dispatch = useAppDispatch();
  const reviewsArray = useAppSelector(getReviews);
  const isLoaded = useAppSelector(getLoadedReviewsStatus);
  const [sliceLimit, setSliceLimit] = useState(3);
  const [initialRender, setInitialRender] = useState(true);
  const reviews = [...reviewsArray].sort((a, b) => (a.createAt > b.createAt ? -1 : 1)).slice(0, sliceLimit);

  useEffect(() => {
    function loadMoreReviews(){
      if (initialRender) {
        setInitialRender(false);
        return;
      }

      if ((window.innerHeight + document.documentElement.scrollTop) === document.scrollingElement?.scrollHeight) {
        setSliceLimit(sliceLimit + 3);
      }
    }

    window.addEventListener('scroll', loadMoreReviews);
    return () => {window.removeEventListener('scroll', loadMoreReviews);};
  },[sliceLimit, initialRender]);

  const handlePostReviewButtonClick = () => {
    dispatch(toggleReview());
  };

  const handleShowMoreButton = () => {
    setSliceLimit(sliceLimit + 3);
  };

  useEffect(()=> {
    dispatch(fetchReviewsAction(Number(id)));
    setSliceLimit(3);
  },[id, dispatch]);

  useEffect(()=> {
    reviews.slice(0, sliceLimit);
  },[sliceLimit, reviews]);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handlePostReviewButtonClick}>Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviews.length === 0 && 'Отзывов пока нет'}
            {isLoaded && reviews.map((review) => (<ReviewCard key={review.id} data={review}/>))}
          </ul>
          {(reviewsArray.length > sliceLimit) &&
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleShowMoreButton}>Показать больше отзывов</button>
            </div>}
        </div>
      </section>
    </div>
  );
}

export default ReviewsList;
