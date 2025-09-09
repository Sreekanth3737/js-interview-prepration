function cacheApiCall(ttl) {
  const cache = {};

  return async function (url) {
    const now = Date.now();

    if (cache[url] && now < cache[url].expiry) {
      console.log("Returning from cache");
      return cache[url].data;
    }

    const response = await fetch(url);
    const json = await response.json();

    cache[url] = {
      data: json,
      expiry: now + ttl,
    };

    console.log("Fetching from API");
    return json;
  };
}

const cachedFetch = cacheApiCall(5000);

cachedFetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
  console.log("First call:", res)
);

setTimeout(() => {
  cachedFetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    console.log("Second call (cached):", res)
  );
}, 1000);

setTimeout(() => {
  cachedFetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    console.log("Third call after 6s:", res)
  );
}, 6000);
