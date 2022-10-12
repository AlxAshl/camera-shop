import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { store } from '../../store';
import { fetchPromoAction } from '../../store/api-actions';
import router from '../browser-router/browser-router';

let isInitial = true;


function App(): JSX.Element {

  useEffect(()=> {
    if(isInitial){
      store.dispatch(fetchPromoAction());
      isInitial = false;
    }
  },[]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
