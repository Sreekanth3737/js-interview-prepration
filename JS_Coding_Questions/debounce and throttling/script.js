// Debouncing and throttling in javascript
// create a input field and a sugestion box which will show suggestions
// based on the input. The suggestions will be fetched from an mock API.

const inputField = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");
suggestionBox.style.display = "none";
const suggestions = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "mango",
  "peach",
  "pear",
  "pineapple",
  "strawberry",
  "cabbage",
  "carrot",
  "celery",
  "cucumber",
  "eggplant",
  "lettuce",
  "onion",
  "pepper",
  "potato",
  "tomato",
];

const fetchItemsAPI = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredArr = suggestions.filter((item) => {
        return item.toLowerCase().includes(query.toLowerCase());
      });
      if (filteredArr.length > 0) {
        resolve(filteredArr);
      } else {
        reject("No suggestions found");
      }
    }, 500);
  });
};

const debounce = (fn, delay, options = { leading: true, trailing: true }) => {
  let timerId = null;
  let invoked = false;
  let lastArgs = null;
  return function (...args) {
    lastArgs = args;
    const callNow = !timerId && options.leading;
    if (callNow) {
      fn(...args);
      invoked = true;
    }
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      if (options.trailing && (!options.leading || invoked)) {
        fn(...lastArgs);
      }
      invoked = false;
    }, delay);
  };
};

const handleSearch = async (event) => {
  const query = event.target.value;
  if (!query) {
    suggestionBox.innerHTML = "";
    suggestionBox.style.display = "none";
    return;
  }
  try {
    const data = await fetchItemsAPI(query);
    suggestionBox.innerHTML = data.map((item) => `<div>${item}</div>`).join("");
    suggestionBox.style.display = "block";
  } catch (error) {
    suggestionBox.innerHTML = `<div>${error}</div>`;
  }
};
const debounceSearch = debounce(handleSearch, 1000);
inputField.addEventListener("input", debounceSearch);

//throttling
const throttle = (fn, delay) => {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
};

// function handleSearch1(query) {
//   console.log("Hello", query + Date.now().toLocaleString());
// }

// const customDebounce = (fn, delay) => {
//   let timerId = null;
//   return function (...args) {
//     if (timerId) clearTimeout(timerId);
//     timerId = setTimeout(() => {
//       timerId = null;
//       fn(...args);
//     }, delay);
//   };
// };

// const debouncedSearch1 = customDebounce(handleSearch, 2000);
// debouncedSearch1("Alice");
// debounceSearch1("Alice bob");
// debouncedSearch1("Alice bob cat");
