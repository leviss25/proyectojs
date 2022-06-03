let gridProduct = document.querySelector("#gridproducts");
// to go through the arrayProducts and create a card for each product
arrayProducts.forEach((prod) => {
  //we count the number of stars of each product....
  let htmlStars = "";
  for (let i = 1; i <= 5; i++) {
    i <= prod.stars
      ? (htmlStars += `<ion-icon name="star"></ion-icon>`)
      : (htmlStars += `<ion-icon name="star-outline"></ion-icon>`);
  }
  //....
  let typediscount = "";
  switch (prod.discount) {
    case "sale": {
      typediscount = "angle black";
      break;
    }
    case "new": {
      typediscount = "angle pink";
      break;
    }
  }
  gridProduct.innerHTML += `
      <div class="showcase" id="product${prod.id}">
        <div class="showcase-banner">
          <img src="./assets/images/products/${prod.type}.jpg" alt="${prod.description}" width="300" class="product-img default">
          <img src="./assets/images/products/${prod.type}_1.jpg" alt="${prod.description}" width="300" class="product-img hover">
          <p class="showcase-badge ${typediscount}">${prod.discount}</p>
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
            <p class="price">${prod.currency + prod.price}</p>
            <del>${prod.currency + prod.startingPrice}</del>
          </div>
        </div>
      </div>
    `;
});
//to update the cart with the localStorage information, we create empty arrya if there isn't information

function getItemStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
let arrayCart = getItemStorage();

function saveItemStorage(array) {
  localStorage.setItem("cart", JSON.stringify(array));
}

function isInCart(id) {
  arrayCart = getItemStorage();
  return arrayCart.some(productito => productito.id == id);
}

function updatecount(id) {
  arrayCart = getItemStorage();
  const indice = arrayCart.findIndex(productito => productito.id == id);
  arrayCart[indice].count++;
  saveItemStorage(arrayCart);
}
function showProductAdded() {
  Swal.fire({
    title: '<strong>SUCCESSFULLY ADDED TO CART!</strong>',
    html:`<div class="modal-content2"> <div class="product-preview"> <div class="product-description"> <img src="./assets/images/newsletter.png" alt="product added" width="100" height="100"/> </div><div class="product-description"> <h3 class="newsletter-title">Mens Winter Leathers Jackets</h3> <p class="newsletter-desc">$ 200</p><p class="newsletter-desc">Jacket</p><p class="newsletter-desc">Quantity: 1</p></div></div><div class="product-preview"> <form action="#"> <div class="newsletter-header"> <h3 class="newsletter-title">YOU CART</h3> <div class="content-item"> <p class="newsletter-desc">14 items</p></div><div class="content-item"> <p class="newsletter-desc">Total product cost:</p><p class="newsletter-desc">$ 3747.20</p></div><div class="content-item"> <p class="newsletter-desc">Delivery costs:</p><p class="newsletter-desc">FREE</p></div><div class="content-item"> <p class="newsletter-desc">Total :</p><p class="newsletter-desc">$ 3747.20</p></div><p class="newsletter-desc">(taxes included)</p></p></div><button type="submit" class="btn-newsletter">View Cart</button> </form> </div></div>`,
    showCloseButton: true,
    showConfirmButton: false,
    // cancelButtonAriaLabel: 'Thumbs down',
    width: '50%'
  })
}
//to add click event in the buttons to add products to the cart and to the localStorage
arrayProducts.forEach((productArray) => {
  document.querySelector(`#btnAdd${productArray.id}`).addEventListener("click", () => {
    if (isInCart(productArray.id)) {
      updatecount(productArray.id);
    } else {
      arrayCart.push({ ...arrayProducts.find(productito => productito.id == productArray.id), count: 1 });
      saveItemStorage(arrayCart);
    }
    showProductAdded();
  });
});
