import { useState } from "react";
import styles from "./app.module.scss";

interface FormProps {
  handleColor: (e: number) => void;
  handleClear: () => void;
}

const Form = ({ handleColor, handleClear }: FormProps) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const num: number = inputValue === "" ? NaN : parseInt(inputValue);
          handleColor(num);
          setInputValue("");
        }}
        className={styles.formWrapper}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="gridColor">Grid number</label>
          <input
            className={styles.input}
            type="number"
            value={inputValue}
            id="gridColor"
            onChange={(e) => {
              if (e.target.value === "") {
                setInputValue("");
                return;
              }
              let num = Number(e.target.value);
              console.log(typeof num);
              if (num < 1) {
                num = 1;
              }
              if (num > 9) {
                num = 9;
              }

              setInputValue(String(num));
            }}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit">Color grid</button>
          <button
            onClick={() => {
              handleClear();
              setInputValue("");
            }}
            type="button"
          >
            clear all
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
