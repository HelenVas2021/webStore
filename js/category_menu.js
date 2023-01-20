let a = JSON.stringify(data);
let arrCategories = JSON.parse(a);
const mainPage = document.querySelector('#mainPage');
const categoryBlock = document.querySelector('#category');
const allProducts = document.getElementById('allProductPage');


//подтягивает название категорий в меню
function showCategories() {
    const containerCategories = document.querySelector('.menu_item');
    for (let i = 0; i < arrCategories.length; i++) {
        const elem = createElement(
            'li', 
            {'data-category': i, 'className': 'item'}, 
            {click: showProducts}, 
            arrCategories[i].name, 
            containerCategories);
      }
}
showCategories();
// взаимодеймтвие с категориями
function showProducts(event) {
    categoryBlock.classList.remove('hidden');
    mainPage.classList.add('hidden');
    allProducts.classList.add('hidden');

    const categoryIndex = event.target.getAttribute('data-category');
    const products = arrCategories[categoryIndex].products;
    const containerProduct = document.querySelector('.categories_card');
    containerProduct.innerHTML = '';
    
    let availability = 'on sale';
    
    for(let i = 0; i < products.length; i++) {
        const elem = createElement(
            'div', 
            {'data-product': i, 'className': arrCategories[categoryIndex].name + ' allProducts-card _mod_size', 'data-category': categoryIndex}, 
            {click: showDetails}, 
            null,
            containerProduct);
            createElement('span', { className: 'allProductName'}, null, products[i].name, elem);
            createElement('img', { src: `${products[i].main_images}`, className: 'allProductImg' }, null, null, elem);
            createElement('span', { className: 'allProductPrice' }, null, `${products[i].price} UAN`, elem);
            createElement('span', { className: 'allProductAvailability' }, null, availability, elem);
            createElement('button', { type: 'button', className: 'allProduct_btn'  }, null, 'explore' , elem);
      }
  }
  function showDetails() {

  }

