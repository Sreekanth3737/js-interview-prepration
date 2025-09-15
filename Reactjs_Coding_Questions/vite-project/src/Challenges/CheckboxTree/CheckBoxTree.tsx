import { useState } from "react";
import { DATA } from "./Data";
import CheckBox from "./CheckBox";

export interface CheckBoxItems {
  id: string;
  label: string;
  checked: boolean;
  children?: CheckBoxItems[];
}

const CheckBoxTree = () => {
  const [checkboxData, setCheckboxData] = useState<CheckBoxItems[]>(DATA);

  return (
    <div>
      <CheckBox items={checkboxData} handleChange={setCheckboxData} />
    </div>
  );
};

export default CheckBoxTree;
