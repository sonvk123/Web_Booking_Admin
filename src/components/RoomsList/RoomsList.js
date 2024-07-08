import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDatas } from "../../store/useDatas";

import styles from "./RoomsList.module.css";

const RoomsList = () => {
  const navigate = useNavigate();

  const [data_, setData] = useState([]);
  const [error_, setError] = useState(null);
  const [loading_, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 8;

  const urt = `roomsList?pageSize=${pageSize}&currentPage=${currentPage}`;

  const { data, error, loading } = useDatas("", urt, "get");

  
  let urlBe =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  const delete_api = async (id) => {
    const apiUrl = `${urlBe}admin/postDeleteRoom`;
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!res.ok) {
        const data = await res.json();
        const message = data.message;
        setError(message);
        window.alert(message);
        return;
      } else {
        const data = await res.json();
        setError(null);
        setLoading(false);
        window.alert("xóa thành công");
        window.location.reload();
      }
    } catch (error) {
      setError(error.message || "API request error:");
    } finally {
      setLoading(false);
    }
  };
  const totalPages = data.totalPages;

  const click_add_new = () => {
    navigate("/newRoom");
  };
  const click_delete = (id, title) => {
    const shouldDelete = window.confirm(
      `Bạn có muốn xóa rooms có title là ${title} không?`
    );
    shouldDelete && delete_api(id);
  };

  const click_edit = (id) => {
    navigate(`/editRoom/${id}`);
  };
  const click_down = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const click_up = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className={styles.InfoBoard_all}>
      {/* bảng danh sách */}
      <div className={styles.Transaction}>
        <div className={styles.title}>
          <h1>Rooms List</h1>
          <button onClick={click_add_new}>Add New</button>
        </div>
        {/* thanh tiêu đề của bảng */}
        <div className={styles.title_items}>
          <div className={styles.item}>
            <input type="checkbox" id="" name="" />
          </div>
          <div className={styles.item}>
            <p>ID</p>
          </div>
          <div className={styles.item}>
            <p>Title</p>
          </div>
          <div className={styles.item}>
            <p>Description</p>
          </div>
          <div className={styles.item}>
            <p>Price</p>
          </div>
          <div className={styles.item}>
            <p>Max Prople</p>
          </div>
          <div className={styles.item}>
            <p>Action</p>
          </div>
          <div className={styles.item}>
            <p>Edit</p>
          </div>
        </div>
        {/* thông tin chi tiết */}
        <div className={styles.title_items_Transaction_all}>
          {loading === false &&
            error === null &&
            data.currentPageData.map((value) => (
              <div className={styles.title_items_Transaction} key={value._id}>
                <div className={styles.item_value}>
                  <input type="checkbox" id="" name="" />
                </div>
                <div className={styles.item_value}>
                  <p>{value._id}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.title}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.desc}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.price}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.maxPeople}</p>
                </div>
                <div
                  className={styles.buttom_delete}
                  onClick={() => click_delete(value._id, value.title)}
                >
                  <button>Delete</button>
                </div>
                <div
                  className={styles.buttom_edit}
                  onClick={() => click_edit(value._id)}
                >
                  <button>Edit</button>
                </div>
              </div>
            ))}
        </div>
        {/* div */}
        <div className={styles.cach}></div>
        <div className={styles.toAndFro}>
          <div>
            <p>{currentPage}</p>
            <p>-</p>
            <p>{totalPages}</p>
            <p>of</p>
            <p>{totalPages}</p>
            <button onClick={click_down}>{"<"}</button>
            <button onClick={click_up}>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsList;
