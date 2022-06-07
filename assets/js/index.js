let arrayProducts =[];
let countitemscart = document.querySelector("#countitemscart");
let gridProduct = document.querySelector("#gridproducts");

function getItemStorage() {//update the cart with the localStorage information, we create empty arrya if there isn't information
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function countTotalProducts(){//count all products of arrayCart (localStorage)
  let total=0;
  arrayCart.forEach(p=>{
    total = total + p.count;
  })
  return total;
}
function updateCountItemsCart(){//update text of cartnumber
  countitemscart.textContent = countTotalProducts();  
}
function saveItemStorage(array) {
  localStorage.setItem("cart", JSON.stringify(array));
}
function isInCart(id) {
  arrayCart = getItemStorage();
  return arrayCart.some(productito => productito.id == id);
}
function updatecount(id) {//function to update number of items in arrayCart
  arrayCart = getItemStorage();
  const indice = arrayCart.findIndex(productito => productito.id == id);
  arrayCart[indice].count++;
  saveItemStorage(arrayCart);////update localstorage
}
function priceProduct(id, array) //return price of product
{
  return array[array.findIndex(p=>p.id == id)].price;
}
function totalCost(){//find total cost
  let total=0;
  arrayCart.forEach(e => {
    total = total + (e.count * priceProduct(e.id, arrayProducts));
  })
  return total;
}
function showProductAdded(id) {
  const prod = arrayProducts[arrayProducts.findIndex(p=>p.id == id)];
  arrayCart=getItemStorage();
  const n = countTotalProducts();
  totalSum = totalCost();
  //delivery is free when it is greater than $300  :)
  delieryCost = totalSum >= 100 ? 0.00 : 4.99;
  textDelieryCost = delieryCost == 0 ? "FREE" : "$ 4.99";
  total = totalSum + delieryCost;
  Swal.fire({
    title: '<strong>SUCCESSFULLY ADDED TO CART!</strong>',
    html:`
    <div class="modal-content2">
      <div class="product-preview">
        <div class="product-description">
          <img
          src="./assets/images/products/${prod.type}.jpg"
          alt="${prod.description}"
          width="100"
          height="100"
          />
        </div>
        <div class="product-description">
          <h3 class="newsletter-title">${prod.description}</h3>
          <p class="newsletter-desc">${prod.currency} ${prod.price}</p>
          <p class="newsletter-desc">${prod.category}</p>
          <p class="newsletter-desc">Quantity: 1</p>
        </div>
      </div>
      <div class="product-preview">
        <form action="#">
          <div class="newsletter-header">
            <h3 class="newsletter-title">YOUR CART</h3>
            <div class="content-item">
              <p class="newsletter-desc">${n} items</p>
            </div>
            <div class="content-item">
              <p class="newsletter-desc">Total product cost:</p>
              <p class="newsletter-desc">${prod.currency} ${totalSum}</p>
            </div>
            <div class="content-item">
              <p class="newsletter-desc">Delivery costs:</p>
              <p class="newsletter-desc">${textDelieryCost}</p>
            </div>
            <div class="content-item">
              <p class="newsletter-desc">Total :</p>
              <p class="newsletter-desc">${prod.currency} ${total}</p>
            </div>
            <p class="newsletter-desc">(taxes included)</p>
            </p>
          </div>
          <a href="./assets/pages/cart.html" class="btn-newsletter">
          View cart
          </a>
        </form>
      </div>
    </div> 
    `,
    showCloseButton: true,
    showConfirmButton: false,
    // cancelButtonAriaLabel: 'Thumbs down',
    width: '50%'
  })
}
fetch('products.json')
.then(response => response.json())
.then(productoss =>{
  arrayProducts = productoss;
  productoss.forEach(prod =>{
    //count the number of stars of each product....
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
  })
  //to add click event in the buttons to add products to the cart and to the localStorage
  arrayProducts.forEach(productArray => {
    document.querySelector(`#btnAdd${productArray.id}`).addEventListener("click", () => {
      if (isInCart(productArray.id)) {
        updatecount(productArray.id);
      } else {
        let {id} = arrayProducts.find(productito => productito.id == productArray.id);
        arrayCart.push({id, count: 1 });
        // arrayCart.push({ ...arrayProducts.find(productito => productito.id == productArray.id), count: 1 });
        saveItemStorage(arrayCart);
      }
      updateCountItemsCart();
      showProductAdded(productArray.id);
    });
  });
})
// // to go through the arrayProducts and create a card for each product
// arrayProducts.forEach((prod) => {
//   //count the number of stars of each product....
//   let htmlStars = "";
//   for (let i = 1; i <= 5; i++) {
//     i <= prod.stars
//       ? (htmlStars += `<ion-icon name="star"></ion-icon>`)
//       : (htmlStars += `<ion-icon name="star-outline"></ion-icon>`);
//   }
//   //....
//   let typediscount = "";
//   switch (prod.discount) {
//     case "sale": {
//       typediscount = "angle black";
//       break;
//     }
//     case "new": {
//       typediscount = "angle pink";
//       break;
//     }
//   }
//   gridProduct.innerHTML += `
//       <div class="showcase" id="product${prod.id}">
//         <div class="showcase-banner">
//           <img src="./assets/images/products/${prod.type}.jpg" alt="${prod.description}" width="300" class="product-img default">
//           <img src="./assets/images/products/${prod.type}_1.jpg" alt="${prod.description}" width="300" class="product-img hover">
//           <p class="showcase-badge ${typediscount}">${prod.discount}</p>
//           <div class="showcase-actions" id="actions${prod.id}">
//             <button class="btn-action" id="btnHeart${prod.id}">
//               <ion-icon name="heart-outline"></ion-icon>
//             </button>
//             <button class="btn-action" id="btnEye${prod.id}">
//               <ion-icon name="eye-outline"></ion-icon>
//             </button>
//             <button class="btn-action" id="btnRepeat${prod.id}">
//               <ion-icon name="repeat-outline"></ion-icon>
//             </button>
//             <button class="btn-action" id="btnAdd${prod.id}">
//               <ion-icon name="bag-add-outline"></ion-icon>
//             </button>
//           </div>
//         </div>
//         <div class="showcase-content">
//           <a href="#" class="showcase-category">${prod.category}</a>
//           <h3>
//             <a href="#" class="showcase-title">${prod.description}</a>
//           </h3>
//           <div class="showcase-rating">
//             ${htmlStars}
//           </div>
//           <div class="price-box">
//             <p class="price">${prod.currency + prod.price}</p>
//             <del>${prod.currency + prod.startingPrice}</del>
//           </div>
//         </div>
//       </div>
//     `;
// });
let arrayCart = getItemStorage(); //update arrayCart with localstorage
updateCountItemsCart(); // update text of cartnumber