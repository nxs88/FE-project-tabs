import { useEffect, useReducer } from 'react';

type FetchState<T> = {
  data: T | null;
};
type Action<T> = {
  type: 'setData';
  data: T;
};
const reducer = <T>(state: FetchState<T>, action: Action<T>) => {
  if (action.type === 'setData') {
    return { ...state, data: action.data };
  }
  return state;
};

export const useFetch = <T>(url: string): FetchState<T> => {
  const [state, dispatch] = useReducer(reducer, { data: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        dispatch({ type: 'setData', data: result });
      } catch (err) {
        console.error('Ошибка получения данных:', err);
      }
    };
    fetchData();
  }, [url]);
  return state;
};
export default useFetch;
