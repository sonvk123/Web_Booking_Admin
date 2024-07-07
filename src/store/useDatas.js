import { useEffect, useState } from "react";

export const useDatas = (type, url, method, searchData) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_Log = async () => {
      const apiUrl = `http://localhost:5000/admin/${url}`;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          apiUrl,
          method === "post"
            ? {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(searchData),
              }
            : null
        );
        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json(); // Chuyển dữ liệu từ JSON sang đối tượng JavaScript
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "API request error:");
        throw error;
      }
    };
    fetch_Log();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};
