let categoryIndex = 0;
let productIndex = 0;
let countProduct = 0;


function showProductPage(event) {
    window.scrollTo(0,0);
    let pagesArr = ['category', 'mainPage', 'oneItem', 'allProductPage'];
    pageCleanup()
    document.getElementById('oneItem').classList.remove('hidden');
    document.getElementById('response-list').innerHTML = '';
    categoryIndex = event.target.getAttribute('data-category');
    productIndex = event.target.getAttribute('data-product');
    let button = document.getElementById('addToShoppingCart');
    button.removeEventListener('click', addToShoppingCart);
    let oneProduct = data[categoryIndex].products[productIndex];
    if (oneProduct.availability === 0) {
        button.classList.add('notButton');
        button.classList.remove('button');
        button.innerHTML='is expected'
    } else {
        button.addEventListener('click', addToShoppingCart);
        button.classList.add('button');
        button.classList.remove('notButton');
        button.innerHTML='Buy'
    }
    breadcrumbs(categoryIndex, productIndex, pagesArr);
    characteristic(categoryIndex, productIndex);
    responses(categoryIndex, productIndex);
}

function addToShoppingCart() {
    const product = data[categoryIndex].products[productIndex];
    const value = document.getElementById('numberOfGoods').value;
    let price;
    if (product.sale === true) {
        let discount = product.discount;
        price = Math.round(product.price - (product.price * discount / 100));
    } else {
        price = product.price;
    }
    const order = {
        img: product.main_images,
        name: product.name,
        price: price,
        value: Number(value),
        sum: value*product.price,
    }
    const orderArr = JSON.parse(localStorage.getItem('orderArr')) || [];
    let indexProduct = undefined;
    
    if (orderArr.length === 0) {
        orderArr.push(order);
    } else {
        orderArr.forEach(function (product, i, orderArr) {
        if (product.name === order.name) {
            indexProduct = i;
        }
        })
    }
    if (indexProduct == undefined) {
        if (countProduct !== 0) {
            orderArr.push(order);
        }
    } else {
        orderArr[indexProduct].value += 1;
        orderArr[indexProduct].sum = orderArr[indexProduct].value * orderArr[indexProduct].price;
    }
    countProduct++;
    localStorage.setItem('orderArr', JSON.stringify(orderArr));
    showShoppingCart();
    }
// Хлебные крошки
function breadcrumbs(categoryIndex, productIndex, pagesArr) {
    let breadcrumbsOne = document.getElementById('breadcrumbsOne');
    breadcrumbsOne.addEventListener('click', () => {
        for (let i = 0; i < pagesArr.length; i++) {
        document.getElementById(pagesArr[i]).classList.add('hidden');
        }
        document.getElementById('mainPage').classList.remove('hidden');
    })
    let breadcrumbsTwo = document.getElementById('breadcrumbsTwo');
    breadcrumbsTwo.innerHTML = data[categoryIndex].name;
    breadcrumbsTwo.setAttribute('data-category', categoryIndex);
    breadcrumbsTwo.addEventListener('click', showProducts);
    let breadcrumbsThree = document.getElementById('breadcrumbsThree');
    breadcrumbsThree.innerHTML = data[categoryIndex].products[productIndex].name;
}
 // Блок характеристик 
function characteristic(categoryIndex, productIndex) {
    let productCharacteristic = data[categoryIndex].products[productIndex];
    let discount = productCharacteristic.discount;
    let priceParrent = document.getElementById('priceSpan')
    priceParrent.innerHTML = '';
    const parent = document.getElementById('listCharacteristic');
    parent.innerHTML = '';
    document.getElementById('imgOneItem').setAttribute('src', productCharacteristic.main_images);
    document.getElementById('titleOneItem').innerHTML = productCharacteristic.name;
    let price = document.getElementById('priceOneItem');
    if (price.classList.contains('oneItem-price__sale')) {
        price.classList.remove('oneItem-price__sale')
    }
    if (productCharacteristic.sale != true) {
        price.innerHTML = productCharacteristic.price + ' UAH';
    } else {
        let newPrice = Math.round(productCharacteristic.price - (productCharacteristic.price * discount / 100));
        price.innerHTML = productCharacteristic.price + ' UAH';
        price.classList.add('oneItem-price__sale')
        createElement('p', { className: 'oneItem__sale' }, null, newPrice + 'UAH', priceParrent);
    } 
    for (let key in productCharacteristic) {
        if (key !== 'main_images' && key !== 'image_arr' && key !== 'availability' && key !== 'sale' && key !== 'discount') {
            createElement('li', { className: `oneItem-information__feature-li`, }, null, key + ' : ' +productCharacteristic[key] , parent);
        }
    }
    let img = document.getElementById('oneItemImg')
    createElement('div', { id: 'allPhoto' }, null, null, img);
    let allPhoto = document.getElementById('allPhoto')
    allPhoto.innerHTML = '';
    let allPhotoArr = productCharacteristic.image_arr;
    let indexPhoto = 0;
    for (let i = 0; i < allPhotoArr.length; i++) {
        createElement('img', { className: `oneItem__allPhoto`,'data-photo': indexPhoto, src: allPhotoArr[i] },  { click: miniPhotoShow }, null, allPhoto);
        indexPhoto++
    }
    function miniPhotoShow(event) {
        const miniPhotoIndex = event.target.getAttribute('data-photo');
        document.getElementById('imgOneItem'). setAttribute('src', data[categoryIndex].products[productIndex].image_arr[miniPhotoIndex])
    }
}
// Блок с отзывами
function responses() {
    const parrentResponse = document.getElementById('response-list');
    parrentResponse.innerHTML = '';
    const ratingDiv = document.getElementsByClassName('oneItem-informationdiv');
    const product = data[categoryIndex].products[productIndex];
    const activeProduct = product.name;
    const responseArr = JSON.parse(localStorage.getItem(activeProduct)) || [];
    document.getElementById('responseBtn').addEventListener('click', saveResponse);
    let title = document.getElementsByClassName('oneItem-title');
    let counter = 0;
    let ratingProductAmount = 0;
    for (let i = 0; i < responseArr.length; i++) {
        counter++;
        ratingProductAmount += Number(responseArr[i].rating);
        let oneResponse = createElement('div', { id: `responsive${i}`, className:'oneResponsive'}, null, null, parrentResponse);
        createElement('p', { id: `responsiveName`, }, null, responseArr[i].name, oneResponse);
        createElement('p', { id: `responsiveDate`, }, null, responseArr[i].data, oneResponse);
        createElement('p', { id: `responsiveRating` }, null, `${responseArr[i].rating}/10`, oneResponse);
        createElement('p', { id: `responsiveContent` }, null, responseArr[i].review, oneResponse);
    }
    if (counter == 0) {
        title[1].textContent = 'oops, there are no reviews...';
        title[1].classList.add('notResponse');
    } else {
        title[1].textContent = 'Reviews:';
        title[1].classList.remove('notResponse');
        title[1].classList.add('oneItem-title');
    }
    let ratingProduct = ratingProductAmount / counter;
    let result = ratingProduct.toFixed(2);
    createElement('p', { id: `rating` }, null, null, ratingDiv[0]);
    if (counter > 0) {
        document.getElementById('rating').innerHTML = `Average rating: ${result}/10`;
    } else {
        document.getElementById('rating').innerHTML = '';
    }
    function saveResponse() {
        document.getElementById('modal').classList.remove('modal-hidden');
        document.getElementById('saveReviewBtn').addEventListener('click', saveReviewValidator);
        document.getElementById('closeModal').addEventListener('click', closeModal);
    }
    function saveReviewValidator() {
        const name = validName();
        const rating = validRating();
        const dataResponse = new Date();
        const product = data[categoryIndex].products[productIndex].name;
        const review = document.getElementById('reviewForm').value;
        if (name && rating) {
            let oneResponse = {
                name: name,
                rating: rating,
                review: review,
                data: `${dataResponse.getDate()}.${dataResponse.getMonth() + 1}.${dataResponse.getFullYear()}`,
            }
            responseArr.push(oneResponse);
            localStorage.setItem(product, JSON.stringify(responseArr));
            document.getElementById('response-list').innerHTML = '';
            responses();
            closeModal();
        }
    } 
}
function validName() {
    const name = document.getElementById('nameForm').value;
    const pattern = /([a-zA-Z]{1,}\s[a-zA-Z]{1,}|[a-zA-Z]{1,})/;
    const result = name.match(pattern);
    if (result) {
        return result[0];
    } else {
        name.innerHTML ='';
        document.getElementById('nameForm').placeholder = 'error';
    }
}
function validRating() {
    const rating = document.getElementById('ratingForm');
    if (!rating.value || rating.value > 10) {
        rating.innerHTML = '';
        rating.placeholder = 'error';
    } else {
        return rating.value;
    }
}
function closeModal() {
    document.getElementById('modal').classList.add('modal-hidden');
}
