
  class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }
    render() {
      return `
      <div class="goods-item">
        <h3 class="title-goods-item">${this.title}</h3>
        <div class="goods-item-add">
          <p class="price-goods-item">${this.price}</p>
          </div>
        <button data-productID="${this.title}" class="add-button add-${this.title}">Добавить в корзину</button>
      </div>`;
    }
  }

  
  class GoodsList {
    constructor(title, price,) {
      this.goods = [];
    }
    fetchGoods() {
      this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ];
    }
    render() {
      let listHtml = '';
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price);
        listHtml += goodItem.render();
      });
      document.querySelector ('.goods-list').innerHTML = listHtml;
    }
  }
  
  const list = new GoodsList ();
  list.fetchGoods();
  list.render();
  
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
      console.log(cart);
      let index = cart.findIndex(x => x.title === item.title);
      console.log(index);
      if (index != -1) {
        cart[index].amount++;
      } else {
        cart.push({
          title: item.title,
          price: item.price,
          amount: 1,
        })
      }
    }
  }
  
  let cart1 = new Cart();
  document.querySelector('.cart-add').appendChild(cart1.renderCart());
  let cartButton = document.getElementById('cart-button');
  let cartOn = document.getElementById('cart');
  let cartOpen = false;
  cartButton.addEventListener('click', function() {
    if (cartOpen) {
      cartOn.style.display = 'none';
    } else {
      cartOn.style.display = 'block';
    }
    cartOpen = !cartOpen
  });

  class CartItem extends GoodsItem{
    constructor(title, price, amount) {
      super(title, price)
    }
    renderCart (){
      return`
      <div class="cart-item">
        <h3 class="title-crat-item">${this.title}</h3>
        <p class="price-cart-item">${this.price}</p>
        <button class="+button +-${this.title}">Добавить в корзину</button>
        <button class="-button --${this.title}">Добавить в корзину</button>
      </div>`
    };
  }

  document.querySelectorAll('.add-button').forEach(item => {
    item.addEventListener('click', function() {
      let get = item.getAttribute('data-productID');
      let index = list.goods.findIndex(x => x.title === get);
      cart1.addItem(list.goods[index]);
    })
  })

