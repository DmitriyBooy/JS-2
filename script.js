
function makeGETRequest(url) {
  var xhr;  
  return new Promise((resolve, reject) => {
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }  
    xhr.onload = function() {
      console.log(xhr.responseText);
      resolve(xhr.responseText);
    };
    xhr.onerror = function() {
      reject(`Ошибка соединения`);
    };
    xhr.open('GET', url, true);
    xhr.send();    
  });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

  class GoodsItem {
    constructor(product_name, price, id_product) {
      this.product_name = product_name;
      this.price = price;
      this.id_product = id_product;
    }
    render() {
      return `<div class="goods-item"><h3 class="title-goods-item">${this.product_name}</h3><p class="price-goods-item">${this.price}</p><button data-productid="${this.id_product}" class="add-button cart-button">Добавить в корзину</button></div>`;
    }
  }

  
  class GoodsList {
    constructor(product_name, price, id_product) {
      this.goods = [];
    }
    async fetchGoods(cb) {
     this.goods = JSON.parse(await makeGETRequest(`${API_URL}/catalogData.json`));
     cb();
    }
    render() {
      let listHtml = '';
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
        listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').innerHTML = listHtml;
    }
  }
  
  const list = new GoodsList();
  list.fetchGoods(() => {
    list.render();
    document.querySelectorAll('.add-button').forEach(item => {
      item.addEventListener('click', function() {
        let get = item.getAttribute('data-productid');
        let index = list.goods.findIndex(x => x.id_product == get);
        cart1.addItem(list.goods[index]);
        console.log(cart)
      })
    })
  });
  
  let cart = [];

  class Cart {
    renderCart() {
      let cart = document.createElement('div');
      cart.className = 'cart';
      cart.id = 'cart';
      cart.style.display = 'none';
      return cart;
    }
    addItem(item) {
        let index = cart.findIndex(x => x.product_name === item.product_name);
        console.log(index);
      if (index != -1) {
        cart[index].amount++;
        cart2.renderCart();
        console.log(cart);
      } else {
        cart.push({
          product_name: item.product_name,
          price: item.price,
          amount: 1,
          id_product: item.id_product
        })
        console.log(cart);
        cart2.renderCart();
      }      
    }
    awayItem(item) {
      let index = cart.findIndex(x => x.product_name === item.product_name);
      if (index != -1) {
        if(cart[index].amount <= 1){
          cart.splice(index,1);
          console.log(cart);
          cart2.renderCart();
        } else {
          cart[index].amount--;
          console.log(cart);
          cart2.renderCart();
        }
      }     
    }
  }


  class CartItem extends GoodsItem{
    constructor(product_name, price, amount) {
      super(product_name, price)
    }
    renderCart (){
      let getCart = document.querySelector('.cart')
      let getResult = '<div class="cart-item">';
      let sum = 0;
      cart.forEach(item => {
        getResult += `<h3 class="title-cart-item">${item.product_name}-${item.price} кол-во ${item.amount}</h3><button class="plus-button" data-productid="${item.id_product}">+</button><button class="nun-button" data-productid="${item.id_product}">-</button>`
        sum += item.price * item.amount;
      })
      getResult += `</div><p class="total-sum">${sum}</p>`
      getCart.innerHTML=getResult;
      document.querySelectorAll('.plus-button').forEach(item => {
        item.addEventListener('click', function(){
          let get = item.getAttribute('data-productid');
          let index = list.goods.findIndex(x => x.id_product == get);
          cart1.addItem(list.goods[index]);
        })
      })
      document.querySelectorAll('.nun-button').forEach(item => {
        item.addEventListener('click', function(){
          let get = item.getAttribute('data-productid');
          let index = list.goods.findIndex(x => x.id_product == get);
          cart1.awayItem(list.goods[index]);
        })
      })
    };
  }
  let cart1 = new Cart();
  let cart2 = new CartItem();
  document.querySelector('.cart-add').append(cart1.renderCart());
  let cartButton = document.getElementById('cart-button');
  let cartOn = document.getElementById('cart');
  let cartOpen = false;
  cartButton.addEventListener('click', function() {
    if (cartOpen) {
      cartOn.style.display = 'none';
    } else {
      cart2.renderCart();
      cartOn.style.display = 'block';
    }
    cartOpen = !cartOpen
  });