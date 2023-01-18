let a = JSON.stringify(data);
let arrCategories = JSON.parse(a);


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
    const categoryIndex = event.target.getAttribute('data-category');
    const products = data[categoryIndex].products;
    const containerProduct = document.querySelector('.categories_card');
    containerProduct.innerHTML = '';
    
    for(let i = 0; i < products.length; i++) {
        const elem = createElement(
            'div', 
            {'data-product': i, 'className': 'product', 'data-category': categoryIndex}, 
            {click: showDetails}, 
            null,
            containerProduct);
            elem.innerHTML= `
                             <p><b>Name:</b> ${products[i].name}
                             </p><p><b>Price:</b> ${products[i].price}</p>`
      }
  }
  function showDetails() {

  }

// <div><img src="${products[i].main_images}"></div>