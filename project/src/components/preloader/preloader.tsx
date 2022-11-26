import { BarLoader } from 'react-spinners';

function Preloader(): JSX.Element {
  return (
    <div className="page-content" data-testid='preloader-test'>
      <div className='container' style={{padding: '10px', width: '100%'}} >
        <BarLoader width="100%" height={20} color='#7575e2'/>
        Loading data...
      </div>

    </div>
  );
}

export default Preloader;
