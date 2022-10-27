import { ReviewType } from '../../../types/review';
import Rating from '../../rating/rating';


type ReviewCardProps = {
  data: ReviewType;
}

function ReviewCard({data}: ReviewCardProps): JSX.Element {
  const {rating, cameraId, userName, advantage, disadvantage, review, createAt} = data;
  return (
    <li className="review-card" data-testid='review-card-test'>
      <div className="review-card__head">
        <p data-testid='review-name-test'className="title title--h4">{userName}</p>
        <time data-testid='review-create-test' className="review-card__data" dateTime={createAt}>13 апреля</time>
      </div>
      <div className="rate review-card__rate">
        <Rating id={cameraId} rating={rating} ariaHiddenState/>
        <p data-testid='review-rating-test' className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p data-testid='review-advatanges-test' className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p data-testid='review-disadvatanges-test' className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p data-testid='review-review-test' className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
