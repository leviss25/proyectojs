let arrayProducts =[];
let countitemscart = document.querySelector("#countitemscart");
let detailcart = document.querySelector("#detailcart");

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
  function showProductoCart(){
    detailcart.innerHTML += `
        <h2 class="title2">YOUR CART</h2>
        <p class="newsletter-desc2">TOTAL :(2 items) $770.00</p>
        <p class="newsletter-desc2">Items in your bag are not reserved — check out now to make them yours.</p>
        <div class="showcase-wrapper has-scrollbar">
        <div class="showcase-container" id="itemCart">
            
        </div>                  
        </div>
    `
  }
  let arrayCart = getItemStorage(); //update arrayCart with localstorage