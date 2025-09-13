export interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  children?: CheckboxItem[];
}

export interface NestedCheckboxProps {
  items: CheckboxItem[];
  onItemChange: (items: CheckboxItem[]) => void;
  level?: number;
}
