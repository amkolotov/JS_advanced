const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',

    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.showError(error);
                })
        },
        filterProducts(message) {
            this.$refs.products.filter(message);
        }
    },
    mounted() {
        console.log(this);
    }
});

