import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { store } from '../../store/store';
import { fetchPromoAction } from '../../store/api-actions';
import router from '../browser-router/browser-router';
import Preloader from '../preloader/preloader';

let isInitial = true;


function App(): JSX.Element {

  useEffect(()=> {
    if(isInitial){
      store.dispatch(fetchPromoAction());
      isInitial = false;
    }
  },[]);

  return (
    <RouterProvider router={router}
      fallbackElement = {<Preloader/>}
    />
  );
}

export default App;
