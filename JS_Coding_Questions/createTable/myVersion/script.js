class ColumnTable {
  constructor() {
    this.onInput();
  }
  updateValues() {
    this.row = parseInt(document.getElementById("rowInput").value);
    this.col = parseInt(document.getElementById("colInput").value);
    document.getElementById("rowValue").textContent = this.row;
    document.getElementById("colValue").textContent = this.col;
    this.tableContainer = document.getElementById("tableContainer");
    this.grid = Array.from({ length: this.row }, () =>
      Array.from({ length: this.col }, () => 0)
    );
  }
  onInput() {
    this.updateValues();
    let num = 1;
    for (let c = 0; c < this.col; c++) {
      if (c % 2 === 0) {
        for (let r = 0; r < this.row; r++) {
          this.grid[r][c] = num++;
        }
      } else {
        for (let r = this.row - 1; r >= 0; r--) {
          this.grid[r][c] = num++;
        }
      }
    }
    this.renderTable();
  }
  renderTable() {
    const table = document.createElement("table");

    for (let r = 0; r < this.row; r++) {
      const tr = document.createElement("tr");
      for (let c = 0; c < this.col; c++) {
        const td = document.createElement("td");
        td.innerText = this.grid[r][c];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    this.tableContainer.innerHTML = "";
    this.tableContainer.appendChild(table);
  }
}
let columnTableInstance;
this.addEventListener("DOMContentLoaded", () => {
  columnTableInstance = new ColumnTable();
});

function onInput() {
  columnTableInstance.onInput();
}
