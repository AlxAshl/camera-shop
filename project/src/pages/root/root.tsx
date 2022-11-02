import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';
import Message from '../../components/ui/message';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getMessageContent, getMessageVisibilityStatus } from '../../store/utils-process/selectors';
import { messageToggler } from '../../store/utils-process/utils-process';


function Root(): JSX.Element {
  const isVisible = useAppSelector(getMessageVisibilityStatus);
  const message = useAppSelector(getMessageContent);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(messageToggler());
      }, 3000);
    }
  },[isVisible, dispatch]);
  return (
    <>
      {isVisible && <Message props={message}/>}
      <SVGRoot/>
      <div className="wrapper">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  );
}

export default Root;
