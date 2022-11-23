import {Action} from 'redux';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { productMock, productsMock, reviewMock, reviewsMock } from '../test/test-mocks';
import { APIRoute } from '../const';
import { fetchProductAction/*, fetchProductsAction*/, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction, postReviewAction } from './api-actions';
import { api } from './store';


describe('async actions', () => {

  const mockError = jest.fn();
  jest.mock('./utils-process/utils-process', () => ({
    formErrorMessage: () => mockError
  }));

  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  test('should dispatch fetchProduct when GET /cameras', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}`)
      .reply(200, productMock);

    const store = mockStore();

    await store.dispatch(fetchProductAction(17));

    const actions = store.getActions().map(({type}) => type as unknown);

    expect(actions).toEqual([
      fetchProductAction.pending.type,
      fetchProductAction.fulfilled.type
    ]);
  });

  test('should return error for fetchProduct when GET /cameras adress is incorrect', async () => {
    const id = 17;
    mockAPI
      .onGet(`cameras1/${id}`)
      .reply(404);
    const store = mockStore();
    await store.dispatch(fetchProductAction(17));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should return error for fetchProduct when GET /cameras call experience network error', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}`)
      .reply(408);
    const store = mockStore();
    await store.dispatch(fetchProductAction(17));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should dispatch fetchSimilarProducts when GET /cameras/id/simiar', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}/similar`)
      .reply(200, productsMock);

    const store = mockStore();

    await store.dispatch(fetchSimilarProductsAction(17));

    const actions = store.getActions().map(({type}) => type as unknown);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type
    ]);
  });

  test('should return error for fetchSimilarProducts when GET /cameras/id/simiar adress is incorrect', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}/sim2ilar`)
      .reply(404);
    const store = mockStore();
    await store.dispatch(fetchSimilarProductsAction(17));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should return error for fetchSimilarProducts when GET /cameras/id/simiar call experience network error', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}/similar`)
      .reply(408);
    const store = mockStore();
    await store.dispatch(fetchSimilarProductsAction(17));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  // test('should return error for fetchProducts when GET /cameras/pages adress is incorrect', async () => {

  //   mockAPI
  //     .onGet(`${APIRoute.Products}/p1ages`)
  //     .reply(404);
  //   const store = mockStore();
  //   const currentPage = 1;
  //   await store.dispatch(fetchProductsAction(currentPage));
  //   setTimeout(()=>{
  //     expect(mockError).toBeCalled();
  //   },1000);
  // });

  // test('should return error for fetchProducts when GET /cameras/pages call experience network error', async () => {

  //   mockAPI
  //     .onGet(`${APIRoute.Products}/pages`)
  //     .reply(408);
  //   const store = mockStore();
  //   const currentPage = 1;
  //   await store.dispatch(fetchProductsAction(currentPage, urlParams));
  //   setTimeout(()=>{
  //     expect(mockError).toBeCalled();
  //   },1000);
  // });

  test('should dispatch fetchPromo when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, productMock);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type as unknown);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  test('should return error for fetchPromo when GET /promo adress is incorrect', async () => {
    mockAPI
      .onGet('pormo')
      .reply(404);
    const store = mockStore();
    await store.dispatch(fetchPromoAction());
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should return error for fetchPromo when GET /promo call experience network error', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(408);
    const store = mockStore();
    await store.dispatch(fetchPromoAction());
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should dispatch fetchReviews when GET /cameras/id/reviews', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}/reviews`)
      .reply(200, reviewsMock);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(17));

    const actions = store.getActions().map(({type}) => type as unknown);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  test('should return error for fetchReviews when GET /cameras/id/reviews adress is incorrect', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}/rev2iews`)
      .reply(404);
    const store = mockStore();
    await store.dispatch(fetchReviewsAction(17));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should return error for fetchReviews when GET /cameras/id/reviews call experience network error', async () => {
    const id = 17;
    mockAPI
      .onGet(`${APIRoute.Products}/${id}/reviews`)
      .reply(408);
    const store = mockStore();
    await store.dispatch(fetchReviewsAction(17));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should dispatch postReview when POST /review', async () => {
    const reviewData = reviewMock;
    mockAPI
      .onPost(`${APIRoute.Reviews}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postReviewAction(reviewData));

    const actions = store.getActions().map(({type}) => type as unknown);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type
    ]);
  });

  test('should return error for postReview when POST /review adress is incorrect', async () => {
    const reviewData = reviewMock;
    mockAPI
      .onPost('/revews')
      .reply(404);
    const store = mockStore();
    await store.dispatch(postReviewAction(reviewData));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

  test('should return error for postReview when POST /review call experience network error', async () => {
    const reviewData = reviewMock;
    mockAPI
      .onPost(`${APIRoute.Reviews}`)
      .reply(408);
    const store = mockStore();
    await store.dispatch(postReviewAction(reviewData));
    setTimeout(()=>{
      expect(mockError).toBeCalled();
    },1000);
  });

});

