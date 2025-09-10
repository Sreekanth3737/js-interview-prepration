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
    this.addEvents();
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
    div.className = "list-div";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item;
    const label = document.createElement("label");
    label.textContent = item;
    label.htmlFor = item;
    div.appendChild(checkbox);
    div.appendChild(label);
    checkbox.addEventListener("change", () => this.setState());

    return div;
  }

  setState() {
    this.moveAllLeftBtn.disabled = !this.rightItemsBox.childElementCount;
    this.moveAllRightBtn.disabled = !this.leftItemsBox.childElementCount;
    this.moveSelectedLeftBtn.disabled =
      !this.rightItemsBox.querySelector("input:checked");
    this.moveSelectedRightBtn.disabled =
      !this.leftItemsBox.querySelector("input:checked");
  }
  moveAllItemsRight() {
    const items = this.leftItemsBox.querySelectorAll("div");
    items.forEach((item) => {
      const divItem = item;
      this.rightItemsBox.appendChild(divItem);
    });
  }
  moveAllItemsLeft() {
    const items = this.rightItemsBox.querySelectorAll("div");
    items.forEach((item) => {
      const divItem = item;
      this.leftItemsBox.appendChild(divItem);
    });
  }
  moveSelectedItemsRight() {
    const items = this.leftItemsBox.querySelectorAll("input:checked");
    items.forEach((item) => {
      item.checked = false;
      const divItem = item.parentElement;
      this.rightItemsBox.appendChild(divItem);
    });
  }
  moveSelectedItemsLeft() {
    const items = this.rightItemsBox.querySelectorAll("input:checked");
    items.forEach((item) => {
      item.checked = false;
      const divItem = item.parentElement;
      this.leftItemsBox.appendChild(divItem);
    });
  }
  addEvents() {
    this.leftItemsBox.addEventListener("click", () => this.setState());
    this.rightItemsBox.addEventListener("click", () => this.setState());

    this.moveAllLeftBtn.addEventListener("click", () => {
      this.moveAllItemsLeft();
      this.setState();
    });
    this.moveAllRightBtn.addEventListener("click", () => {
      this.moveAllItemsRight();
      this.setState();
    });
    this.moveSelectedLeftBtn.addEventListener("click", () => {
      this.moveSelectedItemsLeft();
      this.setState();
    });
    this.moveSelectedRightBtn.addEventListener("click", () => {
      this.moveSelectedItemsRight();
      this.setState();
    });
  }
}

const leftItemsBox = document.getElementById("leftItemsBox");
const rightItemsBox = document.getElementById("rightItemsBox");
const moveAllRightBtn = document.getElementById("moveAllRight");
const moveSelectedRightBtn = document.getElementById("moveSelectedRight");
const moveAllLeftBtn = document.getElementById("moveAllLeft");
const moveSelectedLeftBtn = document.getElementById("moveSelectedLeft");
const leftItems = ["apple", "mango", "orange", "react", "redux", "nodejs"];
const rightItems = [
  "carrot",
  "beans",
  "kiwi",
  "java",
  "python",
  "aws",
  "Google cloud",
];

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
