import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

function ToolComponent({classes,text,setIsChecked}) {

  const [namedEntities, setNamedEntities] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const contentEditableRef = useRef(null);

  const entityColors = {
    date: "#ffee58",
    time: "#64b5f6",
    place: "#336BFF",
    person: "#36FF33",
    PNR: "#FF33C7",
    fee: "#BCCD10",
    reason: "#E6610A",
    upadated: "#0AD2E6",
  };

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

    contentEditableRef.current.innerHTML = text;
  };

  const handleEntitySet = (e) => {
    e.preventDefault();
    var entity = e.target.textContent;
    var selectedText = window.getSelection().toString();
    console.log(window.getSelection()+ ", Entity set to " + e.target.textContent);
    var start = text.indexOf(selectedText);
    var end = start + selectedText.length;

    const entityColor = entityColors[entity] || "#ffffff";

    setNamedEntities([...namedEntities, {text:selectedText, entity:entity, indexStart:start, indexEnd:end}]);

    const contentEditableDiv = document.getElementById("content-editable");
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = entityColor; // Change this to your desired background color
    range.surroundContents(span);
  };

  return (
    <div className="px-2 h-100">
      <form onSubmit={handleSubmit} className="h-100">
        <div className="d-flex flex-column h-100">
          <div className="w-100 h-50 mb-3">
            <div
              id="content-editable"
              ref={contentEditableRef}
              className="w-100 h-100 fs-5"
              contentEditable
              dangerouslySetInnerHTML={{ __html: text }}
            />
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