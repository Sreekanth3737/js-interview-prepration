import React, { useState } from "react";
import classes from "./app.module.scss";

const Component1 = () => {
  return (
    <div>
      <h1>component 1</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laudantium
        repudiandae expedita placeat quo,{" "}
      </p>
    </div>
  );
};
const Component2 = () => {
  return (
    <div>
      <h1>component 2</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laudantium
        repudiandae expedita placeat quo,{" "}
      </p>
    </div>
  );
};
const Component3 = () => {
  return (
    <div>
      <h1>component 3</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laudantium
        repudiandae expedita placeat quo,{" "}
      </p>
    </div>
  );
};

const Components = [
  {
    id: 1,
    component: <Component1 />,
  },
  {
    id: 2,
    component: <Component2 />,
  },
  {
    id: 3,
    component: <Component3 />,
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <div className={classes.tabContainer}>
        <ul className={classes.tabs}>
          {Components.map((item) => {
            return (
              <li
                style={{
                  cursor: activeTab !== item.id ? "pointer" : "not-allowed",
                }}
                onClick={() => setActiveTab(item.id)}
                className={`${classes.tabItem} ${
                  activeTab === item.id ? classes.active : ""
                }`}
                key={item.id}
              >
                Tab-{item.id}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.tabContent}>
        {Components.find((item) => item.id === activeTab)?.component}
      </div>
    </>
  );
};

export default Tabs;
