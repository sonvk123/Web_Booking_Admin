import { useEffect, useState } from "react";

export const useDatas = (type, url, method, searchData) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let urlBe =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  useEffect(() => {
    const fetch_Log = async () => {
      const apiUrl = `${urlBe}admin/${url}`;
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
