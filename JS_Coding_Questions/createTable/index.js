const initialData = [
  [1, 4],
  [2, 3],
];
const row = document.getElementById("row");
let rowIncrement = document.getElementById("rowIncrement");
let colIncrement = document.getElementById("colIncrement");
console.log(rowIncrement);

let rowcount = 0;
let colcount = 0;
rowIncrement.addEventListener("input", function (event) {
  console.log(event);
  rowcount = event.target.value;

  createTable();
});

colIncrement.addEventListener("input", function (event) {
  colcount = event.target.value;

  createTable();
});

let arr = [];

function createTable() {
  arr = [];
  if (rowcount === 0 && colcount === 0) return;
  console.log(rowcount, "rowCOunt__");
  for (let i = 0; i < rowcount; i++) {
    let k = i + 1;
    // k = 1;
    let createnewarray = [];
    let elementvalue = i;
    for (let j = 0; j < colcount; j++) {
      let caluculatevalue = 0;

      if (j % 2 !== 0) {
        // caluculatevalue = elementvalue + (rowcount - k * 2 - 1);
        caluculatevalue = elementvalue + (rowcount - i) * 2 - 1; //row count->3-1 *2-1=>3
        console.log(caluculatevalue, elementvalue, i, j, "j%2!==0");
      } else {
        // caluculatevalue = elementvalue + 1 + (k * 2 - 1);
        if (i > 0 && j !== 0) {
          caluculatevalue = elementvalue + (k * 2 - 1);
        } else {
          caluculatevalue = elementvalue + 1;
        }
        console.log(caluculatevalue, elementvalue, i, j, "else___");
      }
      elementvalue = caluculatevalue;
      createnewarray.push(caluculatevalue);
      console.log(caluculatevalue, elementvalue, i, j, "....___");
      console.log(arr, "arr___");
      console.log(createnewarray, "createNewArray__");
    }
    arr.push(createnewarray);
  }
  //  const grid = document.getElementById("grid");

  // Get current column count
  // const current = window.getComputedStyle(grid).gridTemplateColumns.split(" ").length;

  // Add a new column
  row.style.gridTemplateColumns = `repeat(${arr[0].length}, 1fr)`;

  // Optional: Add a new item in the new column
  row.innerText = "";
  arr.forEach((item, index) => {
    //   console.log(item);

    item.forEach((val) => {
      const col = document.createElement("div");
      console.log(val, "val__");

      col.innerHTML = val;
      row.appendChild(col);
    });
  });
  console.log(arr, "arrr");
}
