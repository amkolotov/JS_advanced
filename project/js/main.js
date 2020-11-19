const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';


class ProductList {
    constructor(container='.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
//        this._fetchProducts();
//        this._getProducts()
//            .then((data) => {
//                this._goods = [...data];
//                this._renderProducts();
        this._getProducts(`${API}catalogData.json`)
            .then((text) => {
                let data = JSON.parse(text)
                this._goods = [...data];
                this._renderProducts();
                this.addListener();
                this.basket = new Basket();
            });
    }

//    _fetchProducts() {
//        this._goods = [
//                   {id: 1, title: 'Notebook', price: 20000},
//                   {id: 2, title: 'Mouse', price: 1500},
//                   {id: 3, title: 'Keyboard', price: 5000},
//                   {id: 4, title: 'Gamepad', price: 4500},
//                ];
//    }
//
//    _getProducts() {
//        return fetch(`${API}catalogData.json`)
//            .then(response => response.json())
//            .catch((err) => {
//                console.log(err);
//            });
//    }

    _getProducts (url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
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
        for (let product of this._allProducts) {
            totalCost += product.price;
        }
        return totalCost;
    }

    addListener() {
        let buyBtns = document.querySelectorAll(".buy-btn");

        console.log(buyBtns);

        for (let btn of buyBtns) {
            console.log(btn);
            btn.addEventListener('click', basket.addItem);
        }
    }
}

class Product  {
    constructor(product, img='https://placehold.it/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
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


class BasketItem {
    constructor(id, quantity=1) {
        this.product = this._getBasketProduct(id);
        this.quantity = quantity;
    }

    _getBasketProduct(id) {
        for (let item of productList._goods) {
            if (item.id_product == id) {
                return item;
            }
        }
    }

    _totalPrice() {
        return this.product.price * this.quantity;
    }

    getBasketItemHTML() {
        return`<div class="product-item" data-id="${this.product.id_product}">
                   <img src="${this.product.img}" alt="Some img">
                   <div class="desc">
                       <h3>${this.product.product_name}</h3>
                       <p>${this.product.price} \u20bd</p>
                       <p>${this._getTotalCost} \u20bd</p>
                       <button class="buy-btn">Добавить</button>
                       <button class="buy-btn">Убавить</button>
                       <button class="buy-btn">Удалить</button>
                   </div>
                </div>`;
    }

}

class Basket {
    constructor(container='.basket') {
        this.container = container;
        this.basketItems = [];
    }


    addItem(event) {
        let item = getItem(event)
        if (item) {
            item.quantity += 1;
        } else {
            let _basketItem = new BasketItem(event.target.parentElement.parentElement.attributes['data-id'].value);
            this.basketItems.push(_basketItem);
        }
    }

    subItem(event) {
        let item = this.getItem(event)
        if (item) {
            if (item.quantity = 1) {
                this.delItem(event);
            } else {
                item.quantity -= 1;
            }
        }
    }

    delItem(event) {
        let item = this.getItem(event)
        this.basketItems.splice(this.basketItems.indexOf(item), 1)
    }

    _getTotalCost() {
        let totalCost = 0
        for (let item of this.allItems) {
            totalCost += item.totalPrice();
        }
        return totalCost;
    }

    renderBasket() {
        const container = document.querySelector(this.container);

        for (let basketItem of this.basketItems) {
            container.insertAdjacentHTML('beforeend', basketItems.getBasketItemHTML());
        }
    }
}

function getItem(event) {
    let id = event.target.parentElement.parentElement.attributes['data-id'].value;
    for (let item of basket.basketItems) {
        if (item.id_product == id) {
            return item;
        }
    }
}

const productList = new ProductList();

let basket = new Basket();

