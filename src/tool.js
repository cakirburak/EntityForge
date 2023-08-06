import TextCardComponent from './components/textcardcomponent'
import ToolComponent from './components/toolcomponent'
import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useRef } from 'react';

function Tool() {

  const { data: texts, isPending: isTextPending, error: textError } = useFetch('http://localhost:8000/texts');
  const { data: classes, isPending: isClassesPending, error: classesError } = useFetch('http://localhost:8000/classes');
  const [text, setText] = useState('');

  const childRef = useRef();

  const wrapperFunction = () => {
    // check that the ref exists to avoid errors
    if (!childRef.current) return;

    childRef.current.instanceMethod();
  }

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <h1 className="text-center py-2 mb-4 bg-light bg-gradient">Project Name</h1>
      <div className="row mx-3 text-center">
        <div className="col-3 bg-light mx-2 py-4">
          {isTextPending && <div> Loading </div>}
          {texts && texts.map((text) => <TextCardComponent text={text} setTemp={setText} ref={childRef}/>) }
        </div>
        <div className="col bg-light mx-2 py-4" style={{ height: '685px'}}>
          {isClassesPending && <div> Loading </div>}
          {classes && <ToolComponent classes={classes} text={text} setIsChecked={wrapperFunction}/>}
        </div>
        <div className="col-2 bg-light mx-2">
          <h1 className="mb-4">Stats</h1>
          <div className="fs-5">4/256 Compeleted</div>
        </div>
      </div>
    </div>
  );
}

export default Tool;