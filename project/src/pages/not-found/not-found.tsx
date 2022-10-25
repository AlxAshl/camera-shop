import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return (
    <main>
      <div className="page-content">
        <p>No corresponding page found</p>
        <Link to={AppRoute.Root}>Return to main</Link>
      </div>
    </main>
  );
}

export default NotFound;
