class InfiniteScrolling {
  constructor(elements) {
    this.elements = elements;
    this.posts = [];

    this.startIndex = 0;
    this.batchSize = 10;
    this.endIndex = this.getEndIndex(this.startIndex);
    this.isFetching = false;
    this.isError = false;
    this.isEndOfContent = false;
    this.attempt = 0;
    this.MAX_TRIES = 3;
    this.getPosts();

    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100
    ) {
      this.getPosts();
    }
  }

  async getPosts() {
    if (this.isFetching || this.isEndOfContent) return;

    try {
      const url = `https://jsonplaceholder.typicode.com/posts?_start=${this.startIndex}&_end=${this.endIndex}`;
      this.isFetching = true;
      this.showError("none");
      this.showLoading("block");
      const response = await fetch(url);
      const newPosts = await response.json();

      if (newPosts.length < this.batchSize) {
        this.isEndOfContent = true;
        this.showLoading("none");
        this.showEndOfContent();
        return;
      }

      this.posts = [...this.posts, ...newPosts];
      this.renderPosts(newPosts);

      this.startIndex = this.endIndex;
      this.endIndex = this.getEndIndex(this.startIndex);

      this.isError = false;
      this.attempt = 0;
    } catch (error) {
      this.isError = true;
      this.showError("block");
    } finally {
      this.isFetching = false;
      this.showLoading("none");
    }
  }
  getEndIndex(startIndex) {
    const postHeight = 90;
    const newPostCount = Math.ceil(window.innerHeight / postHeight);
    console.log(newPostCount);
    return startIndex + newPostCount;
  }
  renderPosts(newPosts) {
    console.log(this.posts);
    newPosts.forEach((item, index) => {
      const post = this.createPost(item);
      console.log(item);
      this.elements.postContainer.appendChild(post);
    });
  }
  showEndOfContent() {
    this.elements.endOfPosts.style.display = "block";
  }
  showLoading(loadingStatus) {
    this.elements.loader.style.display = loadingStatus;
  }
  showError(display) {
    this.elements.error.style.display = display;
  }
  createPost(item) {
    const div = document.createElement("div");
    const h5 = document.createElement("h5");
    h5.innerText = item.title;
    const postItemContainer = document.createElement("div");
    postItemContainer.className = "post-item-container";
    const span = document.createElement("span");
    const p = document.createElement("p");
    span.textContent = item.id;
    p.innerText = item.body;
    div.appendChild(h5);
    postItemContainer.appendChild(span);
    postItemContainer.appendChild(p);
    div.appendChild(postItemContainer);
    return div;
  }
}
const elements = {
  postContainer: document.getElementById("postContainer"),
  loader: document.querySelector(".loader"),
  endOfPosts: document.querySelector(".end-of-posts"),
  error: document.querySelector(".error"),
};
new InfiniteScrolling(elements);
