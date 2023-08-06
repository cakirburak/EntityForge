import React, { useEffect, useState } from 'react';

function ToolComponent({classes,text,setIsChecked}) {

  const [namedEntities, setNamedEntities] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  var entities = "";
  if(selectedClass !== null && selectedClass !== undefined) {
    entities = selectedClass.entities;
  }

  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var output = {
      text: text,
      classType: selectedClass,
      namedEntities: namedEntities
    }
    console.log(output);
    
    setIsChecked();

    setSelectedText('');
    setSelectedClass('');
  };

  const handleEntitySet = (e) => {
    e.preventDefault();
    var entity = e.target.textContent;
    var selectedText = window.getSelection().toString();
    // console.log(window.getSelection()+ ", Entity set to " + e.target.textContent);
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;
    setNamedEntities([...namedEntities, {text:selectedText, entity:entity, indexStart:start, indexEnd:end}]);
  };

  return (
    <div className="px-2 h-100">
      <form onSubmit={handleSubmit} className="h-100">
        <div className="d-flex flex-column h-100">
          <div className="w-100 h-50 mb-3">
            <textarea className="w-100 h-100 fs-5" type="text" id="text-input" value={text}/>
          </div>
          <div className="mt-3 d-flex flex-column align-items-center">
            {entities && <div className="w-100 text-start fs-5 ms-4">Entities</div>}
            <div className="d-flex flex-wrap w-100 mt-2">
              {entities && entities.map((entity) => <button id="entityButtons" type="button" className="btn m-2 btn-success" onClick={handleEntitySet}>{entity}</button>)}
            </div>
          </div>
          <div className="mt-3 d-flex flex-column align-items-center">
            <div className="w-100 text-start fs-5 ms-4">Classification</div>
            <div className="d-flex flex-wrap w-100">
              {classes && classes.map((classIndex) => <label className="mx-3 my-2"><input className="mx-1" type="radio" value={classIndex.classType} checked={selectedClass === classIndex} onChange={() => handleClassSelect(classIndex)} />{classIndex.classType}</label>)}
            </div>
          </div>
          <button className="mt-4 btn btn-primary" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default ToolComponent;