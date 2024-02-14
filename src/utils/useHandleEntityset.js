const usehandleEntitySet = (setSelectedTexts, selectedTexts, setNamedEntities, namedEntities, text) => {

	const handleEntitySet = (e, hexColor, colorText) => {
		e.preventDefault();

		var entity = e.target.textContent;
		var selectedText = window.getSelection().toString();
		if (selectedText.length <= 0) { alert("No text selected!"); return; }

		var occurance = 0;
		var startIndex = 0;
		selectedTexts.forEach((text) => {
			if (text[0] === selectedText) occurance++;
			startIndex = text[1];
		})
		var start = text.indexOf(selectedText, startIndex);
		var end = start + selectedText.length;

		const selectedTextBackgroundColor = hexColor;

		setSelectedTexts([...selectedTexts, [selectedText, end]])

		const entityId = namedEntities.length;
		const spanId = `entity-span-${entityId}`;

		const range = window.getSelection().getRangeAt(0);
		const span = document.createElement("span");
		span.id = spanId;
		span.style.backgroundColor = selectedTextBackgroundColor;
		range.surroundContents(span);

		setNamedEntities([...namedEntities, {
			text: selectedText,
			entity: entity,
			indexStart: start,
			indexEnd: end,
			color: colorText,
			spanId: spanId
		}]);
	};

	return handleEntitySet
}

export default usehandleEntitySet