Vue.component('error', {
    data() {
        return {
            error: ''
        }
    },
    methods: {
        showError(error) {
            this.error = error;
        }
    },
    template: `<div class="error" v-show="error">{{ this.error }}</div>`
});