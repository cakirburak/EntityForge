
const TextCardComponent = ({ text, anahtar, onClick }) => {

  const handleClick = (e) => {
    onClick(e, anahtar);
  }

  return (
    <div className="d-flex mb-2 p-0 btn btn-outline-secondary" >
      <input
        className="mx-2"
        type="checkbox"
      />
      <h5 className="text-start p-2 text-truncate h-25 m-0 w-100" onClick={handleClick}>{text}</h5>
    </div>
  );
};

export default TextCardComponent;