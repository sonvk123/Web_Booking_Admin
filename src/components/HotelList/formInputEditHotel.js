import { useState, useEffect } from "react";

import styles from "./NewHotel.module.css";

const FormInput = (props) => {
  const data = props.data.data;

  // set dữ liệu khách sạn cần sửa
  const [formData, setFormData] = useState({
    name: data.name,
    type: data.type,
    city: data.city,
    address: data.address,
    distance: data.distance,
    title: data.title || "",
    description: data.desc,
    price: data.price,
    rooms: data.rooms.join("\n\n"),
    featured: data.featured,
    images: data.photos.join("\n\n"),
  });

  // kiểm tra xem các input đã đsung đinh dạng hay chưa
  const [isEmpty, setIsEmpty] = useState({
    name: false,
    type: false,
    city: false,
    address: false,
    distance: false,
    title: false,
    description: false,
    price: false,
    rooms: false,
    images: false,
  });
  // kiểm tra đã nhấn send hay chưa
  const [isTouched, setIsTouched] = useState(false);

  // kiểm tra xem tất cả các input đã đúng hay chưa
  const [isValid, setIsValid] = useState(false);

  // khi thay đổi các input
  const handleChange = (e, field) => {
    const value = e.target.value;

    // thay đổi giá trị trong formData
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // kiểm tra giá trị các input
    setIsEmpty((prev) => ({
      ...prev,
      [field]: value.trim() === "" ? false : true,
    }));
  };

  // kiểm tra xem giá trị mặc định có đúng hay không
  const test = (formData) => {
    setIsEmpty({
      name: formData.name.trim() === "" ? false : true,
      type: formData.type.trim() === "" ? false : true,
      city: formData.city.trim() === "" ? false : true,
      address: formData.address.trim() === "" ? false : true,
      distance: formData.distance.trim() === "" ? false : true,
      title: formData.title.trim() === "" ? false : true,
      description: formData.description.trim() === "" ? false : true,
      price: formData.price === "" ? false : true,
      rooms: formData.rooms.trim() === "" ? false : true,
      images: formData.images.trim() === "" ? false : true,
    });
  };

  // khi reload lại trang sẽ kiểm tra một lượt xem có input nào sai
  useEffect(() => {
    test(formData);
  }, []);

  // mỗi khi input thay đổi sẽ kiểm tra isEmpty
  useEffect(() => {
    if (
      isEmpty.name &&
      isEmpty.type &&
      isEmpty.city &&
      isEmpty.address &&
      isEmpty.distance &&
      isEmpty.title &&
      isEmpty.description &&
      isEmpty.price &&
      isEmpty.rooms &&
      isEmpty.images
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isEmpty]);

  // khi nhấn send
  const handleSubmit = () => {
    setIsTouched(true);
    test(formData);
    if (isValid) {
      props.onChange(formData);
    }
  };
  return (
    <div className={styles.NewHotel}>
      <div className={styles.title}>
        <h1>Edit Hotel</h1>
      </div>
      <div className={styles.input_all}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div>
              <label>Name</label>
              <input
                onChange={(e) => handleChange(e, "name")}
                value={formData.name}
                className={!isEmpty.name && isTouched ? styles.error : ""}
              />
              {!isEmpty.name && isTouched && (
                <span className={styles.errorMessage}>
                  Name không được để trống !!!
                </span>
              )}
            </div>
            <div>
              <label>City</label>
              <input
                onChange={(e) => handleChange(e, "city")}
                value={formData.city}
                className={!isEmpty.city && isTouched ? styles.error : ""}
              />
              {!isEmpty.city && isTouched && (
                <span className={styles.errorMessage}>
                  City không được để trống !!!
                </span>
              )}
            </div>
            <div>
              <label>Distance from City Center</label>
              <input
                onChange={(e) => handleChange(e, "distance")}
                type="number"
                value={formData.distance}
                className={!isEmpty.distance && isTouched ? styles.error : ""}
              />
              {!isEmpty.distance && isTouched && (
                <span className={styles.errorMessage}>
                  Distance không được để trống !!!
                </span>
              )}
            </div>
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
              <label>Images</label>
              <textarea
                onChange={(e) => handleChange(e, "images")}
                value={formData.images}
                className={!isEmpty.images && isTouched ? styles.error : ""}
              ></textarea>
              {!isEmpty.images && isTouched && (
                <span className={styles.errorMessage}>Images are required</span>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <label>Type</label>
              <input
                onChange={(e) => handleChange(e, "type")}
                value={formData.type}
                className={!isEmpty.type && isTouched ? styles.error : ""}
              />
              {!isEmpty.type && isTouched && (
                <span className={styles.errorMessage}>
                  Type không được để trống !!!
                </span>
              )}
            </div>
            <div>
              <label>Address</label>
              <input
                onChange={(e) => handleChange(e, "address")}
                value={formData.address}
                className={!isEmpty.address && isTouched ? styles.error : ""}
              />
              {!isEmpty.address && isTouched && (
                <span className={styles.errorMessage}>
                  Address không được để trống !!!
                </span>
              )}
            </div>
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
            <div>
              <label>Featured</label>
              <select
                value={formData.featured}
                onChange={(e) => handleChange(e, "featured")}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.Rooms}>
            <label>Rooms</label>
            <textarea
              onChange={(e) => handleChange(e, "rooms")}
              value={formData.rooms}
              className={!isEmpty.rooms && isTouched ? styles.error : ""}
            ></textarea>
            {!isEmpty.rooms && isTouched && (
              <span className={styles.errorMessage}>
                Rooms không được để trống !!!
              </span>
            )}
          </div>
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
