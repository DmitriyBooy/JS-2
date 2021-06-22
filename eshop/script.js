Vue.component('goods-list', {
    props: ['goods','cart'],
    template: `
      <div class="goods-list">
        <goods-item :cart="cart" v-for="good in goods" :good="good" :key="good.key"></goods-item>
      </div>
    `
});

Vue.component('goods-item', {
    props: ['good','cart'],
    template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button @click="addItem(good)">Добавить в корзину</button>
      </div>
    `,
    methods: {
        async addItem(good){
            let cart = await axios.post('/addtocart', {
                product_name: good.product_name,
                price: good.price,
                amount: 1,
                id_product: good.id_product,   
            });
        }
    }
});

Vue.component('cart-item', {
    props:['cart','openedcart'],
    methods: {
        rmcartitem(good) {
            axios.post('/rmcartitem', {
            product_name: good.product_name
        });
    }
    },
    template: `
    <div v-if="openedcart" class="cart">
        <div v-for="good in cart" :key="good.key" class="cart-item">
            <h3>{{ good.product_name }}</h3>
            <p>Цена:{{ good.price }}</p>
            <p>кол-во:{{good.amount}}</p>
            <button @click="rmcartitem(good)" />
        </div>
    </div>
    `
});

Vue.component ('search', {
    props:['goods'],
    data: function(){
        return {
        filteredGoods: [],
        searchLine: '',
        }
    },
    methods: {
        FilterGoods() {
            if(this.searchLine.length >= 2){
                this.filteredGoods = [];
                for(let i = 0; i < this.goods.length; i++){
                    if(this.goods[i].product_name.toLowerCase().indexOf(this.searchLine.toLowerCase()) !== -1){
                        this.filteredGoods.push(this.goods[i]);
                    }
                }                
            } else {
                this.filteredGoods = []
            }
        },
    },
    template: `
    <div>
        <input @keyup="FilterGoods" v-model="searchLine" type="text">
        <div v-for="good in filteredGoods" class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
        </div>
    </div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        url: '/database/catalog.json',
        goods: [],
        errors: [],
        cart: [],
        isVisibleCart: false,
        isVisibleList: false,
    },
    mounted() {
        this.makeGetRequest();
    },
    methods: {
        async makeGetRequest() {
            try {
                const result = await axios.get(this.url);
                this.goods = this.goods.concat(result.data);
                if(this.goods.length > 0) {
                    this.isVisibleList = true;
                }
            } catch (error) {
                this.errors.push(error);
            }
        },
        async syncCart() {
            let cart = await axios.get('/getcart');
            this.cart = cart.data;
        },
        async showCart(){
            this.isVisibleCart = !this.isVisibleCart
            if(this.isVisibleCart) {
                this.syncCart();
            }
        },
    },
});