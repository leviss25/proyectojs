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
  const product1 = new product(1,"Jackets","15%","jacket","jacket-3","Mens Winter Leathers Jackets",3,"48.00","75.00","$");
  const product2 = new product(2,"Shirt","sale","shirt","shirt-1","Pure Garment Dyed Cotton Shirt",3,"45.00","56.00","$");
  const product3 = new product(3,"Jacket","","jacket","jacket-5","MEN Yarn Fleece Full-Zip Jacket",3,"58.00","65.00","$");
  const product4 = new product(4,"Skirt","new","skirt","clothes-3","Black Floral Wrap Midi Skirt",5,"25.00","35.00","$");
  const product5 = new product(5,"Shoes","","casual","shoe-2","Casual Men's Brown shoes",5,"99.00","105.00","$");
  const product6 = new product(6,"Watch","sale","watches","watch-3","Pocket Watch Leather Pouch",3,"150.00","170.00","$");
  const product7 = new product(7,"Watch","","watches","watch-1","Smart watche Vital Plus",4,"100.00","120.00","$");
  const product8 = new product(8,"Shoes","sale","party wear","party-wear-1","Womens Party Wear Shoes",3,"25.00","30.00","$");
  const product9 = new product(9,"Jacket","","jacket","jacket-1","Mens Winter Leathers Jackets",4,"32.00","45.00","$");
  const product10 = new product(10,"Shoes","sale","sports","sports-2","Trekking & Running Shoes - black",3,"58.00","64.00","$");
  const product11 = new product(11,"shoes","","formal","shoe-1","Men's Leather Formal Wear shoes",4,"50.00","65.00","$");
  const product12 = new product(12,"Sweatshorts","sale","shorts","shorts-1","Better Basics French Terry Sweatshorts",3,"78.00","85.00","$");
  let arrayProducts = [product1,product2,product3,product4,product5,product6,product7,product8,product9,product10,product11,product12];