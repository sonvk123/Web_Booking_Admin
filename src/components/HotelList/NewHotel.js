import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import FormInput from "./formInputNewHotel";

const NewHotel = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let urlBe =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  const call_api = async (data_send) => {
    try {
      setLoading(true);
      const res = await fetch(`${urlBe}admin/postAddHotel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_send), // Gửi dữ liệu data_search dưới dạng JSON
      });

      if (!res.ok) {
        const errorData = await res.json();
        const message = errorData.message;
        setError(message);
      } else {
        const data = await res.json();
        console.log("data:", data);
        const userResponse = window.confirm(
          `Đã thêm khách sạn thành công. \nBạn có muỗn thêm danh sách Rooms ?`
        );
        if (userResponse) {
          navigate("/newRoom", { state: { data: data.data } });
        }
        setError(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formData = (data) => {
    call_api(data);
  };
  return <FormInput onChange={formData} />;
};
export default NewHotel;
