import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div style={styles.container}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div style={{
          ...styles.main,
          marginLeft: isOpen ? "250px" : "10px", // 👈 control layout HERE
          transition: "0.3s",
        }}>
       <Navbar 
  toggleSidebar={() => setIsOpen(!isOpen)} 
  isOpen={isOpen} 
/>
        <div style={styles.content}><Outlet /> </div>
      </div>
    </div>
  );
};

const styles = {
  // container: {
  //   display: "flex",
  // },
  main: {
    flex: 1,
    minHeight: "100vh",
    background: "#f9f9f9",
  },
  content: {
    padding: "15px",
  },
};

export default Layout;