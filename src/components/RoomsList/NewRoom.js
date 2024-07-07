import { useState, useEffect } from "react";

import { useDatas } from "../../store/useDatas";

import FormInput from "./formInputNewRoom";
const NewRoom = () => {
  const [error_, setError] = useState(null);
  const [loading_, setLoading] = useState(true);
  const url = `getAddRoom`;

  const showAlert = (message) => {
    window.alert(message);
  };
  const { data, error, loading } = useDatas("", url, "get");

  const call_api = async (data_send) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/admin/postAddRoom", {
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
        return;
      } else {
        const data = await res.json();
        showAlert("Đã thêm room thành công");
        window.location.reload();
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
  return (
    <FormInput
      data={data}
      error={error}
      loading={loading}
      onClick={formData}
      type={"new"}
    />
  );
};
export default NewRoom;
