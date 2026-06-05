import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, isDesktop }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Leads", path: "/leads" },
    { name: "Sales", path: "/sales" },
    { name: "Agents", path: "/agents" },
    { name: "Reports", path: "/reports" },
    {name:"Settings",path:"settings"},
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          CRM
        </h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            style={{
              ...styles.link,
              backgroundColor:
                location.pathname === item.path ? "#ddd" : "transparent",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "220px",
    height: "100%",
    background: "#f4f4f4",
    padding: "20px",
    transition: "transform 0.3s ease",
    zIndex: 1000,
  },
  link: {
    display: "block",
    padding: "10px",
    margin: "5px 0",
    textDecoration: "none",
    color: "#333",
    borderRadius: "5px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },
};

export default Sidebar;