import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction, postReviewAction } from '../../store/api-actions';
import { getPostReviewStatus } from '../../store/review-process/selectors';
import { getMessageContent, getMessageVisibilityStatus } from '../../store/utils-process/selectors';
import {toggleReview, toggleSuccess} from '../../store/utils-process/utils-process';
import Message from '../ui/message';


type ModalProps = {
  isActive: boolean;
  id: number;
}

function ModalReview({isActive, id}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const message = useAppSelector(getMessageContent);
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const postStatus = useAppSelector(getPostReviewStatus);

  useEffect(() => {
    const isEscapeKey = (evt:KeyboardEvent) => evt.key === 'Escape';
    const handleEscKeyPress = (evt: KeyboardEvent) => {
      if(isEscapeKey(evt)) {
        dispatch(toggleReview());
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  },[dispatch]);

  const handleToggleModalClick = () => {
    dispatch(toggleReview());
  };
  const handleReviewChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setReviewData({...inputData, [name]: value,});
  };

  const [inputData, setReviewData] = useState({
    cameraId: Number(params.id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0
  });

  return (
    <div className={isActive
      ? 'modal is-active'
      : 'modal'}
    >
      {isVisible && <Message props={message}/>}
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleToggleModalClick}></div>
        <div className="modal__content" id='modal'>
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
              evt.preventDefault();
              const reviewData = {...inputData, rating: Number(inputData.rating)};
              dispatch(postReviewAction(reviewData)).then(
                (response) => {
                  if (response.meta.requestStatus === 'fulfilled') {
                    handleToggleModalClick();
                    dispatch(toggleSuccess());
                    dispatch(fetchReviewsAction(id));
                  }
                }
              );
            }}
            >
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-5" name="rating" type="radio" value={5} autoFocus/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-4" name="rating" type="radio" value={4}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-3" name="rating" type="radio" value={3}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-2" name="rating" type="radio" value={2}/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-1" name="rating" type="radio" value={1}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input onChange={handleReviewChange} type="text" name="userName" placeholder="Введите ваше имя" required/>
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input onChange={handleReviewChange} type="text" name="advantage" placeholder="Основные преимущества товара" required/>
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input onChange={handleReviewChange} type="text" name="disadvantage" placeholder="Главные недостатки товара" required/>
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea onChange={handleReviewChange} name="review" minLength={5} placeholder="Поделитесь своим опытом покупки"></textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={!postStatus}>{postStatus
                ? 'Отправить отзыв'
                : 'Отправляю...'}
              </button>
            </form>
          </div>
          <button className="cross-btn" onBlur={()=>{document.getElementById('star-1')?.focus();}} type="button" onClick={handleToggleModalClick} aria-label="Закрыть попап" >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReview;
//
