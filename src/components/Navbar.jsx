const Navbar = ({ toggleSidebar, isOpen }) => {
  return (
    <div style={styles.navbar}>
      
      {/* Left: Hamburger */}
      {!isOpen && (
        <button style={styles.menuBtn} onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Center: Title */}
      <h2 style={styles.title}>Anvaya CRM Dashboard</h2>
    </div>
  );
};

const styles = {
  navbar: {
    height: "60px",
    background: "#fff",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    position: "relative", // 👈 important
    borderBottom: "1px solid #ddd",
  },
  menuBtn: {
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 1,
  },
  title: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)", // 👈 perfectly centers
    margin: 0,
  },
};

export default Navbar;