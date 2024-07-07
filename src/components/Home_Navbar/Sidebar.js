import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHotel,
  faArrowRightFromBracket,
  faTableColumns,
  faTruck,
  faClapperboard,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  // Lưu giá trị vào localStorage
  const saveLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };

  // xóa giá trị vào localStorage
  const deleteLocalStorage = (name) => {
    localStorage.removeItem(name);
  };
  const click_Logout = () => {
    saveLocalStorage("isLogin", false);
    deleteLocalStorage("User");
    navigate("/login");
  };
  return (
    <>
      {/* Main */}
      <div className={styles.Sidebar}>
        <div className={styles.items}>
          <p>MAIN</p>
          <div className={styles.item}>
            <div>
              <NavLink to="/dashboard">
                <FontAwesomeIcon
                  icon={faTableColumns}
                  style={{ color: "#005eff" }}
                />
                <span> Dashboard</span>
              </NavLink>
            </div>
          </div>
        </div>
        {/* LISTS */}
        <div className={styles.items}>
          <p>LISTS</p>
          <div className={styles.item}>
            <div>
              <NavLink to="/#">
                <FontAwesomeIcon icon={faUser} style={{ color: "#005eff" }} />{" "}
                <span> User</span>
              </NavLink>
            </div>
            <div>
              <NavLink to="/hotelList">
                <FontAwesomeIcon icon={faHotel} style={{ color: "#005eff" }} />{" "}
                <span> Hotel</span>
              </NavLink>
            </div>
            <div>
              <NavLink to="/roomsList">
                <FontAwesomeIcon
                  icon={faClapperboard}
                  style={{ color: "#005eff" }}
                />{" "}
                <span> Rooms</span>
              </NavLink>
            </div>

            <div>
              <NavLink to="/transactions">
                <FontAwesomeIcon icon={faTruck} style={{ color: "#005eff" }} />
                <span> Transactions</span>
              </NavLink>
            </div>
          </div>
        </div>
        {/* NEW */}
        <div className={styles.items}>
          <p>NEW</p>
          <div className={styles.item}>
            <NavLink to="/newHotel">
              <FontAwesomeIcon icon={faHotel} style={{ color: "#005eff" }} />
              <span> New Hotel</span>
            </NavLink>

            <div>
              <NavLink to="/newRoom">
                <FontAwesomeIcon
                  icon={faClapperboard}
                  style={{ color: "#005eff" }}
                />
                <span> New Room</span>
              </NavLink>
            </div>
          </div>
        </div>
        {/* USER */}
        <div className={styles.items}>
          <p>NEW</p>
          <div className={styles.button}>
            <button className={styles.btn_Logout} onClick={click_Logout}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                style={{ color: "#005eff" }}
              />
              <span> Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
