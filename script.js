const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3 class="title-goods-item">${title}</h3><p class="price-goods-item">${price}</p></div>`;
  };
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join(' '); // В этот момент расставлялись замятые, так как все значения товаров собирались в массив, а в массиве есть запятые. Я обощел это с помошью join, заменив запятые на пробелы
  }
  
  renderGoodsList(goods);