import React, { useState } from "react";
import NestedCheckbox from "./components/NestedCheckBox";
import type { CheckboxItem } from "./utils/types";
import styles from "./App.module.scss";
import { DATA } from "./utils/data";

const Nested: React.FC = () => {
  const [checkboxData, setCheckboxData] = useState<CheckboxItem[]>(DATA);

  const getSelectedItems = (items: CheckboxItem[]): string[] => {
    const selected: string[] = [];
    items.forEach((item) => {
      if (item.checked && !item.indeterminate) {
        selected.push(item.label);
      }
      if (item.children) {
        selected.push(...getSelectedItems(item.children));
      }
    });
    return selected;
  };

  const selectedItems = getSelectedItems(checkboxData);

  return (
    <div style={{ marginTop: "50px" }} className={styles.appContainer}>
      <h1 className={styles.appTitle}>Technology Skills</h1>

      <NestedCheckbox items={checkboxData} onItemChange={setCheckboxData} />

      <div className={styles.selectedSection}>
        <h2 className={styles.selectedTitle}>Selected Items:</h2>
        {selectedItems.length > 0 ? (
          <div className={styles.selectedTags}>
            {selectedItems.map((item, index) => (
              <span key={index} className={styles.selectedTag}>
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.noSelection}>No items selected</p>
        )}
      </div>
    </div>
  );
};

export default Nested;
