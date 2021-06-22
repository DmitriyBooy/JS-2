const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readFile('../index.html', 'utf8', (err, data) => {
    res.send(data);
  })
})

app.get('/getcart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    res.send(data);
  })
})

app.post('/rmcartitem', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
     let cart = JSON.parse(data);
    let index = cart.findIndex(x => x.product_name === req.body.product_name);
    if(index != -1){
      cart.splice(index,1);
      fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
          res.send('{"result": 0}');
        } else {
          res.send(JSON.stringify(cart));
        }
      });
    }
  })
})

app.get('/catalogData', (req, res) => {
  fs.readFile('database/catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.post('/addtocart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
    const cart = JSON.parse(data);
    const item = req.body;
     
    let index = cart.findIndex(x => x.product_name === item.product_name);
    if(index != -1){
      cart[index].amount++;
    } else {
      cart.push({
        product_name: item.product_name,
        price: item.price,
        amount: 1,
        id_product: item.id_product,   
      });
    }
    fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
          res.send('{"result": 0}');
        } else {
          res.send(JSON.stringify(cart));
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000!');
});