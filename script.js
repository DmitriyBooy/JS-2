const app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        goods: [],
        filteredGoods: [],
        searchLine: '',
        errors: [],
        cart: [],
        isVisibleCart: false,
        isVisibleList: false,
    },
    mounted() {
        this.makeGetRequest();
        console.log(this.goods)
    },
    methods: {
        async makeGetRequest() {
            try {
                const response = await fetch(this.url);
                const result = await response.json();
                this.goods = this.goods.concat(result);
                console.log(this.goods.length);
                if(this.goods.length > 0) {
                    this.isVisibleList = true;
                }
            } catch (error) {
                this.errors.push(error);
            }
        },
        FilterGoods() {
            if(this.input.length >= 2){
                this.filteredGoods = [];
                for(let i = 0; i < this.goods.length; i++){
                    if(this.goods[i].product_name.indexOf(this.searchLine) !== -1){
                        this.filteredGoods.push(this.goods[i]);
                    }
                }
                console.log(this.filteredGoods);                
            }
        },
        addItem(good){
            let index = this.cart.findIndex(x => x.product_name === good.product_name);
            console.log(index);
            if(index != -1){
                this.cart[index].amount++;
                console.log(this.cart);
            } else {
                this.cart.push({
                 product_name: good.product_name,
                 price: good.price,
                 amount: 1,
                 id_product: good.id_product,   
                });
                console.log(this.cart);
            }
        },
        showCart(){
            this.isVisibleCart = !this.isVisibleCart
        }

    },

});