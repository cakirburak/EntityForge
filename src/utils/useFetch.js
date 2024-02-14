import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetch = (url) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			try {
				const res = await fetch(url)
				const data = await res.json()
				if (data.error) {
					throw new Error(data.error)
				}
				setData(data)
			} catch (error) {
				toast.error(error.message)
			} finally {
				setLoading(false)
			}
		}
		getData()
	}, [url])

	return { loading, data };
}

export default useFetch;