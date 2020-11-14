class Product  {
    constructor(product, img='https://placehold.it/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    getProductHTML() {
         return`<div class="product-item" data-id="${this.id}">
                   <img src="${this.img}" alt="Some img">
                   <div class="desc">
                       <h3>${this.title}</h3>
                       <p>${this.price} \u20bd</p>
                       <button class="buy-btn">Купить</button>
                   </div>
                </div>`;
    }
}

class ProductList {
    constructor(container='.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._fetchProducts();
        this._renderProducts();

    }

    _fetchProducts() {
        this._goods = [
                   {id: 1, title: 'Notebook', price: 20000},
                   {id: 2, title: 'Mouse', price: 1500},
                   {id: 3, title: 'Keyboard', price: 5000},
                   {id: 4, title: 'Gamepad', price: 4500},
                ];
    }

    _renderProducts() {
        const container = document.querySelector(this.container);

        for (let product of this._goods) {
            const _product = new Product(product);
            this._allProducts.push(_product);

            container.insertAdjacentHTML('beforeend', _product.getProductHTML());
        }
    }

    getTotalCost() {
        let totalCost = 0;
        for (product of this._allProducts) {
            totalCost += product.price;
        }
        return totalCost;
    }
}

class BasketItem extends Product {
    constructor(product, img='https://placehold.it/200x150', quantity) {
        super(product, img);
        this.quantity = quantity;
    }

    totalPrice() {
        return this.price * this.quantity;
    }

    getBasketItemHTML() {

    }

}

class Basket {
    constructor(user) {
        this.user = user;
        this.basketItems = [];
        this.renderBasket();
    }

    addItem(item) {
        this.basketItems.push(item);
    }

    getTotalCost() {
        let totalCost = 0
        for (item of this.allItems) {
            totalCost += item.totalPrice();
        }
        return totalCost;
    }

    renderBasket() {

    }
}


const productList = new ProductList();



