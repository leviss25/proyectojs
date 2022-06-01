'use strict';
// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }
// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);
// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');
// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});
// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }
  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });
  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);
}
// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');
for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
    const clickedBtn = this.nextElementSibling.classList.contains('active');
    for (let i = 0; i < accordion.length; i++) {
      if (clickedBtn) break;
      if (accordion[i].classList.contains('active')) {
        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');
      }
    }
    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');
  });
}
/* class products for items productos */
class product{
  constructor(id,nameProduct,discount,category,type,description,stars,price,startingPrice,currency){
    this.id=id;
    this.nameProduct=nameProduct;
    this.discount=discount;
    this.category=category;
    this.type=type;
    this.description=description;
    this.stars=stars;
    this.price=price;
    this.startingPrice=startingPrice;
    this.currency=currency;
  }
}
// objects of products
//                          id,nameProduct,discount,category,type,description,        stars,price,startingPrice,currency
const product1 = new product(1,"Jackets","15%","jacket","jacket-3","Mens Winter Leathers Jackets",3,48.00,75.00,"$");
const product2 = new product(2,"Shirt","sale","shirt","shirt-1","Pure Garment Dyed Cotton Shirt",3,45.00,56.00,"$");
const product3 = new product(3,"Jacket","","jacket","jacket-5","MEN Yarn Fleece Full-Zip Jacket",3,58.00,65.00,"$");
const product4 = new product(4,"Skirt","new","skirt","clothes-3","Black Floral Wrap Midi Skirt",5,25.00,35.00,"$");
const product5 = new product(5,"Shoes","","casual","shoe-2","Casual Men's Brown shoes",5,99.00,105.00,"$");
const product6 = new product(6,"Watch","sale","watches","watch-3","Pocket Watch Leather Pouch",3,150.00,170.00,"$");
const product7 = new product(7,"Watch","","watches","watch-1","Smart watche Vital Plus",4,100.00,120.00,"$");
const product8 = new product(8,"Shoes","sale","party wear","party-wear-1","Womens Party Wear Shoes",3,25.00,30.00,"$");
const product9 = new product(9,"Jacket","","jacket","jacket-1","Mens Winter Leathers Jackets",4,32.00,45.00,"$");
const product10 = new product(10,"Shoes","sale","sports","sports-2","Trekking & Running Shoes - black",3,58.00,64.00,"$");
const product11 = new product(11,"shoes","","formal","shoe-1","Men's Leather Formal Wear shoes",4,50.00,65.00,"$");
const product12 = new product(12,"Sweatshorts","sale","shorts","shorts-1","Better Basics French Terry Sweatshorts",3,78.00,85.00,"$");
let arrayProducts = [product1,product2,product3,product4,product5,product6,product7,product8,product9,product10,product11,product12];
let arrayCart = [];
//to update the cart with the localStorage information, we create cart in the localStorage if there isn't information
if (localStorage.getItem('cart')) {
  arrayCart = JSON.parse(localStorage.getItem('cart'));
} else {
  localStorage.setItem('cart',JSON.stringify(arrayCart));
}
let gridProduct = document.querySelector("#gridproducts");
// to go through the arrayProducts and create a card for each product
arrayProducts.forEach(prod => {
  //we count the number of stars of each product....
  let htmlStars="";
  for (let i = 1; i <= 5; i++) {
    if (i<=prod.stars) {
      htmlStars += `<ion-icon name="star"></ion-icon>`;
    }
    else{
      htmlStars += `<ion-icon name="star-outline"></ion-icon>`;
    }
  }
  //....
  gridProduct.innerHTML+=`
    <div class="showcase" id="product${prod.id}">
      <div class="showcase-banner">
        <img src="./assets/images/products/${prod.type}.jpg" alt="${prod.description}" width="300" class="product-img default">
        <img src="./assets/images/products/${prod.type}_1.jpg" alt="${prod.description}" width="300" class="product-img hover">
        <p class="showcase-badge">${prod.discount}</p>
        <div class="showcase-actions" id="actions${prod.id}">
          <button class="btn-action" id="btnHeart${prod.id}">
            <ion-icon name="heart-outline"></ion-icon>
          </button>
          <button class="btn-action" id="btnEye${prod.id}">
            <ion-icon name="eye-outline"></ion-icon>
          </button>
          <button class="btn-action" id="btnRepeat${prod.id}">
            <ion-icon name="repeat-outline"></ion-icon>
          </button>
          <button class="btn-action" id="btnAdd${prod.id}">
            <ion-icon name="bag-add-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div class="showcase-content">
        <a href="#" class="showcase-category">${prod.category}</a>
        <h3>
          <a href="#" class="showcase-title">${prod.description}</a>
        </h3>
        <div class="showcase-rating">
          ${htmlStars}
        </div>
        <div class="price-box">
          <p class="price">${prod.currency+prod.price}</p>
          <del>${prod.currency+prod.startingPrice}</del>
        </div>
      </div>
    </div>
  `
})
//to add click event in the buttons to add products to the cart and to the localStorage
arrayProducts.forEach((productArray) =>{
  document.querySelector(`#btnAdd${productArray.id}`).addEventListener('click',() => {
    // arrayCart.push(arrayProducts[productArray.id - 1]);
    arrayCart.push(arrayProducts.find(productito=>productito.id==productArray.id));
    localStorage.setItem('cart',JSON.stringify(arrayCart));
  })
})