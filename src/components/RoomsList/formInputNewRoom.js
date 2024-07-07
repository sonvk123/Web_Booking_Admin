import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./NewRoom.module.css";

const FormInput = (props) => {
  const location = useLocation();
  const dataNewHotel = location.state.data || {};

  console.log("dataNewHotel:", dataNewHotel);
  const type = props.type;
  const data = props.data;

  // set dữ liệu room cần sửa hoăc cập nhật
  const [formData, setFormData] = useState({
    title: type === "edit" ? data.title : "",
    description: type === "edit" ? data.desc : "",
    price: type === "edit" ? data.price : "",
    maxPeople: type === "edit" ? data.maxPeople : "",
    rooms: type === "edit" ? data.roomNumbers.join("\n") : "",
    hotelName: "false",
  });

  useEffect(() => {

    if (dataNewHotel) {
      setFormData(prevFormData => ({
        ...prevFormData,
        hotelName: "true"
      }));
    }
  }, [dataNewHotel]); 

  // kiểm tra xem các input đã đsung đinh dạng hay chưa
  const [isEmpty, setIsEmpty] = useState({
    title: false,
    description: false,
    price: false,
    maxPeople: false,
    rooms: false,
    hotelName: type === "new" ? false : true,
  });

  // kiểm tra xem tất cả các input đã đúng hay chưa
  const [isValid, setIsValid] = useState(false);

  // kiểm tra đã nhấn send hay chưa
  const [isTouched, setIsTouched] = useState(false);

  // khi thay đổi các input

  const handleChange = (e, field) => {
    const value = e.target.value;

    // thay đổi giá trị trong formData

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // kiểm tra giá trị các input
    if (field !== "hotelName") {
      setIsEmpty((prev) => ({
        ...prev,
        [field]: value.trim() === "" ? false : true,
      }));
    } else if (field === "hotelName") {
      setIsEmpty((prev) => ({
        ...prev,
        [field]: value.trim() === "false" ? false : true,
      }));
    }
  };

  // kiểm tra xem giá trị mặc định có đúng hay không
  const test = (formData) => {
    setIsEmpty({
      title: formData.title.trim() === "" ? false : true,
      description: formData.description.trim() === "" ? false : true,
      price: formData.price === "" ? false : true,
      maxPeople: formData.maxPeople === "" ? false : true,
      rooms: formData.rooms.trim() === "" ? false : true,
      hotelName: true,
    });
  };

  // khi reload lại trang sẽ kiểm tra một lượt xem có input nào sai
  useEffect(() => {
    test(formData);
  }, []);

  // mỗi khi input thay đổi sẽ kiểm tra isEmpty
  useEffect(() => {
    if (
      isEmpty.title &&
      isEmpty.description &&
      isEmpty.price &&
      isEmpty.maxPeople &&
      isEmpty.rooms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isEmpty]);

  // khi nhấn send
  const handleSubmit = () => {
    setIsTouched(true);
    if (isValid) {
      console.log("formData:", formData);
      console.log("props:", props);
      props.onClick(formData);
    }
  };

  return (
    <div className={styles.NewRoom}>
      <div className={styles.title}>
        {type === "new" ? <h1>Add New Room</h1> : <h1>Edit Room {}</h1>}
      </div>
      <div className={styles.input_all}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div>
              <label>Title</label>
              <input
                onChange={(e) => handleChange(e, "title")}
                value={formData.title}
                className={!isEmpty.title && isTouched ? styles.error : ""}
              />
              {!isEmpty.title && isTouched && (
                <span className={styles.errorMessage}>
                  Title không được để trống !!!
                </span>
              )}
            </div>
            <div>
              <label>Price</label>
              <input
                onChange={(e) => handleChange(e, "price")}
                value={formData.price}
                type="number"
                className={!isEmpty.price && isTouched ? styles.error : ""}
              />
              {!isEmpty.price && isTouched && (
                <span className={styles.errorMessage}>
                  Price không được để trống !!!
                </span>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <label>Description</label>
              <input
                onChange={(e) => handleChange(e, "description")}
                value={formData.description}
                className={
                  !isEmpty.description && isTouched ? styles.error : ""
                }
              />
              {!isEmpty.description && isTouched && (
                <span className={styles.errorMessage}>
                  Description không được để trống !!!
                </span>
              )}
            </div>
            <div>
              <label>Max People</label>
              <input
                onChange={(e) => handleChange(e, "maxPeople")}
                value={formData.maxPeople}
                type="number"
                className={!isEmpty.maxPeople && isTouched ? styles.error : ""}
              />
              {!isEmpty.maxPeople && isTouched && (
                <span className={styles.errorMessage}>
                  Max People không được để trống !!!
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>
            <label>Rooms</label>
            <textarea
              onChange={(e) => handleChange(e, "rooms")}
              value={formData.rooms}
              className={!isEmpty.rooms && isTouched ? styles.error : ""}
              placeholder="Đặt dấu  , ở giữa các số phòng "
            />
            {!isEmpty.rooms && isTouched && (
              <span className={styles.errorMessage}>
                Rooms không được để trống !!!
              </span>
            )}
          </div>
          {type === "new" && (
            <div>
              <label>Choose a hottel</label>

              <select
                value={formData.hotelName}
                onChange={(e) => handleChange(e, "hotelName")}
              >
                {dataNewHotel ? (
                  <option
                    key={dataNewHotel._id}
                    value={String(dataNewHotel._id)}
                  >
                    {dataNewHotel.name}
                  </option>
                ) : (
                  <>
                    <option value="false">Mời chọn 1 khách sạn</option>
                    {data.length > 0 &&
                      data.map((value) => (
                        <option key={value._id} value={String(value._id)}>
                          {value.name}
                        </option>
                      ))}
                  </>
                )}
              </select>

              {!isEmpty.hotelName && isTouched && (
                <span className={styles.errorMessage}>
                  Mời chọn 1 khách sạn để thêm
                </span>
              )}
            </div>
          )}
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};
export default FormInput;
