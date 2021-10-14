import { useState, useEffect, useRef } from 'react'

export const useFetch = (url) => {
  
  const isMounted = useRef(true);
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    // Al desmontar cambiar el valor de isMounted a false
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (isMounted.current) {
          setState({
            data,
            loading: false,
            error: null,
          })
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar la info'
        })
      })
  }, [url])

  return state;
}
