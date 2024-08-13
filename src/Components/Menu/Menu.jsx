import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();

  const menuData = [
    { path: "/", name: "Summary" },
    { path: "/chart", name: "Chart" },
    { path: "/statistics", name: "Statistics" },
    { path: "/analysis", name: "Analysis" },
    { path: "/settings", name: "Settings" },
  ];

  return (
    <div className="menuContainer">
      <ul className="unorderList">
        {menuData.map((item, key) => {
          return (
            <Link
              to={item.path}
              key={key}
              className={`${item.path === location.pathname ? "selected" : ""}`}
            >
              <li>{item.name}</li>
            </Link>
          );
        })}
      </ul>

      <div className="divider"></div>
    </div>
  );
};

export default Menu;
