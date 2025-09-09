// Enterprise-level eCommerce Application
class ECommerceApp {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.cart = this.loadCart();
    this.filters = {
      search: "",
      categories: [],
      brands: [],
      priceMin: null,
      priceMax: null,
      inStockOnly: true,
      onSale: false,
    };
    this.sortBy = "relevance";
    this.currentPage = 1;
    this.productsPerPage = 24;
    this.isLoading = false;

    this.init();
  }

  async init() {
    this.showLoading();
    await this.loadProducts();
    this.setupEventListeners();
    this.renderProducts();
    this.updateCartUI();
    this.hideLoading();
  }

  // Simulate API call to load products
  async loadProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.products = this.generateMockProducts();
        this.filteredProducts = [...this.products];
        resolve();
      }, 1000);
    });
  }

  generateMockProducts() {
    const categories = ["electrical", "tools", "safety", "lighting"];
    const brands = ["Milwaukee", "DeWalt", "3M", "Fluke", "Hubbell", "Eaton"];
    const productTypes = {
      electrical: [
        "Circuit Breaker",
        "Electrical Box",
        "Wire Connector",
        "Outlet",
        "Switch",
      ],
      tools: ["Drill", "Saw", "Multimeter", "Wire Stripper", "Pliers"],
      safety: [
        "Hard Hat",
        "Safety Glasses",
        "Work Gloves",
        "High-Vis Vest",
        "Ear Protection",
      ],
      lighting: [
        "LED Fixture",
        "Work Light",
        "Emergency Light",
        "Flood Light",
        "Panel Light",
      ],
    };
    const icons = {
      electrical: "⚡",
      tools: "🔧",
      safety: "🦺",
      lighting: "💡",
    };

    const products = [];
    let id = 1;

    categories.forEach((category) => {
      productTypes[category].forEach((type) => {
        brands.forEach((brand) => {
          const basePrice = Math.random() * 500 + 20;
          const isOnSale = Math.random() < 0.3;
          const discount = isOnSale ? Math.random() * 0.4 + 0.1 : 0;
          const rating = Math.random() * 2 + 3; // 3-5 stars
          const reviewCount = Math.floor(Math.random() * 200) + 5;
          const stock = Math.floor(Math.random() * 100);

          products.push({
            id: id++,
            name: `${brand} ${type} - Professional Grade`,
            brand: brand,
            category: category,
            sku: `WES-${category.substr(0, 3).toUpperCase()}-${String(
              id
            ).padStart(4, "0")}`,
            price: parseFloat(basePrice.toFixed(2)),
            originalPrice: isOnSale
              ? parseFloat((basePrice / (1 - discount)).toFixed(2))
              : null,
            discount: isOnSale ? Math.round(discount * 100) : null,
            rating: parseFloat(rating.toFixed(1)),
            reviewCount: reviewCount,
            stock: stock,
            image: icons[category],
            isNew: Math.random() < 0.1,
            isFeatured: Math.random() < 0.15,
            description: `Professional-grade ${type.toLowerCase()} designed for industrial applications. Built to withstand demanding work environments.`,
            specifications: {
              weight: `${(Math.random() * 10 + 0.5).toFixed(1)} lbs`,
              dimensions: `${Math.floor(
                Math.random() * 12 + 6
              )}" x ${Math.floor(Math.random() * 8 + 4)}" x ${Math.floor(
                Math.random() * 6 + 2
              )}"`,
              warranty: Math.random() < 0.5 ? "1 Year" : "2 Years",
            },
          });
        });
      });
    });

    return products.slice(0, 100); // Limit to 100 products for demo
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("searchInput");
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.filters.search = e.target.value;
        this.applyFilters();
      }, 300); // Debounce search
    });

    // Category filters
    document.querySelectorAll('input[id^="cat-"]').forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.filters.categories.push(e.target.value);
        } else {
          this.filters.categories = this.filters.categories.filter(
            (c) => c !== e.target.value
          );
        }
        this.applyFilters();
      });
    });

    // Brand filters
    document.querySelectorAll('input[id^="brand-"]').forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.filters.brands.push(e.target.value);
        } else {
          this.filters.brands = this.filters.brands.filter(
            (b) => b !== e.target.value
          );
        }
        this.applyFilters();
      });
    });

    // Price range filters
    const priceMin = document.getElementById("priceMin");
    const priceMax = document.getElementById("priceMax");
    let priceTimeout;

    [priceMin, priceMax].forEach((input) => {
      input.addEventListener("input", () => {
        clearTimeout(priceTimeout);
        priceTimeout = setTimeout(() => {
          this.filters.priceMin = priceMin.value
            ? parseFloat(priceMin.value)
            : null;
          this.filters.priceMax = priceMax.value
            ? parseFloat(priceMax.value)
            : null;
          this.applyFilters();
        }, 500);
      });
    });

    // Availability filters
    document.getElementById("in-stock").addEventListener("change", (e) => {
      this.filters.inStockOnly = e.target.checked;
      this.applyFilters();
    });

    document.getElementById("on-sale").addEventListener("change", (e) => {
      this.filters.onSale = e.target.checked;
      this.applyFilters();
    });

    // Sort functionality
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      this.sortBy = e.target.value;
      this.applySorting();
    });

    // Cart functionality
    document.getElementById("cartTrigger").addEventListener("click", () => {
      this.openCart();
    });

    document.getElementById("cartClose").addEventListener("click", () => {
      this.closeCart();
    });

    document.getElementById("cartOverlay").addEventListener("click", () => {
      this.closeCart();
    });

    document.getElementById("checkoutBtn").addEventListener("click", () => {
      this.proceedToCheckout();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeCart();
      }
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      // Search filter
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        const searchableText =
          `${product.name} ${product.brand} ${product.category} ${product.sku}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }

      // Category filter
      if (this.filters.categories.length > 0) {
        if (!this.filters.categories.includes(product.category)) return false;
      }

      // Brand filter
      if (this.filters.brands.length > 0) {
        if (!this.filters.brands.includes(product.brand.toLowerCase()))
          return false;
      }

      // Price range filter
      if (
        this.filters.priceMin !== null &&
        product.price < this.filters.priceMin
      )
        return false;
      if (
        this.filters.priceMax !== null &&
        product.price > this.filters.priceMax
      )
        return false;

      // Stock filter
      if (this.filters.inStockOnly && product.stock === 0) return false;

      // Sale filter
      if (this.filters.onSale && !product.discount) return false;

      return true;
    });

    this.applySorting();
  }

  applySorting() {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew - a.isNew;
        default:
          return b.isFeatured - a.isFeatured || b.rating - a.rating;
      }
    });

    this.renderProducts();
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid");
    const resultsInfo = document.getElementById("resultsInfo");

    if (this.filteredProducts.length === 0) {
      grid.innerHTML = `
                        <div class="error-state" style="grid-column: 1 / -1;">
                            <div class="error-state-icon">🔍</div>
                            <div class="error-state-title">No products found</div>
                            <div class="error-state-message">Try adjusting your filters or search terms</div>
                        </div>
                    `;
      resultsInfo.innerHTML = "No products found";
      return;
    }

    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = Math.min(
      startIndex + this.productsPerPage,
      this.filteredProducts.length
    );
    const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

    resultsInfo.innerHTML = `
                    Showing <strong>${
                      startIndex + 1
                    }-${endIndex}</strong> of <strong>${
      this.filteredProducts.length
    }</strong> products
                `;

    grid.innerHTML = productsToShow
      .map((product) => this.renderProductCard(product))
      .join("");
  }

  renderProductCard(product) {
    const stockStatus =
      product.stock === 0
        ? "out-of-stock"
        : product.stock < 10
        ? "low-stock"
        : "in-stock";
    const stockText =
      product.stock === 0
        ? "Out of Stock"
        : product.stock < 10
        ? `Only ${product.stock} left`
        : "In Stock";
    const stars =
      "★".repeat(Math.floor(product.rating)) +
      "☆".repeat(5 - Math.floor(product.rating));

    return `
                    <article class="product-card" data-product-id="${
                      product.id
                    }">
                        <div class="product-image-container">
                            <div class="product-image">${product.image}</div>
                            ${
                              product.isNew
                                ? '<span class="product-badge new">NEW</span>'
                                : ""
                            }
                            ${
                              product.discount
                                ? `<span class="product-badge sale">${product.discount}% OFF</span>`
                                : ""
                            }
                        </div>
                        
                        <div class="product-info">
                            <div class="product-brand">${product.brand}</div>
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-sku">SKU: ${product.sku}</div>
                            
                            <div class="product-rating">
                                <span class="stars">${stars}</span>
                                <span class="rating-text">(${
                                  product.reviewCount
                                } reviews)</span>
                            </div>
                            
                            <div class="product-price">
                                <span class="current-price">${product.price.toFixed(
                                  2
                                )}</span>
                                ${
                                  product.originalPrice
                                    ? `<span class="original-price">${product.originalPrice.toFixed(
                                        2
                                      )}</span>`
                                    : ""
                                }
                                ${
                                  product.discount
                                    ? `<span class="discount-badge">${product.discount}% OFF</span>`
                                    : ""
                                }
                            </div>
                            
                            <div class="product-stock ${stockStatus}">${stockText}</div>
                            
                            <div class="product-actions">
                                <button 
                                    class="btn-primary add-to-cart" 
                                    onclick="app.addToCart(${product.id})"
                                    ${product.stock === 0 ? "disabled" : ""}
                                    aria-label="Add ${product.name} to cart"
                                >
                                    ${
                                      product.stock === 0
                                        ? "Out of Stock"
                                        : "Add to Cart"
                                    }
                                </button>
                                <button 
                                    class="btn-secondary" 
                                    onclick="app.toggleWishlist(${product.id})"
                                    aria-label="Add to wishlist"
                                >
                                    ♡
                                </button>
                            </div>
                        </div>
                    </article>
                `;
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product || product.stock === 0) {
      this.showToast("Product is out of stock", "error");
      return;
    }

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        this.showToast(
          "Cannot add more items than available in stock",
          "warning"
        );
        return;
      }
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
        addedAt: Date.now(),
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showToast(`${product.name} added to cart`, "success");

    // Update button temporarily
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.style.background = "var(--success)";
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
    }, 1500);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
    this.showToast("Item removed from cart", "success");
  }

  updateQuantity(productId, newQuantity) {
    const cartItem = this.cart.find((item) => item.id === productId);
    const product = this.products.find((p) => p.id === productId);

    if (!cartItem || !product) return;

    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    if (newQuantity > product.stock) {
      this.showToast("Cannot exceed available stock", "warning");
      return;
    }

    cartItem.quantity = newQuantity;
    this.saveCart();
    this.updateCartUI();
  }

  updateCartUI() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById("cartBadge");
    const cartContent = document.getElementById("cartContent");
    const cartFooter = document.getElementById("cartFooter");

    // Update cart badge
    if (totalItems > 0) {
      cartBadge.textContent = totalItems > 99 ? "99+" : totalItems;
      cartBadge.classList.remove("hidden");
    } else {
      cartBadge.classList.add("hidden");
    }

    // Update cart content
    if (this.cart.length === 0) {
      cartContent.innerHTML = `
                        <div class="error-state">
                            <div class="error-state-icon">🛒</div>
                            <div class="error-state-title">Your cart is empty</div>
                            <div class="error-state-message">Add some products to get started</div>
                        </div>
                    `;
      cartFooter.classList.add("hidden");
    } else {
      cartContent.innerHTML = this.cart
        .map((item) => this.renderCartItem(item))
        .join("");
      cartFooter.classList.remove("hidden");
      this.updateCartTotals();
    }
  }

  renderCartItem(item) {
    return `
                    <div class="cart-item">
                        <div class="cart-item-image">${item.image}</div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-sku">${item.sku}</div>
                            <div class="cart-item-price">${item.price.toFixed(
                              2
                            )} each</div>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="qty-btn" onclick="app.updateQuantity(${
                                  item.id
                                }, ${
      item.quantity - 1
    })" aria-label="Decrease quantity">-</button>
                                <span class="qty-display">${
                                  item.quantity
                                }</span>
                                <button class="qty-btn" onclick="app.updateQuantity(${
                                  item.id
                                }, ${
      item.quantity + 1
    })" aria-label="Increase quantity">+</button>
                            </div>
                            <button class="remove-item" onclick="app.removeFromCart(${
                              item.id
                            })" aria-label="Remove item">Remove</button>
                        </div>
                    </div>
                `;
  }

  updateCartTotals() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const taxRate = 0.0825; // 8.25%
    const tax = subtotal * taxRate;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `${tax.toFixed(2)}`;
    document.getElementById("shipping").textContent =
      shipping === 0 ? "Free" : `${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `${total.toFixed(2)}`;
  }

  openCart() {
    document.getElementById("cartOverlay").classList.add("open");
    document.getElementById("cartSidebar").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  closeCart() {
    document.getElementById("cartOverlay").classList.remove("open");
    document.getElementById("cartSidebar").classList.remove("open");
    document.body.style.overflow = "";
  }

  proceedToCheckout() {
    this.showToast("Redirecting to checkout...", "success");
    // In a real app, this would navigate to checkout page
    setTimeout(() => {
      this.showToast(
        "Checkout functionality would be implemented here",
        "info"
      );
    }, 1500);
  }

  toggleWishlist(productId) {
    // Wishlist functionality placeholder
    this.showToast("Wishlist functionality coming soon!", "info");
  }

  showToast(message, type = "success") {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
    };

    toast.innerHTML = `
                    <span class="toast-icon">${icons[type]}</span>
                    <span class="toast-message">${message}</span>
                    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
                `;

    toastContainer.appendChild(toast);

    // Show toast with animation
    setTimeout(() => toast.classList.add("show"), 10);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  showLoading() {
    document.getElementById("loadingOverlay").style.display = "flex";
    this.isLoading = true;
  }

  hideLoading() {
    document.getElementById("loadingOverlay").style.display = "none";
    this.isLoading = false;
  }

  saveCart() {
    try {
      // In a real app, this would save to server/localStorage
      // For demo, we'll just keep it in memory
      console.log("Cart saved:", this.cart);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }

  loadCart() {
    try {
      // In a real app, this would load from server/localStorage
      return [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  }

  // Analytics and tracking
  trackEvent(eventName, properties = {}) {
    // In a real app, this would send to analytics service
    console.log("Analytics Event:", eventName, properties);
  }

  // Error handling
  handleError(error, context = "") {
    console.error(`Error in ${context}:`, error);
    this.showToast("Something went wrong. Please try again.", "error");
  }
}

// Initialize the application
const app = new ECommerceApp();

// Expose app instance for debugging
window.app = app;

// Service Worker registration (for real PWA functionality)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.log("ServiceWorker registration failed:", error);
  });
}
