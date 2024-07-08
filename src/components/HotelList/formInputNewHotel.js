import { useState, useEffect } from "react";

import styles from "./NewHotel.module.css";

const FormInput = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    description: "",
    price: "",
    featuredOption: false,
    images: "",
  });

  const [isEmpty, setIsEmpty] = useState({
    name: false,
    type: false,
    city: false,
    address: false,
    distance: false,
    title: false,
    description: false,
    price: false,
    images: false,
  });
  const [isTouched, setIsTouched] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e, field) => {
    // Use a single handleChange function for all fields
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsEmpty((prev) => ({
      ...prev,
      [field]: value.trim() === "" ? false : true,
    }));
  };

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
      isEmpty.images
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isEmpty]);

  const handleSubmit = () => {
    setIsTouched(true);
    if (isValid) {
      props.onChange(formData);
    }
  };

  return (
    <div className={styles.NewHotel}>
      <div className={styles.title}>
        <h1>Add New Hotel</h1>
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
                value={formData.featuredOption}
                onChange={(e) => handleChange(e, "featuredOption")}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          {/* <div className={styles.Rooms}>
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
          </div> */}
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
