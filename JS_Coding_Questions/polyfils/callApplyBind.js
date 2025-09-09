const obj = {
  name: "sreekanth",
  lastName: "P S",
};
function myGreet(city, country) {
  console.log(
    `name ${this.name} lastname ${this.lastName} city ${city} country ${country}`
  );
}
//Call

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") throw new TypeError(this, "not callable");

  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

myGreet.myCall(obj, "bengaluru", "india");

// Apply
Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") throw new TypeError(this, "not callable");

  if (!Array.isArray(args)) throw new TypeError("Arguments must be an Array");
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

myGreet.myApply(obj, ["bengaluru", "india"]);

//Bind

Function.prototype.myBind = function (context = {}, ...args1) {
  if (typeof this !== "function") throw new TypeError(this, "not callable");

  const fn = this;
  return function (...args2) {
    return fn.apply(context, [...args1, ...args2]);
  };
};
const myBindFn = myGreet.myBind(obj, "bengaluru");
myBindFn("germany");

// ---

// ## **1. `call`**

// **Purpose:** Immediately invokes a function and explicitly sets `this` to a specific object. Arguments are passed **one by one**.

// ### Example:

// ```js
// myGreet.myCall(obj, "bengaluru", "india");
// ```

// * `myGreet` is the function we want to call.
// * `obj` becomes `this` inside the function.
// * `"bengaluru"` and `"india"` are passed as arguments to `myGreet`.

// **Output:**

// ```
// name sreekanth lastname P S city bengaluru country india
// ```

// **Custom Implementation:**

// ```js
// Function.prototype.myCall = function (context = {}, ...args) {
//   if (typeof this !== "function") throw new TypeError(this, "not callable");

//   context.fn = this;             // Temporarily add function as a property of context
//   const result = context.fn(...args); // Invoke it with arguments
//   delete context.fn;             // Remove temporary property
//   return result;                 // Return the function result
// };
// ```

// > Key idea: `call` **invokes immediately** and spreads arguments individually.

// ---

// ## **2. `apply`**

// **Purpose:** Almost identical to `call`, but arguments are passed as an **array** instead of individually.

// ### Example:

// ```js
// myGreet.myApply(obj, ["bengaluru", "india"]);
// ```

// * `obj` becomes `this`.
// * `["bengaluru", "india"]` is passed as arguments using the spread operator inside the implementation.

// **Output:**

// ```
// name sreekanth lastname P S city bengaluru country india
// ```

// **Custom Implementation:**

// ```js
// Function.prototype.myApply = function (context = {}, args = []) {
//   if (typeof this !== "function") throw new TypeError(this, "not callable");
//   if (!Array.isArray(args)) throw new TypeError("Arguments must be an Array");

//   context.fn = this;
//   const result = context.fn(...args); // Spread array as arguments
//   delete context.fn;
//   return result;
// };
// ```

// > Key idea: `apply` is useful when you have arguments **in an array**, e.g., `Math.max.apply(null, [1,2,3])`.

// ---

// ## **3. `bind`**

// **Purpose:** Returns a **new function** with `this` permanently set to a specific object. It does **not invoke immediately**. You can also partially pre-set some arguments.

// ### Example:

// ```js
// const myBindFn = myGreet.myBind(obj, "bengaluru");
// myBindFn("germany");
// ```

// * `myGreet` is bound to `obj`.
// * `"bengaluru"` is pre-set as the first argument.
// * `"germany"` is passed later when invoking `myBindFn`.

// **Output:**

// ```
// name sreekanth lastname P S city bengaluru country germany
// ```

// **Custom Implementation:**

// ```js
// Function.prototype.myBind = function (context = {}, ...args1) {
//   if (typeof this !== "function") throw new TypeError(this, "not callable");

//   const fn = this;
//   return function (...args2) {
//     return fn.apply(context, [...args1, ...args2]); // Merge pre-set args with new args
//   };
// };
// ```

// > Key idea: `bind` **returns a new function**, allowing you to call it later with optional additional arguments.

// ---

// ### ✅ **Summary Table**

// | Method  | Invokes Function? | `this`   | Arguments                                            |
// | ------- | ----------------- | -------- | ---------------------------------------------------- |
// | `call`  | Yes               | Explicit | Passed one by one                                    |
// | `apply` | Yes               | Explicit | Passed as array                                      |
// | `bind`  | No                | Explicit | Returns new function, can partially preset arguments |

// ---

// If you want, I can also **draw a simple diagram** showing **how call, apply, and bind link `this`** visually—it makes it super easy to remember.

// Do you want me to do that?
