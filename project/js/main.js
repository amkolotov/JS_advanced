const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        isVisibleCard: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filterGoods() {
            console.log(this.searchLine)
            const regexp = new RegExp(this.searchLine, 'i');
            let searchProduct = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach (product => {
                if (!searchProduct.includes(product)) {
                    product.visible = false;
                } else {
                    product.visible = true;
                }
            })
        },
        changeVisibleBasket() {
            this.isVisibleCard ? this.isVisibleCard = false : this.isVisibleCard = true;
        }
    },
    beforeCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    el.visible = true
                    this.products.push(el);
                }
            });
    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});
