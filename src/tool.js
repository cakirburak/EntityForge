import TextCardComponent from './components/textcardcomponent'
import ToolComponent from './components/toolcomponent'
import React, { useState } from 'react';
import useFetch from './useFetch';

function Tool() {

  const { data: texts, isPending: isTextPending, error: textError } = useFetch('http://localhost:8000/texts');
  const { data: classes, isPending: isClassesPending, error: classesError } = useFetch('http://localhost:8000/classes');

  const [textAreaText, setTextAreaText] = useState('');
  const [exportData, setExportData] = useState([]);
  const [textId, setTextID] = useState();

  const handleTextCardClick = (e, key) => {
    setTextAreaText(e.target.innerText);
    setTextID(key);
  }

  const handleExport = () => {

    // delete the color property
    exportData.forEach( (data) => {
      data.namedEntities.forEach( (entity) => {
        delete entity.color;
      })
    })

    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <h1 className="text-center py-2 mb-4 bg-light bg-gradient d-flex justify-content-around align-items-center">Project Name<div className="btn btn-primary" onClick={handleExport}>Export</div></h1>
      <div className="row mx-3 text-center">
        <div className="col-3 bg-light mx-2 py-4">
          {isTextPending && <div> Loading </div>}
          {texts && texts.map((text, index) => (
            <TextCardComponent
              anahtar={index}
              text={text}
              onClick={handleTextCardClick}
            />
          ))}
        </div>
        <div className="col bg-light mx-2 py-4" style={{ height: '685px' }}>
          {isClassesPending && <div> Loading </div>}
          {classes && <ToolComponent classes={classes} text={textAreaText} setExportData={setExportData} exportData={exportData} />}
        </div>
      </div>
      <div>{exportData.length > 0 ? console.log(exportData) : null}</div>
    </div>
  );
}

export default Tool;