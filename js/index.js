var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pCat = document.getElementById("pCat");
var pDesc = document.getElementById("pDesc");
var searchInput = document.getElementById("searchInput");
var addProductBtn = document.getElementById("addProductBtn");
var upDateProductBtn = document.getElementById("upDateProductBtn");

var productList = [];

if (localStorage.getItem("Product") != null) {

  productList = JSON.parse(localStorage.getItem("Product"));

  display(productList); 
}

function addProduct() {

  var productObject = {
    name: pName.value,
    price: pPrice.value,
    category: pCat.value,
    desc: pDesc.value,
  };

  productList.push(productObject); 

  localStorage.setItem("Product", JSON.stringify(productList));

  display(productList); 

  clear(); 
}



function display(list) {
  var cartona = ``;

  for (var i = 0; i < list.length; i++) {

    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button class="btn btn-sm btn-warning" onclick="setFormForupdate(${i})" >update</button></td>
    <td><button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})" id="upP" >delete</button></td>
    </tr>`;
  }

  document.getElementById("data").innerHTML = cartona;
}

function deleteProduct(deletedIndex) {

  productList.splice(deletedIndex, 1);

  localStorage.setItem("Product", JSON.stringify(productList));

  display(productList); 
}


function clear() {
  pName.value = "";
  pPrice.value = "";
  pCat.value = "";
  pDesc.value = "";

}



function search(term) {
  var matchProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) === true) {
      matchProduct.push(productList[i]);
    }
  }

  display(matchProduct);
}

var targeti = null;

function setFormForupdate(rowIndex) {
  addProductBtn.classList.replace("d-block", "d-none");
  upDateProductBtn.classList.replace("d-none", "d-block");

  pName.value = productList[rowIndex].name;
  pPrice.value = productList[rowIndex].price;
  pCat.value = productList[rowIndex].category;
  pDesc.value = productList[rowIndex].desc;

  targeti = rowIndex;
}

function updateProduct() {
  addProductBtn.classList.replace("d-none", "d-block");
  upDateProductBtn.classList.replace("d-block", "d-none");

  productList[targeti].name = pName.value;
  productList[targeti].price = pPrice.value;
  productList[targeti].category = pCat.value;
  productList[targeti].desc = pDesc.value;

  localStorage.setItem("Product", JSON.stringify(productList));
  clear();
  display(productList);
}
