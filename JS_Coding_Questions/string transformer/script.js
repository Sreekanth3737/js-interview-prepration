class StringTransformer {
  constructor({ elements }) {
    this.elements = elements || {};
  }
  transformText(text = "") {
    const trimmedText = text.trim();
    const lowerCase = trimmedText.toLowerCase();
    const words = lowerCase.split(/\s+/).filter(Boolean);
    const camelCase = words
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
    return {
      lowerCase,
      upperCase: trimmedText.toUpperCase(),
      camelCase,
      pascalCase: camelCase.charAt(0).toUpperCase() + camelCase.slice(1),
      snakeCase: words.join("_"),
      kebabCase: words.join("-"),
      trimSpace: words.join(""),
    };
  }
  updateUI(text) {
    const transformElements = this.transformText(text);
    Object.entries(transformElements).forEach(([key, value]) => {
      const element = elements[key];
      if (element) {
        element.textContent = value || "";
        element.setAttribute("area-label", `${key}: ${value}`);
      }
    });
  }
}

const elements = {
  strInput: document.getElementById("strInput"),
  lowerCase: document.getElementById("lowerCase"),
  upperCase: document.getElementById("upperCase"),
  camelCase: document.getElementById("camelCase"),
  pascalCase: document.getElementById("pascalCase"),
  snakeCase: document.getElementById("snakeCase"),
  kebabCase: document.getElementById("kebabCase"),
  trimSpace: document.getElementById("trimSpace"),
};
let stringTransformer;

stringTransformer = new StringTransformer({ elements });
elements.strInput.addEventListener("input", () =>
  stringTransformer.updateUI(elements.strInput.value)
);
