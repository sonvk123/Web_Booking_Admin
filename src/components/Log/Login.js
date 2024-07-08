import { useState, useEffect, useContext } from "react";

import { DataContext } from "../../store/DataProvider";

import { useNavigate } from "react-router-dom";

import styles from "./Log.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { LOGIN } = useContext(DataContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // kiểm tra xem đã nhấn vào input chưa
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  //  kiểm tra xem nhập đúng hay sai
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  // kiểm tra xem đã đúng hết chưa
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    isValidEmail && isValidPassword ? setIsValid(true) : setIsValid(false);
  }, [isValidEmail, isValidPassword]);

  // Lưu giá trị vào localStorage
  const saveLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setIsEmailChanged(true);
    setError(null);
    validateEmail(e.target.value)
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    setIsPasswordChanged(true);
    setError(null);
    e.target.value.length >= 8
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
  };

  
  let urlBe =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  const fetch_Log = async () => {
    const input_register = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${urlBe}admin/postAdminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input_register), // Gửi dữ liệu data_search dưới dạng JSON
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json(); // Chuyển dữ liệu từ JSON sang đối tượng JavaScript
      LOGIN(data.data);
      saveLocalStorage("isLogin", true);
      saveLocalStorage("User", data.data);
      setData(data);
      setLoading(false);
      window.location.replace("http://localhost:3001");
    } catch (error) {
      setError(error.message);
    }
  };

  // khi nhấn nút đăng nhập
  const click_Login = async (e) => {
    e.preventDefault();
    setIsRegisterClicked(true);
    setIsEmailChanged(true);
    setIsPasswordChanged(true);
    if (!isValid) {
      return;
    }
    fetch_Log();
  };

  // kiểm tra xem đã lấy được data User chưa để đăng nhập
  if (!loading && error === null && data.data && data.data.length === 1) {
    saveLocalStorage("isLogin", true);
    saveLocalStorage("User", data.data[0]);
    navigate("/");
  }

  return (
    <>
      <div className={styles.Log}>
        <h1>Login</h1>
        <form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            onChange={changeEmail}
            className={styles.email}
            placeholder="email"
          ></input>
          {!isValidEmail && isEmailChanged && (
            <p>Định dạng email không hợp lệ</p>
          )}
          <input
            onChange={changePassword}
            className={styles.password}
            placeholder="password"
          ></input>
          {!isValidPassword && isPasswordChanged && isRegisterClicked && (
            <p>Password phải có ít nhất 8 ký tự</p>
          )}
          <button className={styles.button} onClick={click_Login}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
