const useExport = (exportData) => {

	const handleExport = () => {

		// delete the color property
		exportData.forEach((data) => {
			data.namedEntities.forEach((entity) => {
				delete entity.color
				delete entity.spanId
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

	return handleExport
}

export default useExport