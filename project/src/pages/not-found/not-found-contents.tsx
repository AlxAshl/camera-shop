import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type NotFoundType = {
  children? : string;
}

function NotFoundContent({children}: NotFoundType): JSX.Element {
  return (
    <div className="page-content">
      <div className='container' style={{paddingTop: '50px'}}>
        <h3 className='title title--h3'>No corresponding {children} found</h3>
        <Link to={AppRoute.Root} className='main-nav__link'>Return to main</Link>
      </div>
    </div>
  );
}

export default NotFoundContent;
