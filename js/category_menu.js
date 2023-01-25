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
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
    categoryBlock.classList.remove('hidden');

    const categoryIndex = event.target.getAttribute('data-category');
    const products = arrCategories[categoryIndex].products;
    const containerProduct = document.querySelector('.categories_card');
    containerProduct.innerHTML = '';
    
    let availability;
    for(let i = 0; i < products.length; i++) {
        if (products[i].availability === 0) {
            availability = 'is expected';
        } else {
            availability = 'on sale';
        }
        const elem = createElement(
            'div', 
            {'id': i, 'className': arrCategories[categoryIndex].name + ' allProducts-card _mod_size', 'data-category': categoryIndex, 'data-price': products[i].price}, 
            null, 
            null,
            containerProduct);
            elem.classList.add('allProducts-card');
            elem.classList.add('showAllProducts');
            elem.classList.add(products[i].color);
            createElement('span', { className: 'allProductName'}, null, products[i].name, elem);
            createElement('img', { src: `${products[i].main_images}`, className: 'allProductImg' }, null, null, elem);
            createElement('span', { id: products[i].price, className: 'allProductPrice' }, null, `${products[i].price} UAN`, elem);
            createElement('span', { id: `availability${i}`, className: 'allProductAvailability' }, null, availability, elem);
            createElement('button', { type: 'button', className: 'allProduct_btn', 'data-category': categoryIndex, 'data-product': i}, { click: showProductPage }, 'explore' , elem);
            let card = document.getElementById(i);
            if (availability === 'is expected') {  
                let elem = document.getElementById(`availability${i}`);
                elem.classList.add('filter-notAviability');
                card.classList.add('allProducts-card__notActive');
            }
      }
      breadcrumbsCategory(categoryIndex, pageArr);
  }
  // Хлебные крошки
function breadcrumbsCategory(categoryIndex, pagesArr) {
    let breadcrumbsOne = document.getElementById('breadcrumbsOne_cat');
    breadcrumbsOne.addEventListener('click', () => {
        for (let i = 0; i < pagesArr.length; i++) {
        document.getElementById(pagesArr[i]).classList.add('hidden');
        }
        document.getElementById('mainPage').classList.remove('hidden');
    })
    let breadcrumbsTwo = document.getElementById('breadcrumbsTwo_cat');
    breadcrumbsTwo.innerHTML = data[categoryIndex].name;
    breadcrumbsTwo.setAttribute('data-category', categoryIndex)
    breadcrumbsTwo.addEventListener('click', showProducts);
}

// сортировка
document.getElementById('ascending').addEventListener('click', () => {
    sortAscending ('data-price');
    document.getElementById('ascending').classList.add('activ_btn_sort');
    document.getElementById('descending').classList.remove('activ_btn_sort');
});
document.getElementById('descending').addEventListener('click', () => {
    sortDescending('data-price');
    document.getElementById('descending').classList.add('activ_btn_sort');
    document.getElementById('ascending').classList.remove('activ_btn_sort');
});
function sortAscending(sortType) {
    let parent = document.querySelector('.categories_card');
    for(let i = 0; i < parent.children.length; i++) {
        for(let j = i; j < parent.children.length; j++) {
            if (+parent.children[i].getAttribute(sortType) > +parent.children[j].getAttribute(sortType)) {
                replaceNode = parent.replaceChild(parent.children[j], parent.children[i]);
                insertAfter(replaceNode, parent.children[i]);
            }
        }
    }
}
function sortDescending(sortType) {
    let parent = document.querySelector('.categories_card');
    for(let i = 0; i < parent.children.length; i++) {
        for(let j = i; j < parent.children.length; j++) {
            if (+parent.children[i].getAttribute(sortType) < +parent.children[j].getAttribute(sortType)) {
                replaceNode = parent.replaceChild(parent.children[j], parent.children[i]);
                insertAfter(replaceNode, parent.children[i]);
            }
        }
    }
}
function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}


