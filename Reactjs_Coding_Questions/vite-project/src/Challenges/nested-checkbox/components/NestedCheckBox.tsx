import React, { useCallback } from "react";
import type { CheckboxItem, NestedCheckboxProps } from "../utils/types";
import styles from "../App.module.scss";

const NestedCheckbox: React.FC<NestedCheckboxProps> = ({
  items,
  onItemChange,
  level = 0,
}) => {
  const updateItemById = useCallback(
    (
      items: CheckboxItem[],
      id: string,
      updates: Partial<CheckboxItem>
    ): CheckboxItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        if (item.children) {
          return {
            ...item,
            children: updateItemById(item.children, id, updates),
          };
        }
        return item;
      });
    },
    []
  );

  const updateChildrenState = useCallback(
    (item: CheckboxItem, checked: boolean): CheckboxItem => {
      const updatedItem = { ...item, checked, indeterminate: false };
      if (item.children) {
        updatedItem.children = item.children.map((child) =>
          updateChildrenState(child, checked)
        );
      }
      return updatedItem;
    },
    []
  );

  const calculateParentState = useCallback(
    (
      children: CheckboxItem[]
    ): { checked: boolean; indeterminate: boolean } => {
      const checkedChildren = children.filter(
        (child) => child.checked && !child.indeterminate
      );
      const indeterminateChildren = children.filter(
        (child) => child.indeterminate
      );

      if (checkedChildren.length === children.length) {
        return { checked: true, indeterminate: false };
      }
      if (checkedChildren.length > 0 || indeterminateChildren.length > 0) {
        return { checked: false, indeterminate: true };
      }
      return { checked: false, indeterminate: false };
    },
    []
  );

  const updateParentStates = useCallback(
    (items: CheckboxItem[]): CheckboxItem[] => {
      return items.map((item) => {
        if (item.children) {
          const updatedChildren = updateParentStates(item.children);
          const parentState = calculateParentState(updatedChildren);
          return {
            ...item,
            children: updatedChildren,
            checked: parentState.checked,
            indeterminate: parentState.indeterminate,
          };
        }
        return item;
      });
    },
    [calculateParentState]
  );

  const handleCheckboxChange = useCallback(
    (id: string, checked: boolean) => {
      let updatedItems = [...items];

      const findAndUpdateItem = (items: CheckboxItem[]): CheckboxItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return updateChildrenState(item, checked);
          }
          if (item.children) {
            return {
              ...item,
              children: findAndUpdateItem(item.children),
            };
          }
          return item;
        });
      };

      updatedItems = findAndUpdateItem(updatedItems);
      updatedItems = updateParentStates(updatedItems);

      onItemChange(updatedItems);
    },
    [items, onItemChange, updateChildrenState, updateParentStates]
  );

  const renderCheckboxItem = (item: CheckboxItem) => (
    <div key={item.id}>
      <div
        className={styles.checkboxItem}
        style={{ marginLeft: `${level * 16}px` }}
      >
        <input
          type="checkbox"
          id={item.id}
          checked={item.checked}
          ref={(input) => {
            if (input) input.indeterminate = item.indeterminate || false;
          }}
          onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
          className={styles.checkboxInput}
        />
        <label
          htmlFor={item.id}
          className={`${styles.checkboxLabel} ${
            item.checked ? styles.checked : ""
          } ${item.indeterminate ? styles.indeterminate : ""}`}
        >
          {item.label}
        </label>
      </div>
      {item.children && item.children.length > 0 && (
        <div className={styles.checkboxChildren}>
          <NestedCheckbox
            items={item.children}
            onItemChange={(updatedChildren) => {
              const updatedItems = updateItemById(items, item.id, {
                children: updatedChildren,
              });
              const finalItems = updateParentStates(updatedItems);
              onItemChange(finalItems);
            }}
            level={level + 1}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.checkboxContainer}>
      {items.map(renderCheckboxItem)}
    </div>
  );
};

export default NestedCheckbox;
