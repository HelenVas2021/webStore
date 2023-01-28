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
    window.scrollTo(0,0);
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
    breadcrumbsTwo.innerHTML = arrCategories[categoryIndex].name;
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
document.getElementById('availabilityBtn').addEventListener('click', () => {
    checkAvailability();
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
function checkAvailability () {
    let btn = document.getElementById('availabilityBtn');
    if (btn.classList.contains('activ_btn_sort')) {
        btn.classList.remove('activ_btn_sort');
        let hiddenCardAvailability = document.getElementsByClassName('notAvailability');
        for (let i = 0; i < hiddenCardAvailability.length; i++) {
            hiddenCardAvailability[i].classList.remove('hidden');
        }
    } else {
        btn.classList.add('activ_btn_sort');
        let notAvailability = document.getElementsByClassName('allProducts-card__notActive');
        for (let i = 0; i < notAvailability.length; i++) {
            notAvailability[i].classList.add('hidden');
            notAvailability[i].classList.add('notAvailability');
        }
    }
}
// картинки категорий на главной странице
document.querySelector('#category_one').addEventListener('click', showProducts);
document.querySelector('#category_two').addEventListener('click', showProducts);
document.querySelector('#category_three').addEventListener('click', showProducts);
document.querySelector('#category_four').addEventListener('click', showProducts);

// фильтры

document.getElementById('buttonSaveFilter_cat').addEventListener('click', getCheckedCheckBoxesCat);
document.getElementById("filters-minPriceBtn_cat").oninput = function () {
    let minPriceSlider = document.getElementById('filters-minPriceBtn_cat');
    let minPriceInput = document.getElementById('filters-minPriceValue_cat');
    minPriceInput.value = minPriceSlider.value;
}
document.getElementById("filters-maxPriceBtn_cat").oninput = function () {
    let minPriceSlider = document.getElementById('filters-maxPriceBtn_cat');
    let minPriceInput = document.getElementById('filters-maxPriceValue_cat');
    minPriceInput.value = minPriceSlider.value;
}

function getCheckedCheckBoxesCat() {
    // убираем сортировку
    removeSort('ascending', 'descending', 'availabilityBtn');
    // находим все товары
    let allProductsArr = document.getElementsByClassName('allProducts-card');
    for (let i = 0; i < allProductsArr.length; i++) {
        allProductsArr[i].classList.remove('selectedColor');
        allProductsArr[i].classList.remove('hiddenAllProducts');
    }
    
    // довляем в массив цвета которые выбрал пользователь
    const checkboxesColor = document.getElementsByClassName('filters-form__color_cat');
    const colorArr = ['Black', 'Silver', 'White', 'Golden', 'Pink', 'Purple', 'Green', 'Gray', 'Blue', 'Yellow', 'Red', 'Chocolate', 'Brown',];
    const countColor = checkboxesColor.length;
    let checkboxesColorChecked = findFilter(checkboxesColor, colorArr, countColor);

    // среди выбраных продуктов выбираем цвет
    let selectedProductsArr = document.getElementsByClassName('showAllProducts');
    for (let i = 0; i < selectedProductsArr.length; i++) {
        for (let j = 0; j < checkboxesColorChecked.length; j++) {
            if (selectedProductsArr[i].classList.contains(checkboxesColorChecked[j])) {
                selectedProductsArr[i].classList.add('selectedColor');
            }
        }
    }
    for (let i = 0; i < selectedProductsArr.length; i++) {
        for (let j = 0; j < checkboxesColorChecked.length; j++) {
            if (!selectedProductsArr[i].classList.contains('selectedColor')) {
                selectedProductsArr[i].classList.add('hiddenAllProducts');
            }
        }
    }
  
// фильтр по мин цене
    let minPriceSlider = document.getElementById('filters-minPriceValue_cat');
    let minPriseArr = [];
    if (minPriceSlider.value != 0) {
        for (let i = 0; i < allProductsArr.length; i++) {
        if (allProductsArr[i].classList.contains('selectedColor')) {
            minPriseArr.push(allProductsArr[i]);
            }
        }        
        for (let i = 0; i < minPriseArr.length; i++) {
            if (Number(minPriseArr[i].childNodes[2].id) < Number(minPriceSlider.value)) {
                minPriseArr[i].classList.add('hiddenAllProducts');
                minPriseArr[i].classList.remove('selectedColor');
            } 
        }
    }
// фильтр по макс цене
    let maxPriceSlider = document.getElementById('filters-maxPriceValue_cat');
    let maxPriseArr = [];
    if (maxPriceSlider.value != 0) {
        console.log(maxPriceSlider.value);
        for (let i = 0; i < allProductsArr.length; i++) {
        if (allProductsArr[i].classList.contains('selectedColor')) {
            maxPriseArr.push(allProductsArr[i]);
            }
        }        
        for (let i = 0; i < maxPriseArr.length; i++) {
            if (Number(maxPriseArr[i].childNodes[2].id) > Number(maxPriceSlider.value)) {
                console.log(maxPriseArr[i].childNodes[2].id);
                maxPriseArr[i].classList.add('hiddenAllProducts');
                maxPriseArr[i].classList.remove('selectedColor');
            } 
        }
    }
}
