/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [User, setUser] = useState([]);

  // Lấy giá trị vào localStorage
  const LocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
  };

  // Kiểm tra đã đăng nhập chưa
  useEffect(() => {
    const value = localStorage.getItem("isLogin");
    if (value === "true") {
      setIsLogin(true);
    } else if (value === "false") {
      setIsLogin(false);
    }
    setUser(LocalStorage("User"));
  }, [localStorage.getItem("isLogin")]);

  // Thay thế URL hiện tại bằng URL mới
  const handleRedirect = () => {
    window.location.replace("http://localhost:3001");
  };

  const click_Login = () => {
    navigate("/login");
  };
  const NavBarLogin = () => {
    return (
      <form>
        <button className={styles.navButton} onClick={click_Login}>
          Login
        </button>
      </form>
    );
  };

  return (
    <>
      {/* navbar */}
      <div className={styles.navbar}>
        <div className={styles.navContainer}>
          <span className={styles.logo} onClick={handleRedirect}>
            Booking Website
          </span>
          <div className={styles.navItems}>
            {isLogin === false && <NavBarLogin />}
            {isLogin === true && <p>{User.email}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
