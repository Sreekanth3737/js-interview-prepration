import React, { useState } from "react";
import styles from "./app.module.scss";
import Form from "./Form";

const GRID_SIZE = 9;
const NUMBER_LIST = Array.from({ length: GRID_SIZE }, (_, i) => i + 1);

const Grid = () => {
  const [colorArr, setColorArr] = useState<number[]>([]);

  const handleColor = (num: number) => {
    setColorArr((prev) => [...new Set([...prev, num])]);
  };
  const handleClear = () => {
    setColorArr([]);
  };

  return (
    <div>
      <div className={styles.grid}>
        {NUMBER_LIST.map((item) => (
          <button
            onClick={() => {
              setColorArr((prev) => [...new Set([...prev, item])]);
            }}
            className={`${styles.btn} ${
              colorArr.includes(item) ? styles.colorGrid : ""
            } `}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.form}>
        <Form handleClear={handleClear} handleColor={handleColor} />
      </div>
    </div>
  );
};

export default Grid;
