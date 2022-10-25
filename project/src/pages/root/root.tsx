import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';

function Root(): JSX.Element {

  return (
    <>
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
