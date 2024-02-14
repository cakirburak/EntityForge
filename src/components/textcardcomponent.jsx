import { useState } from "react";

const TextCardComponent = ({ text, onClick }) => {

	const [clicked, setClicked] = useState(false)

	const handleClick = (e) => {
		onClick(e);
		setClicked(!clicked)
	}

	const handleCheckboxChange = (e) => {
		setClicked(!clicked)
	}

	return (
		<div className="d-flex mb-2 p-0 btn btn-outline-secondary">
			<input
				className="mx-2"
				type="checkbox"
				checked={clicked}
				onChange={handleCheckboxChange}
			/>
			<h5
				className="text-start p-2 text-truncate h-25 m-0 w-100"
				onClick={handleClick}
			>
				{text}
			</h5>
		</div>
	);
};

export default TextCardComponent;