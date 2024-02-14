import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import useHandleEntitySet from '../utils/useHandleEntityset';

function ToolComponent({ classes, text, setExportData, exportData }) {

	const [selectedClass, setSelectedClass] = useState('');
	const [selectedTexts, setSelectedTexts] = useState([]); // text itself at 0, endOffset at 1 
	const [namedEntities, setNamedEntities] = useState([]);

	const contentEditableRef = useRef(null);
	const colors = [
		["primary", "#106cf6"],
		["secondary", "#6c757d"],
		["success", "#3b8855"],
		["info", "#53caf0"],
		["warning", "#f8c146"],
		["danger", "#dc3545"]
	];

	var entities = "";
	if (selectedClass !== null && selectedClass !== undefined) {
		entities = selectedClass.entities;
	}

	const handleClassSelect = (className) => {
		setSelectedClass(className);
	};

	const handleEntitySet2 = useHandleEntitySet(setSelectedTexts, selectedTexts, setNamedEntities, namedEntities, text)

	const handleSubmit = (e) => {
		e.preventDefault();

		var output = {
			text: text,
			classType: selectedClass,
			namedEntities: namedEntities
		}
		setExportData([...exportData, output]);

		contentEditableRef.current.innerHTML = text;

		setNamedEntities([]);
	};

	const handleRemoveEntity = (spanIdToRemove) => {

		const updatedEntities = namedEntities.filter((entity) => entity.spanId !== spanIdToRemove);
		setNamedEntities(updatedEntities);

		const contentEditableDiv = contentEditableRef.current;
		const spanToRemove = contentEditableDiv.querySelector(`#${spanIdToRemove}`);

		if (spanToRemove) {
			spanToRemove.style.backgroundColor = "white";
			const textNode = document.createTextNode(spanToRemove.textContent);
			contentEditableDiv.replaceChild(textNode, spanToRemove);
		}
	};


	useEffect(() => {
		setNamedEntities([]);
		setSelectedClass('');
	}, [text])

	return (
		<div className="row px-2 h-100">
			<div className='col'>
				<form onSubmit={handleSubmit} className="h-100">
					<div className="d-flex flex-column h-100">
						<div className="w-100 h-50 mb-3">
							<div
								id="content-editable"
								ref={contentEditableRef}
								className="w-100 h-100 fs-5 bg-white text-dark"
								// contentEditable
								dangerouslySetInnerHTML={{ __html: text }}
							/>
						</div>
						<div className="mt-3 d-flex flex-column align-items-center">
							{entities && <div className="w-100 text-start fs-5 ms-4">Entities</div>}
							<div className="d-flex flex-wrap w-100 mt-2">
								{entities && entities.map((entity, index) => (
									<button
										key={index}
										id="entityButtons"
										type="button"
										className={`btn m-2 btn-${colors[index][0]}`}
										onClick={(e) => handleEntitySet2(e, colors[index][1], colors[index][0])}>
										{entity}
									</button>
								))}
							</div>
						</div>
						<div className="mt-3 d-flex flex-column align-items-center">
							<div className="w-100 text-start fs-5 ms-4">Classification</div>
							<div className="d-flex flex-wrap w-100">
								{classes && classes.map((classIndex) => (
									<label className="mx-3 my-2">
										<input className="mx-1"
											type="radio"
											value={classIndex.classType}
											checked={selectedClass === classIndex}
											onChange={() => handleClassSelect(classIndex)} />
										{classIndex.classType}
									</label>
								))}
							</div>
						</div>
						<button className="mt-4 btn btn-primary" type="submit">Update</button>
					</div>
				</form>
			</div>
			<div className='col-4 border-start'>
				<div className='mt-3 d-flex flex-column no-wrap'>
					<div className='fs-4 mb-3'>{selectedClass.classType}</div>
					{selectedClass.classType && <hr className="hr bg-white"></hr>}
					{namedEntities && namedEntities.map((entity) => (
						<div className='fs-5 my-2 d-flex no-wrap justify-content-between align-items-center' key={entity.spanId}>
							<div className={`text-center bg-${entity.color}`}>{entity.text} : {entity.entity}</div>
							<span className='btn btn-outline-danger btn-sm' onClick={() => handleRemoveEntity(entity.spanId)}>X</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ToolComponent;