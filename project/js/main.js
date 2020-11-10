const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price) => {
    return `<div class="product-item row pt-4">
                <div class="col"><h3 class="col">${title}</h3></div>
                <div class="col"><p class="col">${price}</p></div>
                <div class="col"><button class="by-btn btn btn-secondary">Добавить в корзину</button></div>
              </div>`;
};

const catalogInit = (list=[{title: 'Нет продуктов', price: 0}]) => {
    let div = document.querySelector('.products');
    for (let i = 0; i < list.length; i++) {
        div.innerHTML += renderProduct(list[i].title, list[i].price);
    }
};
catalogInit(products);
