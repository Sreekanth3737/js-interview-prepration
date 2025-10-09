import React from "react";
import { Link } from "react-router-dom";

const ROUTES = [
  { link: "/grid-lights", title: "Grid Lights" },
  { link: "/tabs-component", title: "Tabs Component" },
  { link: "/infinite-scroll", title: "Infinite Scroll" },
  { link: "/nested-checkbox", title: "nested checkbox" },
  { link: "grid-colorizer", title: "GRID Colorizer" },
  { link: "checkbox-tree", title: "Checkbox Tree" },
  { link: "long-polling", title: "Long Polling" },
  { link: "notes-component", title: "notes-component" },
];

const Home = () => {
  return (
    <div style={{ padding: "4rem" }}>
      <h1>React Challenges</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
          justifyContent: "center",
        }}
      >
        {ROUTES.map((route, index) => {
          return (
            <li key={index}>
              <Link
                style={{
                  display: "flex",
                  padding: "2rem",
                  justifyContent: "space-between",
                  background: "#f5f5f5",
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: "#333",
                  fontFamily: "serif",
                  fontWeight: 600,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                to={route.link}
              >
                {route.title}
                <span style={{ fontWeight: 400 }}>{route.link}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
