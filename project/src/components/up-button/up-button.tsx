function UpButton(): JSX.Element {

  const handleUpButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button className="up-btn" onClick={handleUpButtonClick}>
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </button>
  );
}

export default UpButton;
