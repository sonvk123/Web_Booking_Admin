import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import FormInput from "./formInputNewRoom";
const EditRoom = () => {
  const { roomId } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [data_, setData_] = useState(null);
  const [error_, setError_] = useState(null);
  const [loading_, setLoading_] = useState(true);

  // gọi api lấy data
  useEffect(() => {
    const data_api = async (id) => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/admin/getRoomId`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }), // Gửi dữ liệu data_search dưới dạng JSON
        });

        if (!res.ok) {
          const errorData = await res.json();
          const message = errorData.message;
          setError(message);
        }
        const data = await res.json();
        setData(data.data[0]);
        setError(null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    data_api(roomId);
  }, []);

  // gọi api edit
  const call_api = async (data_send) => {
    try {
      setLoading_(true);
      const res = await fetch("http://localhost:5000/admin/postEditRoomId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_send), // Gửi dữ liệu data_search dưới dạng JSON
      });
      if (!res.ok) {
        const errorData = await res.json();
        const message = errorData.message;
        setError_(message);
        return;
      } else {
        const data = await res.json();
        setData_(data);
        setError_(null);
        window.alert("Đã sửa room thành công !!!");
        window.location.reload();
      }
    } catch (error) {
      setError_(error);
    } finally {
      setLoading_(false);
    }
  };
  const formData = (data) => {
    call_api({ data, roomId });
  };
  return (
    <>
      {loading === false && error === null && data ? (
        <FormInput
          onChange={formData}
          data={data}
          error={error}
          loading={loading}
          type={"edit"}
        />
      ) : (
        <p>Đang load ...</p>
      )}
    </>
  );
};
export default EditRoom;
