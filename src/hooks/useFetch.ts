import { useEffect, useState } from 'react';

type FetchState<T> = {
  data: T | null;
};

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Ошибка получения данных:', err);
      }
    };
    fetchData();
  }, [url]);
  return { data };
};
export default useFetch;
