import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faShoppingCart,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";

import { useDatas } from "../../store/useDatas";

import { format } from "date-fns";
const Dashboard = () => {
  const { data, error, loading } = useDatas(
    "getTransactions",
    "getTransactions",
    "get"
  );

  return (
    <div className={styles.InfoBoard_all}>
      {/* InfoBoard để hiển thị các thông tin kinh doanh cơ bản: 
      Số lượng người dùng, 
      số giao dịch, tổng doanh thu, 
      doanh thu trung bình hàng tháng. */}
      <div className={styles.InfoBoard}>
        <div className={styles.InfoBoard_items}>
          <div>USER</div>
          <div className={styles.InfoBoard_info}>{data.user}</div>
          <div className={`${styles.InfoBoard_icon} ${styles.user_icon}`}>
            <FontAwesomeIcon icon={faUser} style={{ color: "#ff0000" }} />
          </div>
        </div>
        <div className={styles.InfoBoard_items}>
          <div>ORDERS</div>
          <div className={styles.InfoBoard_info}>{data.order}</div>
          <div className={`${styles.InfoBoard_icon} ${styles.order_icon}`}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ color: "#717000a6" }}
            />
          </div>
        </div>
        <div className={styles.InfoBoard_items}>
          <div>EARNINGS</div>
          <div className={styles.InfoBoard_info}>$ {data.rarnings}</div>
          <div className={`${styles.InfoBoard_icon} ${styles.rarnings_icon}`}>
            <FontAwesomeIcon icon={faDollarSign} style={{ color: "#008015" }} />
          </div>
        </div>
        <div className={styles.InfoBoard_items}>
          <div>BLANCE</div>
          <div className={styles.InfoBoard_info}>$ {data.blance}</div>
          <div className={`${styles.InfoBoard_icon} ${styles.blance_icon}`}>
            <FontAwesomeIcon icon={faUser} style={{ color: "#ff0000" }} />
          </div>
        </div>
      </div>
      {/* bảng danh sách */}
      <div className={styles.Transaction}>
        {/* tên chức năng */}
        <p className={styles.title}>Latest Transactions</p>
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
            <p>Hotle</p>
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
            data.data.map((value) => (
              <div className={styles.title_items_Transaction} key={value._id}>
                <div className={styles.item_value}>
                  <input type="checkbox" id={value.id} name={value.id} />
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
                <div className={styles.item_value}>
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
                  <p>${value.price}</p>
                </div>
                <div className={styles.item_value}>
                  <p>{value.payment}</p>
                </div>
                <div className={styles.item_value}>
                  <p className={styles[value.status]}>{value.status}</p>
                </div>
              </div>
            ))}
        </div>
        {/* div */}
        <div className={styles.cach}></div>
      </div>
    </div>
  );
};

export default Dashboard;
