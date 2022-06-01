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
      case "sale":{
        typediscount = "angle black";
        break;
      }
      case "new":{
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

function getItemStorage(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}
let arrayCart = getItemStorage();

function saveItemStorage(array){
    localStorage.setItem("cart", JSON.stringify(array));
}

function isInCart(id){
    return arrayCart.some(productito => productito.id == id);
}

function updatecount(id){
    console.log(id);
    console.log(arrayCart);
    const indice = arrayCart.findIndex(productito => productito.id == id);
    console.log(indice);
    arrayCart[indice].count++;
    console.log(arrayCart);
    saveItemStorage(arrayCart);
}
//to add click event in the buttons to add products to the cart and to the localStorage
arrayProducts.forEach((productArray) => {
    document.querySelector(`#btnAdd${productArray.id}`).addEventListener("click", () => {
        if (isInCart(productArray.id)) {
            updatecount(productArray.id);
        } else {
            arrayCart.push({
                ...arrayProducts.find(productito => productito.id == productArray.id), count: 1}
              );
              saveItemStorage(arrayCart);
        }
    });
});
