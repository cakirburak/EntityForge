import React, { useState } from 'react';

function ToolComponent(props) {

  const [text, setText] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
  const [selectedClass, setSelectedClass] = useState('');

  const classes = props.classes;
  const entities = props.entities;

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    console.log(selectedClass);
    // Perform classification logic with 'text' and 'selectedClass'
    // Reset the text and selectedClass state
    setText('');
    setSelectedClass('');
  };

  return (
    <div className="px-2 h-100">
      <form onSubmit={handleSubmit} className="h-100">
        <div className="d-flex flex-column h-100">
          <div className="w-100 h-50 mb-3">
            <textarea className="w-100 h-100 fs-5" type="text" id="text-input" value={text} onChange={handleTextChange} />
          </div>
          <div className="mt-3 d-flex flex-column align-items-center">
            <div className="w-100 text-start fs-5 ms-4">Entities</div>
            <div className="d-flex flex-wrap w-100 mt-2">
              {entities.map((entity) => <div className="mx-3 my-2 bg-success">{entity}</div>)}
            </div>
          </div>
          <div className="mt-3 d-flex flex-column align-items-center">
            <div className="w-100 text-start fs-5 ms-4">Classification</div>
            <div className="d-flex flex-wrap w-100">
              {classes.map((classIndex) => <label className="mx-3 my-2"><input className="mx-1" type="radio" value={classIndex} checked={selectedClass === classIndex} onChange={() => handleClassSelect(classIndex)} />{classIndex}</label>)}
            </div>
          </div>
          <button className="mt-4 btn btn-primary" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default ToolComponent;