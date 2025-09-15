import type { CheckBoxItems } from "./CheckBoxTree";
interface CheckBoxProps {
  items: CheckBoxItems[];
  handleChange: (items: CheckBoxItems[]) => void;
}
const CheckBox = ({ items, handleChange }: CheckBoxProps) => {
  //
  const updateAllChildren = (
    node: CheckBoxItems,
    isChecked: boolean
  ): CheckBoxItems => {
    return {
      ...node,
      checked: isChecked,
      children: node.children?.map((child) =>
        updateAllChildren(child, isChecked)
      ),
    };
  };

  const getParentState = (child: CheckBoxItems[]): boolean => {
    if (!child || child.length === 0) return false;
    return child.every((item) => item.checked);
  };

  const updateNodeAndPropagate = (
    nodes: CheckBoxItems[],
    isChecked: boolean,
    targetId: string
  ): CheckBoxItems[] => {
    return nodes.map((node) => {
      if (targetId === node.id) {
        console.log(node.id);
        return updateAllChildren(node, isChecked);
      }
      if (node.children && node.children.length > 0) {
        const updateChildren = updateNodeAndPropagate(
          node.children,
          isChecked,
          targetId
        );
        const childrenChanged =
          JSON.stringify(updateChildren) !== JSON.stringify(node.children);
        if (childrenChanged) {
          const newParentState = getParentState(updateChildren);
          return {
            ...node,
            checked: newParentState,
            children: updateChildren,
          };
        }
      }
      return node;
    });
  };

  const handleCheckboxChange = (isChecked: boolean, node: CheckBoxItems) => {
    const updatedItems = updateNodeAndPropagate(items, isChecked, node.id);
    handleChange(updatedItems);
  };

  const renderCheckBox = (node: CheckBoxItems) => {
    return (
      <div key={node.id} style={{ paddingLeft: "20px", marginBottom: "5px" }}>
        <input
          type="checkbox"
          checked={!!node.checked}
          onChange={(e) => handleCheckboxChange(e.target.checked, node)}
        />
        <label style={{ marginLeft: "5px" }} htmlFor={node.id}>
          {node.label}
        </label>
        {node.children && node.children.length > 0 && (
          <div>{node.children.map(renderCheckBox)}</div>
        )}
      </div>
    );
  };
  return <div>{items.map(renderCheckBox)}</div>;
};

export default CheckBox;
