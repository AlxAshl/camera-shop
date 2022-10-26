import { ReviewType } from '../../../types/review';
import Rating from '../../rating/rating';


type ReviewCardProps = {
  data: ReviewType;
}

function ReviewCard({data}: ReviewCardProps): JSX.Element {
  const {rating, cameraId, userName, advantage, disadvantage, review, createAt} = data;
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>13 апреля</time>
      </div>
      <div className="rate review-card__rate">
        <Rating id={cameraId} rating={rating} ariaHiddenState/>
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
