import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SVGRoot from '../../components/svg-root/svg-root';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return (
    <>
      <SVGRoot />
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <p>No corresponding page found</p>
            <Link to={AppRoute.Root}>Return to main</Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default NotFound;
