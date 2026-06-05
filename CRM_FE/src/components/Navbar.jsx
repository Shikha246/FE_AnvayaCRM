const Navbar = ({ toggleSidebar, isOpen }) => {
  return (
    <div style={styles.navbar}>

      {/* Left Section */}
      <div style={styles.leftSection}>
        {!isOpen && (
          <button style={styles.menuBtn} onClick={toggleSidebar}>
            ☰
          </button>
        )}
      </div>

      {/* Center Title */}
      <h2 style={styles.title}>LeadFlow CRM Dashboard</h2>

      {/* Right Spacer */}
      <div style={styles.rightSection}></div>
    </div>
  );
};

const styles = {
  navbar: {
    height: "70px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    padding: "0",
  },

  leftSection: {
    width: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  rightSection: {
    width: "50px",
  },

  menuBtn: {
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    margin: 0,
    flex: 1,
    textAlign: "center",
    fontSize: "clamp(18px, 4vw, 24px)",
    fontWeight: "600",
    lineHeight: "1",
  },
};

export default Navbar;