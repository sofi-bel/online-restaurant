import Carousel from "./components/carousel/index.js";
import slides from "./components/carousel/slides.js";

import RibbonMenu from "./components/ribbon/index.js";
import categories from "./components/ribbon/categories.js";

import StepSlider from "./components/slider/index.js";
import ProductsGrid from "./components/productsGrid/index.js";

import CartIcon from "./components/cartIcon/index.js";
import Cart from "./components/cart/index.js";

import "./assets/styles/all.scss";
import "./assets/styles/common.scss";

export default class Main {
  constructor() {}

  async render() {
    this.renderCarousel();
    this.renderRibbon();
    this.renderStepSlider();
    this.renderCartIcon();

    this.cart = new Cart(this.cartIcon);

    this.products = await this.fetchProducts();

    this.renderProductsGrid();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", ({ detail: productId }) => {
      let product = this.products.find((product) => product.id == productId);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener(
      "slider-change",
      ({ detail: value }) => {
        this.productsGrid.updateFilter({
          maxSpiciness: value,
        });
      },
    );

    this.ribbonMenu.elem.addEventListener(
      "ribbon-select",
      ({ detail: categoryId }) => {
        this.productsGrid.updateFilter({
          category: categoryId,
        });
      },
    );

    document.getElementById("nuts-checkbox").onchange = (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked,
      });
    };

    document.getElementById("vegeterian-checkbox").onchange = (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked,
      });
    };
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);

    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);
  }

  renderRibbon() {
    this.ribbonMenu = new RibbonMenu(categories);

    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });

    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);
  }

  renderCartIcon() {
    let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    this.cartIcon = new CartIcon();

    cartIconHolder.append(this.cartIcon.elem);
  }

  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector("[data-products-grid-holder]").innerHTML = "";
    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);
  }

  async fetchProducts() {
    let response = await fetch("products.json");
    let products = await response.json();

    return products;
  }
}
