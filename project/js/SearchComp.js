Vue.component('search', {
    data() {
        return {
            userSearch: '',
        }
    },
    methods: {
        logSearch() {
            console.log(this.userSearch)
            this.$emit('search-products', this.userSearch);
        }
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="logSearch">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});