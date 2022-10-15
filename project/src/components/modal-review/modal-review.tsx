import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

type ModalProps = {
  isActive: boolean;
  onToggleModal: () => void;
  onReview: (reviewData: ReviewDataType) => void;
}
export type ReviewDataType = {
  cameraId: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: string;
}

function ModalReview({isActive, onToggleModal, onReview}: ModalProps): JSX.Element {
  const params = useParams();
  const removeInput = () => {
    setReviewData({cameraId: '', userName: '', advantage: '', disadvantage: '', review: '', rating: ''});
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setReviewData({...reviewData, [name]: value,});
  };

  const [reviewData, setReviewData] = useState({
    cameraId: String(params.id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: ''
  });

  return (
    <div id='modal' className={isActive
      ? 'modal is-active'
      : 'modal'}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() =>{onToggleModal();}}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
              evt.preventDefault();
              onReview(reviewData);
              removeInput();
              onToggleModal();
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
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-5" name="rating" type="radio" value="5"/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-4" name="rating" type="radio" value="4"/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-3" name="rating" type="radio" value="3"/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-2" name="rating" type="radio" value="2"/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input onChange={handleReviewChange} className="visually-hidden" id="star-1" name="rating" type="radio" value="1"/>
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
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" onClick={() =>{
            onToggleModal();
          }} aria-label="Закрыть попап"
          >
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
