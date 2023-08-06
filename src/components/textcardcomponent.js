import React, { useState } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const TextCardComponent = forwardRef((props, ref) => {

  var setTemp = props.setTemp;

  const [text, setText] = useState(props.text)
  const [isChecked, setIsChecked] = useState(false);

  function handleClick() {
    setTemp(text);
  }

  const privateRef = useRef();

  const publicRef = {
    elementRef: privateRef,
    instanceMethod: () => {
      setIsChecked(true)
    },
  };

  useImperativeHandle(ref, () => publicRef);

  return (
    <div className="d-flex px-2 mb-2 btn btn-outline-secondary" onClick={handleClick}>
      <input
        ref={privateRef}
        className="me-2"
        type="checkbox"
        checked={isChecked}
        // onChange={handleCheckboxChange}
        id="checkboxId" // Add a unique id if you need it for accessibility
      />
      <h5 className="text-center text-truncate h-25 m-0">{text}</h5>
    </div>
  );
});

export default TextCardComponent;