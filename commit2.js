import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi tải dữ liệu');
        return res.json();
      })
      .then(result => { if (isMounted) setData(result); })
      .catch(err => { if (isMounted) setError(err.message); })
      .finally(() => { if (isMounted) setLoading(false); });

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
};s