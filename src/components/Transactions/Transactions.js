import React, { useEffect, useState } from "react";

import { useDatas } from "../../store/useDatas";
import { format } from "date-fns";
import styles from "./Transactions.module.css";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 8;

  const url = `getTransactionsAll?pageSize=${pageSize}&currentPage=${currentPage}`;
  const { data, error, loading } = useDatas("", url, "get");

  const totalPages = data.totalPages;

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
          <h1>Transactions List</h1>
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
            <p>User</p>
          </div>
          <div className={styles.item}>
            <p>Hotel</p>
          </div>
          <div className={styles.item}>
            <p>Room</p>
          </div>
          <div className={styles.item}>
            <p>Date</p>
          </div>
          <div className={styles.item}>
            <p>Price</p>
          </div>
          <div className={styles.item}>
            <p>Payment Method</p>
          </div>
          <div className={styles.item}>
            <p>Status</p>
          </div>
        </div>
        {/* thông tin chi tiết */}
        <div className={styles.title_items_Transaction_all}>
          {loading === false &&
            error === null &&
            data.currentPageData.map((value, i) => (
              <div key={i} className={styles.title_items_Transaction}>
                <div className={styles.item_value}>
                  <input type="checkbox" id="" name="" />
                </div>
                <div className={styles.item_value}>
                  <p>{value._id}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.user}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.hotel}</p>
                </div>
                <div className={`${styles.Room} ${styles.item_value}`}>
                  {value.room.map((room, roomIndex) => (
                    // Kiểm tra xem phòng hiện tại có phải là phòng cuối cùng không
                    <p key={roomIndex}>
                      {roomIndex === value.room.length - 1 ? room : room + ","}
                    </p>
                  ))}
                </div>
                <div className={styles.item_value}>
                  <p>{`${format(
                    new Date(value.dateStart),
                    "MM/dd/yyyy"
                  )}  -  ${format(new Date(value.dateEnd), "MM/dd/yyyy")}`}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.price}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.payment}</p>
                </div>
                <div className={`${styles.status} ${styles.item_value}`}>
                  <p className={styles[value.status]}>{value.status}</p>
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

export default Transactions;
