class TransferItem {
  constructor({
    leftItemsBox,
    rightItemsBox,
    moveAllLeftBtn,
    moveAllRightBtn,
    moveSelectedLeftBtn,
    moveSelectedRightBtn,
    leftItems,
    rightItems,
  }) {
    this.leftItemsBox = leftItemsBox;
    this.rightItemsBox = rightItemsBox;
    this.moveAllLeftBtn = moveAllLeftBtn;
    this.moveAllRightBtn = moveAllRightBtn;
    this.moveSelectedLeftBtn = moveSelectedLeftBtn;
    this.moveSelectedRightBtn = moveSelectedRightBtn;
    this.leftItems = leftItems;
    this.rightItems = rightItems;
    this.showItem();
    this.setState();
  }

  showItem() {
    this.leftItems.forEach((item) =>
      this.leftItemsBox.appendChild(this.createElement(item))
    );
    this.rightItems.forEach((item) =>
      this.rightItemsBox.appendChild(this.createElement(item))
    );
  }

  createElement(item) {
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item;
    const label = document.createElement("label");
    label.textContent = item;
    label.htmlFor = item;
    div.appendChild(checkbox);
    div.appendChild(label);
    return div;
  }

  setState() {
    this.moveAllLeftBtn.disabled = !this.leftItemsBox.childElementCount;
    this.moveAllRightBtn.disabled = !this.rightItemsBox.childElementCount;
    this.moveSelectedLeftBtn.disabled =
      !this.leftItemsBox.querySelector("input:checked");
    this.moveSelectedRightBtn.disabled =
      !this.rightItemsBox.querySelector("input:checked");
  }
}

const leftItemsBox = document.getElementById("leftItemsBox");
const rightItemsBox = document.getElementById("rightItemsBox");
const moveAllRightBtn = document.getElementById("moveAllRight");
const moveSelectedRightBtn = document.getElementById("moveSelectedRight");
const moveAllLeftBtn = document.getElementById("moveAllLeft");
const moveSelectedLeftBtn = document.getElementById("moveSelectedLeft");
const leftItems = ["apple", "mango", "orange"];
const rightItems = ["carrot", "beans", "kiwi"];

new TransferItem({
  leftItemsBox,
  rightItemsBox,
  moveAllLeftBtn,
  moveAllRightBtn,
  moveSelectedLeftBtn,
  moveSelectedRightBtn,
  leftItems,
  rightItems,
});
