import React, { useEffect, useState } from "react";
import classes from "./app.module.scss";
const GRID_SIZE: number = 3;

const GridLights = () => {
  const totalCells = GRID_SIZE * GRID_SIZE;
  const [cells, setCells] = useState(
    Array.from({ length: totalCells }).fill(false)
  );
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = (index: number) => {
    console.log(index, "indeex");
    if (cells[index]) return;
    if (isLocked) return;
    const copySelectedOrder = [...selectedOrder];
    const copyCells = [...cells];
    if (!copyCells[index]) {
      copyCells[index] = true;
      copySelectedOrder.push(index);
    }
    console.log(copyCells);
    setCells(copyCells);
    setSelectedOrder(copySelectedOrder);
  };

  useEffect(() => {
    const timerIds: NodeJS.Timeout[] = [];
    if (selectedOrder.length === totalCells) {
      setIsLocked(true);
      const startTimerId = setTimeout(() => {
        [...selectedOrder].reverse().forEach((cellIndex, i) => {
          const timerId = setTimeout(() => {
            setCells((prev) => {
              const copy = [...prev];
              copy[cellIndex] = false;
              return copy;
            });
          }, i * 500);
          timerIds.push(timerId);
        });
        const resetSelectedOrder = setTimeout(() => {
          setSelectedOrder([]);
          setIsLocked(false);
        }, selectedOrder.length * 500);
        timerIds.push(resetSelectedOrder);
      }, 500);
      timerIds.push(startTimerId);
      return () => timerIds.forEach((t) => clearTimeout(t));
    }
  }, [selectedOrder]);
  return (
    <div className={classes.lightContainer}>
      <div className={classes.grid}>
        {cells.map((isGreen, index) => {
          return (
            <button
              disabled={isLocked}
              onClick={() => handleClick(index)}
              className={`${classes.cell} ${
                isGreen ? classes.cellGreen : classes.cellRed
              }`}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GridLights;
