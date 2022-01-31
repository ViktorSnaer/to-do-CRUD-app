import React from "react";
import styles from "./CustomCheckbox.module.css";

interface CheckboxProps {
  onClick: () => void;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ onClick }) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type={"checkbox"}
        onClick={onClick}
      ></input>
      <span className={styles.checkbox__box}></span>
    </label>
  );
};

export default CustomCheckbox;
