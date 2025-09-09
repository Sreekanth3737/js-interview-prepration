// import data from "./data.json" assert { type: "json" };

class ShoppingCart {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.cart = [];

    this.loadProducts();
    this.initializeElements();
    this.renderProducts();
    this.bindEvents();
  }
  // load products json
  async loadProducts() {
    try {
      const response = await fetch("./data.json");
      this.products = await response.json();
      this.filteredProducts = [...this.products];
      this.renderProducts();
    } catch (error) {
      console.log(error);
    }
  }

  initializeElements() {
    this.searchBox = document.getElementById("searchBox");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.minPrice = document.getElementById("minPrice");
    this.maxPrice = document.getElementById("maxPrice");
    this.sortBy = document.getElementById("sortBy");
    this.productsGrid = document.getElementById("productsGrid");
    this.cartOverLay = document.getElementById("cartOverLay");
    this.cartModal = document.getElementById("cartModal");
    this.cartItems = document.getElementById("cartItems");
    this.cartCount = document.getElementById("cartCount");
    this.cartSummary = document.getElementById("cartSummary");
    this.subTotal = document.getElementById("subTotal");
    this.tax = document.getElementById("tax");
    this.total = document.getElementById("total");
    this.checkoutBtn = document.getElementById("checkoutBtn");
    this.loading = document.getElementById("loading");
  }

  bindEvents() {
    this.productsGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("product-card__add-button")) {
        const id = e.target.dataset.id;
        const product = this.products.find((p) => p.id == id);
        this.addToCart(product);
      }
    });
  }

  renderProducts() {
    this.loading.style.display = "none";
    if (this.filteredProducts.length === 0) {
      this.productsGrid.innerHTML =
        '<div class="empty-state">No products found</div>';
      return;
    }
    this.productsGrid.innerHTML = this.filteredProducts
      .map(
        (product) => `
        <div class="product-card">
         <div class="product-card__image">
            <img src=${product.image} alt=${product.name}/>
         </div>
            <div class="product-card-info">
                <h3 class="product-card__name">${product.name}</h3>
                <p class="product-card__category">${product.category}</p>
                <div class="product-card__rating">
                    <span class="product-card__stars">${this.generateStars(
                      product.rating
                    )}</span>
                    <span>(${product.rating})</span>
                </div>
                <div class="product-card__price">
                $${product.price.toFixed(2)}
                </div>
                <button class="product-card__add-button" data-id="${
                  product.id
                }">Add to cart</button>
            </div>
        </div>
    `
      )
      .join("");
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    let starsHTML = "";
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
    }
    if (halfStar) {
      starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="fa-regular fa-star"></i>';
    }

    return starsHTML;
  }
  addToCart(product) {
    if (!product) return;
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      });
    }
  }
  removeCart() {}
}
document.addEventListener("DOMContentLoaded", () => {
  new ShoppingCart();
});
