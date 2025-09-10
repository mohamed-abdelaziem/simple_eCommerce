"use strict";
/// <reference types="./jquery/@types/jquery/" />

var myRow = document.getElementById("myRow");
var containerOfCart = document.getElementById("cartParent");
var counterInCart = document.getElementById("counter");
var cartParent = document.getElementById("cartParent");
var newCounter = Number(counterInCart.innerText) || 0;
var empty = document.getElementById("empty");
var modal = document.getElementById("modal");
var showPrice = document.getElementById("price");
var deleteAll = document.getElementById("deleteAll");
var productName = document.getElementById("productName");
var productCount = document.getElementById("productCount");
var addProductBtn = document.getElementById("addProduct");
var updateProductBtn = document.getElementById("updateProduct");
var iter = 0;
// setInterval(function(){
// modal.classList.toggle("d-none")
// } , 2000)


// counterInCart.innerText = newCounter;

if(localStorage.getItem("counter")){
counterInCart.innerText =   localStorage.getItem("counter");
newCounter = localStorage.getItem("counter")
}else{
console.log("not found")
}

var productList = [
  {
    name: "samsung A10s",
    price: 10000,
    category: "mobile",
    discunt: "20%",
    store: 10,
    productId: 1,
    countInCart : 0,
    imageSrc: "./imgs/Samsung-Galaxy-A10s-1.webp",
    rating: "4.3",
  },
  {
    name: "iphone",
    price: 20000,
    category: "mobile",
    discunt: "10%",
    store: 5,
    productId: 2,
    countInCart : 0,
    imageSrc: "./imgs/download.jpeg",
    rating: "5.0",
  },
  {
    name: "Redmi",
    price: 7000,
    category: "mobile",
    discunt: "5%",
    store: 6,
    productId: 3,
    countInCart : 0,
    imageSrc: "./imgs/ريدمي.jpeg",
    rating: "4.8",
  },
  {
    name: "samsung 2",
    price: 8000,
    category: "mobile",
    discunt: "35%",
    store: 7,
    productId: 4,
    countInCart : 0,
    imageSrc: "./imgs/سامسونج2.jpeg",
    rating: "3.5",
  },
  {
    name: "samsung",
    price: 3000,
    category: "mobile",
    discunt: 0,
    store: 6,
    productId: 5,
    countInCart : 0,
    imageSrc: "./imgs/Samsung-Galaxy-A10s-1.webp",
    rating: "4.0",
  },
  {
    name: "Huwawi",
    price: 9000,
    category: "mobile",
    discunt: 0,
    store: 3,
    productId: 6,
    countInCart : 0,
    imageSrc: "./imgs/هاواوي.jpeg",
    rating: "5.0",
  },
  {
    name: "Xaomi",
    price: 2000,
    category: "mobile",
    discunt: 0,
    store: 4,
    productId: 7,
    countInCart : 0,
    imageSrc: "./imgs/شاومي.jpeg",
    rating: "3.0",
  },
];

function displayProduct() {
  var cartona = "";
  for (var index = 0; index < productList.length; index++) {
    cartona += `
  <div class="col-md-4">
      <div class="inner position-relative">
        <img class="w-100" src="${productList[index].imageSrc}" alt="">
        <h2 class="fs-4">${productList[index].name}</h2>
        <span>${productList[index].category}</span>
        ${
          productList[index].discunt
            ? `<span class="bg-info p-2 position-absolute top-0 end-0">${productList[index].discunt}</span>`
            : ""
        }
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-black fw-normal">${productList[index].price} EGP</span>
          <span>   ${productList[index].rating
          }<i class="fa-solid fa-star text-warning"></i>
         </span>
        </div>
        <button class="btn btn-outline-success w-100" onclick="addToCart(${index})">Add To Cart<i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
`;
  }

  myRow.innerHTML = cartona;
}

displayProduct();
var cartArr = [];


// localStorage.clear()
function addToCart(index) {
var item = productList[index];
var foundIndex = cartArr.findIndex(function(elem){
return elem.productId == item.productId;
})
if(foundIndex === -1 && (item.store >= item.countInCart || item.store )){
item.countInCart = 1; // iphone 2 
console.log(item)
item.store = item.store - 1;
cartArr.push(item);
localStorage.setItem("cartArr" , JSON.stringify(cartArr));
++newCounter;
counterInCart.innerText = newCounter;
localStorage.setItem("counter" , counterInCart.innerText)  ; 
}else if (foundIndex  > -1 && (item.store >= item.countInCart || item.store )){
item.countInCart += 1;
item.store = item.store - 1;
console.log(item);
localStorage.setItem("cartArr" , JSON.stringify(cartArr));
++newCounter;
counterInCart.innerText = newCounter;
localStorage.setItem("counter" , counterInCart.innerText);
}

if(cartArr.length == 0){
  deleteAll.classList.add("d-none");
}

displayCart()
}

function displayCart() {




  var totalPrice = cartArr.reduce(function(acc,elem){
    acc += elem.price * elem.countInCart;
    return acc
  },0)
console.log(totalPrice);

showPrice.classList.replace("d-none" , "d-inline");
showPrice.innerText = totalPrice.toString() + " EGP";

  var cartona2 = "";

  for (var i = 0; i < cartArr.length; i++) {
    iter = i;
cartona2 += `
<div class="col-md-3">
<div class="inner productInCart border bg-white border-3 border-secondary text-center rounded">
       <img style="height:200px; object-fit:cover;" src="${cartArr[i].imageSrc}"  class="w-100 " alt="">
     
  <div class="product-details p-2">
   <h2>${cartArr[i].name}</h2>
      <div class="priceRating  p-2 d-flex align-items-center justify-content-between">
         <span>${cartArr[i].price} EGP</span>
         <span>${cartArr[i].rating}<i class="fa-solid fa-star text-warning fa-sm"></i></span>
       </div>
        <p >The Stock Of Product <span class="text-danger">${cartArr[i].store}</span></p>
       <div class="btns d-flex  p-2  align-items-center justify-content-center column-gap-2">
         <div class="btn btn-outline-success" onclick="increamentProduct(${i})">+</div>
         <div class="counterInCart text-black" >${cartArr[i].countInCart}</div>
         <div class="btn btn-outline-danger" onclick="decreamentProduct(${i})">-</div>
       </div>
       <button class="btn btn-outline-danger" onclick="deleteSpecificProduct(${i})">Delete<i class="fa-solid fa-trash"></i></button>
       <button class="btn btn-outline-warning" onclick="setToUpdate(${i})">Edit<i class="fa-solid fa-pen"></i></button>
  </div>

</div>
     </div>
`;
    } 
     
if(cartArr.length == 0 && cartona2 == ""){
cartParent.innerHTML = `<p class="alert alert-danger text-center fs-4" id="empty">Cart Is Empty</p`;
}else if(cartona2 !="" && cartArr.length !=0){
  cartParent.innerHTML = cartona2 ;
  deleteAll.classList.replace("d-none" , "d-block");
}
  }



if(localStorage.getItem("cartArr")){
cartArr = JSON.parse(localStorage.getItem("cartArr"));
displayCart();
}else{
cartArr = []
displayCart()
}



var newCounterFromCartArr;
function decreamentProduct(index){
if((cartArr[index].countInCart >= cartArr[index].store )|| cartArr[index].countInCart){
cartArr[index].countInCart -=1;
cartArr[index].store +=1;
}


if(cartArr[index].countInCart == 0){
cartArr.splice(index,1);
localStorage.setItem("cartArr" , JSON.stringify(cartArr))
}



newCounterFromCartArr = cartArr.reduce(function(acc,elem){
 
  acc += elem.countInCart;
  return acc;

},0);

counterInCart.innerText = newCounterFromCartArr;
localStorage.setItem("counter" , counterInCart.innerText)
if(cartArr.length == 0){
  deleteAll.classList.add("d-none");
}
displayCart();
}




function increamentProduct(index){


if(cartArr[index].store <= 0){
return;
}


if((cartArr[index].countInCart <= cartArr[index].store) || cartArr[index].countInCart > cartArr[index].store){
cartArr[index].countInCart +=1
cartArr[index].store -=1;



}




newCounterFromCartArr = cartArr.reduce(function(acc,elem){
acc += elem.countInCart;
return acc;
},0)

localStorage.setItem("cartArr" , JSON.stringify(cartArr))
counterInCart.innerText = newCounterFromCartArr;
localStorage.setItem("counter", counterInCart.innerText);





displayCart();





}








if(cartArr.length ==0){
  deleteAll.classList.add("d-none");
}





deleteAll.addEventListener("click" , function(){
cartArr.splice(0);
localStorage.setItem("cartArr" , JSON.stringify(cartArr))
counterInCart.innerText  = 0;
deleteAll.classList.add("d-none")
localStorage.setItem("counter" , counterInCart.innerText)
displayCart();
})







function deleteSpecificProduct(index){
cartArr.splice(index,1)
localStorage.setItem("cartArr" , JSON.stringify(cartArr));
displayCart()
}




function addProduct(){
var productNameValue = productName.value
var productCountValue = productCount.value;

var foundIndex = productList.findIndex(function(elem){
return elem.name == productNameValue;
})


if(foundIndex == -1){
document.getElementById("notFound").classList.replace("d-none" , "d-block")
}else{
productList[foundIndex].countInCart = productList[foundIndex].countInCart+ Number(productCountValue) -1;



addToCart(foundIndex);
cartArr.reduce(function(acc,elem){
acc += elem.countInCart ;
newCounterFromCartArr = acc;
},0)
localStorage.setItem("cartArr",JSON.stringify(cartArr))
}



}



addProductBtn.addEventListener("click", function(){
addProduct()
})



// localStorage.clear()

updateProductBtn.classList.add("d-none")
function setToUpdate(index){
productName.value = cartArr[index].name;
productCount.value = cartArr[index].countInCart;
console.log(index,iter);
updateProductBtn.classList.replace("d-none" , "d-block");
}


function updateProduct(){
cartArr[iter].name = productName.value;
cartArr[iter].countInCart = productCount.value;
updateProductBtn.classList.replace("d-block" , "d-none")
}


updateProductBtn.addEventListener("click" , function(){
updateProduct();
var foundproduct = productList.find(function(elem){
return productName.value.toLowerCase() == elem.name.toLowerCase();
})

console.log(foundproduct)

})





$(function(){
$(".loading .spinner").fadeOut(1000,function(){
$(".loading").slideUp(1000,function(){
$("body , html").animate({ overflow : "auto"});
})
})




})