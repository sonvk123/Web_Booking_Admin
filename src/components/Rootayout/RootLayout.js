import { Outlet } from "react-router-dom";

import Navbar from "../Home_Navbar/Navbar";
import Sidebar from "../Home_Navbar/Sidebar";

import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.Sidebar_main}>
        <div className={styles.AdminPage}>
          <p>Admin Page</p>
        </div>
        <div className={styles.null}></div>
        <div className={styles.Sidebar}>
          <Sidebar />
        </div>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
