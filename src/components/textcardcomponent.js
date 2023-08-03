import React, {useState} from 'react';

function TextCardComponent(props) {

  const [text, setText] = useState(props.text)
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = (e) => {
    console.log(e.target.textContent + " clicked");
  };

  return (
    <div className="d-flex px-2 mb-2 btn btn-outline-secondary">
      <input
        className="me-2"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        id="checkboxId" // Add a unique id if you need it for accessibility
        onClick={handleClick}
      />
      <h5 className="text-center text-truncate h-25 m-0">{text}</h5>
    </div>
  );
}

export default TextCardComponent;