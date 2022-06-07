let arrayProducts = [];
let countitemscart = document.querySelector("#countitemscart");
let detailcart = document.querySelector("#detailcart");
let orderSumary = document.querySelector("#orderSumary");
let itemNumbers = document.querySelector("itemNumbers");
let freeShepping = 100;

function getItemStorage() {
  //update the cart with the localStorage information, we create empty arrya if there isn't information
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function countTotalProducts() {
  //count all products of arrayCart (localStorage)
  let total = 0;
  arrayCart.forEach((p) => {
    total = total + p.count;
  });
  return total;
}
function updateCountItemsCart() {
  //update text of cartnumber
  countitemscart.textContent = countTotalProducts();
}
function saveItemStorage(array) {
  localStorage.setItem("cart", JSON.stringify(array));
}
function isInCart(id) {
  arrayCart = getItemStorage();
  return arrayCart.some((productito) => productito.id == id);
}
function updatecount(id) {
  //function to update number of items in arrayCart
  arrayCart = getItemStorage();
  const indice = arrayCart.findIndex((productito) => productito.id == id);
  arrayCart[indice].count++;
  saveItemStorage(arrayCart); ////update localstorage
}
function priceProduct(id, array) {
  //return price of product
  return array[array.findIndex((p) => p.id == id)].price;
}
function startingPriceProduct(id, array) {
  //return startingPrice of product
  return array[array.findIndex((p) => p.id == id)].startingPrice;
}
function totalCost() {
  //find total cost
  let total = 0;
  arrayCart.forEach((e) => {
    total = total + e.count * priceProduct(e.id, arrayProducts);
  });
  return total;
}
function totalCostWithoutDiscount() {
  //find total cost without discount
  let total = 0;
  arrayCart.forEach((e) => {
    total = total + e.count * startingPriceProduct(e.id, arrayProducts);
  });
  return total;
}
function showItemCard()
{
    arrayCart = getItemStorage();
    itemCart = document.querySelector('#itemCart');
    arrayCart.forEach(item =>{
        const prod = arrayProducts[arrayProducts.findIndex(p=>p.id == item.id)];
        let nSelected = "";
        for (let i = 1; i <= 10; i++) {
            i == item.count 
            ? nSelected += `<option selected value="${i}">${i}</option>`
            : nSelected += `<option value="${i}">${i}</option>`
        }
        itemCart.innerHTML += `
            <div class="showcase">
                <a href="#" class="showcase-img-box">
                    <img
                        src="../images/products/${prod.type}.jpg"
                        alt="${prod.description}"
                        width="170"
                        class="showcase-img"
                    />
                </a>
                <div class="item-cart">
                    <div class="item-cart-description">
                        <div class="showcase-content">
                        <a href="#">
                            <h4 class="showcase-title">
                            ${prod.description}
                            </h4>
                        </a>
                        <a href="#" class="showcase-category">${prod.category}</a>
                        <div class="price-box">
                            <p class="price">${prod.currency + prod.price}</p>
                            <del>${prod.startingPrice}</del>
                        </div>                          
                        </div>
                        <button class="sidebar-close-btn2" data-mobile-menu-close-btn>
                        <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>                      
                    <div>
                        <select name="n" id="itemNumbers">
                            ${nSelected}
                        </select>
                    </div>
                </div>
            </div>
        `

    })
}
function showDetailCart() {
  arrayCart = getItemStorage();
  const n = countTotalProducts();
  totalSum = totalCost();
  delieryCost = totalSum >= freeShepping ? 0.00 : 4.99;
  textDelieryCost = delieryCost == 0 ? "FREE" : "$ 4.99";
  total = totalSum + delieryCost;
  totalWithoutdiscount = totalCostWithoutDiscount();
  sale = totalWithoutdiscount - totalSum;
  
  orderSumary.innerHTML += `
    <h2 class="newsletter-title2">Order sumary</h2>
    <div class="content-item">
        <p class="newsletter-desc">Original price:</p>
        <p class="newsletter-desc">$${totalWithoutdiscount}</p>
    </div>
    <div class="content-item">
        <p class="newsletter-desc">Sale:</p>
        <p class="newsletter-desc">-${sale}</p>
    </div>
    <div class="content-item">
        <p class="newsletter-desc">${n} items</p>
    </div>
    <div class="content-item">
        <p class="newsletter-desc">Total product cost:</p>
        <p class="newsletter-desc">$ ${totalSum}</p>
    </div>
    <div class="content-item">
        <p class="newsletter-desc">Delivery costs:</p>
        <p class="newsletter-desc">${textDelieryCost}</p>
    </div>
    <div class="content-item">
        <p class="newsletter-desc">Total :</p>
        <p class="newsletter-desc">$ ${total}</p>
    </div>
    <p class="newsletter-desc">(taxes included)</p>
    </p>
  `
  detailcart.innerHTML += `
        <h2 class="title2">YOUR CART</h2>
        <p class="newsletter-desc2">TOTAL :(${n} items) $${totalSum}</p>
        <p class="newsletter-desc2">Items in your bag are not reserved — check out now to make them yours.</p>
        <div class="showcase-wrapper has-scrollbar">
            <div class="showcase-container" id="itemCart">
                
            </div>                  
        </div>
    `;
}
fetch("../../products.json")
  .then((response) => response.json())
  .then((productoss) => {
    arrayProducts = productoss;
    updateCountItemsCart(); // update text of cartnumber
    showDetailCart();
    showItemCard();
  });
let arrayCart = getItemStorage(); //update arrayCart with localstorage
