let categoryIndex = 0;
let productIndex = 0;

function showProductPage(event) {
    window.scrollTo(0,0);
    let pagesArr = ['category', 'mainPage', 'oneItem', 'allProductPage'];
    for (let i = 0; i < pagesArr.length; i++) {
        document.getElementById(pagesArr[i]).classList.add('hidden');
    }
    document.getElementById('oneItem').classList.remove('hidden');
    document.getElementById('response-list').innerHTML = '';
    categoryIndex = event.target.getAttribute('data-category');
    productIndex = event.target.getAttribute('data-product');
    let button = document.getElementById('addToShoppingCart');
    button.addEventListener('click', addToShoppingCart);
    breadcrumbs(categoryIndex, productIndex, pagesArr);
    characteristic(categoryIndex, productIndex);
    responses(categoryIndex, productIndex);
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
    const parent = document.getElementById('listCharacteristic');
    parent.innerHTML = '';
    document.getElementById('imgOneItem').setAttribute('src', productCharacteristic.main_images);
    document.getElementById('titleOneItem').innerHTML = productCharacteristic.name;
    document.getElementById('priceOneItem').innerHTML = productCharacteristic.price + ' UAH';
    for (let key in productCharacteristic) {
        if (key !== 'main_images' && key !== 'image_arr' && key !== 'availability') {
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
// <!-- модальное с отзывом -->
//         <div class="modal modal-hidden" id="modal">
//             <div class="contacts-block_form content" >
//                 <button type="button" class="close-button" id="closeModal">&#215;</button>
//                 <form action="#" method="get">
//                     <h2>Write your review</h2>
//                     <p><input type="text" id="nameForm" name="name" placeholder="Name"></p>
//                     <p><input type="number" id="ratingForm" name="rating" placeholder="Rating(0-10)*" max="10"></p>
//                     <p><input type="text" id="reviewForm" name="review" placeholder="Your review"></p>
//                     <button type="button" class="moodalBtn_save" id="saveReviewBtn">Save feedback</button>
//                 </form>
//             </div>
//         </div>







