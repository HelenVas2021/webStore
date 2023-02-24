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
    const containerCategoriesFooter = document.querySelector('.fooret_list');
    for (let i = 0; i < arrCategories.length; i++) {
        const elem = createElement(
            'li', 
            {'data-category': i}, 
            {click: showProducts}, 
            arrCategories[i].name, 
            containerCategoriesFooter);
      }
    const containerFooterListAbout = document.querySelector('._about');
    createElement('li', null, {click: showAbout}, 'ABOUT', containerFooterListAbout);
    createElement('li', null, {click: showContacts}, 'CONTACTS', containerFooterListAbout);

}
function showAbout() {
    window.scrollTo(0,0);
    pageCleanup()
    about.classList.remove('hidden');
}
function showContacts() {
    window.scrollTo(0,0);
    pageCleanup()
    contacts.classList.remove('hidden');
}

showCategories();
// взаимодеймтвие с категориями
function showProducts(event) {
    window.scrollTo(0,0);
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
    categoryBlock.classList.remove('hidden');
    showFiltersCat();

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
        let discount = products[i].discount;
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
            if(products[i].sale === true) {
                let newPrice = Math.round(products[i].price - (products[i].price * discount/100));
                let img_sale = createElement('span', { className: 'img_sale' }, null, null, elem);
                img_sale.innerHTML = `<svg id="sale_img"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                      <span class="text_sale">-${discount}%</span>`;
                createElement('span', { id: newPrice, className: 'allProductPrice _mod_discount' }, null, `${newPrice} UAH`, elem);
            } else {
                createElement('span', { id: products[i].price, className: 'allProductPrice' }, null, `${products[i].price} UAH`, elem);
            }
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
document.getElementById('availabilityBtn_cat').addEventListener('click', () => {
    checkAvailabilityCat();
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

function checkAvailabilityCat () {
    let btn = document.getElementById('availabilityBtn_cat');
    if (btn.classList.contains('activ_btn_sort')) {
        btn.classList.remove('activ_btn_sort');
        let hiddenCardAvailability = document.getElementsByClassName('notAvailability');
        for (let i = 0; i < hiddenCardAvailability.length; i++) {
            hiddenCardAvailability[i].classList.remove('hiddenAllProducts');
        }
    } else {
        btn.classList.add('activ_btn_sort');
        let notAvailability = document.getElementsByClassName('allProducts-card__notActive');
        for (let i = 0; i < notAvailability.length; i++) {
            notAvailability[i].classList.add('hiddenAllProducts');
            notAvailability[i].classList.add('notAvailability');
        }
    }
}

//фильтры
function showFiltersCat() {
    const fieldsetColor = document.getElementById('fieldsetColor_cat');
    fieldsetColor.innerHTML = '';
    const colorArr = ['Black', 'Silver', 'White', 'Gold', 'Pink', 'Purple', 'Green', 'Gray', 'Blue', 'Yellow', 'Red', 'Chocolate', 'Brown', 'All_Color'];
     for (let i = 0; i < colorArr.length; i++) {
        let label = createElement('label', { className: 'filters-form__label' }, null, colorArr[i], fieldsetColor);
        createElement(
            'input',
            { className: 'filters-form__color', name: "colorProduct", type:"checkbox", value: colorArr[i]},
            null,
            null,
            label
        );
    }
}

// картинки категорий на главной странице
document.querySelector('#category_one').addEventListener('click', showProducts);
document.querySelector('#category_two').addEventListener('click', showProducts);
document.querySelector('#category_three').addEventListener('click', showProducts);
document.querySelector('#category_four').addEventListener('click', showProducts);

document.querySelector('#slider_btn').addEventListener('click', showProducts);
document.querySelector('#btn_main_watch').addEventListener('click', showProducts);
document.querySelector('#btn_main_phone').addEventListener('click', showProducts);
document.querySelector('#btn_main_laptop').addEventListener('click', showProducts);


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
    removeSort('ascending', 'descending', 'availabilityBtn_cat');
    // находим все товары
    let allProductsArr = document.getElementsByClassName('allProducts-card');
    for (let i = 0; i < allProductsArr.length; i++) {
        allProductsArr[i].classList.remove('selectedColor');
        allProductsArr[i].classList.remove('hiddenAllProducts');
    }
    
    // довляем в массив цвета которые выбрал пользователь
    const checkboxesColor = document.getElementsByClassName('filters-form__color');
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


//показать карточки товаров с акциями на главной странице

function showCardDiscount() {

    let arrCardWithDiscount = [];
    for (let key in arrCategories) {
        const productsName = arrCategories[key].products;
        for(let i=0; i < productsName.length; i++) {
            if(productsName[i].sale === true) {
                productsName[i].category = key;
                productsName[i].productId = i;
                arrCardWithDiscount.push(productsName[i]);
            }
        }
    }
    let arrNumber = [];
    while (arrNumber.length < 4) {
        const randomNumber = Math.ceil(Math.random() * arrCardWithDiscount.length-1);
        if(!arrNumber.includes(randomNumber)) {
            arrNumber.push(randomNumber);
        }
    }
    for(let i=0; i < arrNumber.length; i++) { 
        let discount = arrCardWithDiscount[arrNumber[i]].discount;
        let newPrice = Math.round(arrCardWithDiscount[arrNumber[i]].price - (arrCardWithDiscount[arrNumber[i]].price * discount/100));
        const parent = document.querySelector('.cards');
        const elem = createElement('div', { className: 'prodact_card_mod', 'data-category': arrCardWithDiscount[arrNumber[i]].category, 'data-product': arrCardWithDiscount[arrNumber[i]].productId}, { click: showProductPage }, null, parent);
        const parentImg = createElement('div', { className: 'prodact_img'}, null, null, elem);
        createElement('img', { alt: `${arrCardWithDiscount[arrNumber[i]].name}`, 'data-category': arrCardWithDiscount[arrNumber[i]].category, 'data-product': arrCardWithDiscount[arrNumber[i]].productId, src: `${arrCardWithDiscount[arrNumber[i]].main_images}` }, null, null, parentImg);
        const parentText = createElement('div', { className: 'prodact_text'}, null, null, elem);
        createElement('p', { className: 'prodact_name', 'data-category': arrCardWithDiscount[arrNumber[i]].category, 'data-product': arrCardWithDiscount[arrNumber[i]].productId}, null, arrCardWithDiscount[arrNumber[i]].name, parentText);
        createElement('p', { className: 'prodact_about', 'data-category': arrCardWithDiscount[arrNumber[i]].category, 'data-product': arrCardWithDiscount[arrNumber[i]].productId}, null, `Color: ${arrCardWithDiscount[arrNumber[i]].color}, Processor: ${arrCardWithDiscount[arrNumber[i]].processor}, Memory: ${arrCardWithDiscount[arrNumber[i]].memory}`, parentText);
        createElement('p', { className: 'prodact_price', 'data-category': arrCardWithDiscount[arrNumber[i]].category, 'data-product': arrCardWithDiscount[arrNumber[i]].productId}, null, `${newPrice} UAH`, parentText);
    }
}
showCardDiscount();


