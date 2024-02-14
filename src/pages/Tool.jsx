import TextCardComponent from '../components/textcardcomponent'
import ToolComponent from '../components/toolcomponent'
import React, { useState } from 'react';
import useFetch from '../utils/useFetch';
import useExport from '../utils/useExport';

function Tool() {
	const { loading: textLoading, data: textData } = useFetch("http://localhost:8000/texts")
	const { loading: classLoading, data: classData } = useFetch('http://localhost:8000/classes');
	const { loading: pNameLoading, data: pName } = useFetch('http://localhost:8000/projectName');

	const [exportData, setExportData] = useState([]);
	const handleExport = useExport(exportData)

	const [textAreaText, setTextAreaText] = useState('');
	const handleTextCardClick = (e) => {
		setTextAreaText(e.target.innerText);
	}

	return (
		<div className="container-fluid min-vh-100 d-flex px-0 flex-column bg-secondary">
			<div className="d-flex bg-dark justify-content-around align-items-center text-white py-2 mb-4">
				<h1 className="text-white">
					{pNameLoading ?
						<div className="spinner-grow" role="status">
							<span className="sr-only">Loading...</span>
						</div>
						:
						pName.projectName}
				</h1>
				<div className="btn btn-primary" onClick={handleExport}>
					Export
				</div>
			</div>

			<div className="row mx-3 text-center">
				<div className="col-3 bg-dark mx-2 py-4 rounded">
					{textLoading &&
						<div className="spinner-grow" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					}
					{!textLoading && textData.length > 0 && textData.map((text, index) => (
						<TextCardComponent
							key={index}
							text={text}
							onClick={handleTextCardClick}
						/>
					))}
				</div>
				<div className="col bg-dark text-white mx-2 py-4 rounded" style={{ height: '685px' }}>
					{classLoading &&
						<div className="spinner-grow" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					}
					{!classLoading && classData.length > 0 &&
						<ToolComponent
							classes={classData}
							text={textAreaText}
							setExportData={setExportData}
							exportData={exportData}
						/>
					}
				</div>
			</div>
			{/* <div>{exportData.length > 0 ? console.log(exportData) : null}</div> */}
		</div>
	);
}

export default Tool;