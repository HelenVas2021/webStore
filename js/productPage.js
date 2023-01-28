
function showProductPage(event) {
    window.scrollTo(0,0);
    let pagesArr = ['category', 'mainPage', 'oneItem', 'allProductPage']
    for (let i = 0; i < pagesArr.length; i++) {
        document.getElementById(pagesArr[i]).classList.add('hidden');
    }
    document.getElementById('oneItem').classList.remove('hidden');
    const categoryIndex = event.target.getAttribute('data-category');
    const productIndex = event.target.getAttribute('data-product');

    breadcrumbs(categoryIndex, productIndex, pagesArr)
    characteristic(categoryIndex, productIndex);
    responses();

    
   
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
    breadcrumbsTwo.setAttribute('data-category', categoryIndex)
    breadcrumbsTwo.addEventListener('click', showProducts)
    let breadcrumbsThree = document.getElementById('breadcrumbsThree');
    breadcrumbsThree.innerHTML = data[categoryIndex].products[productIndex].name;
}
 // Блок характеристик 
function characteristic(categoryIndex, productIndex) {
    let productCharacteristic = data[categoryIndex].products[productIndex];
    const parent = document.getElementById('listCharacteristic')
    parent.innerHTML = '';
    document.getElementById('imgOneItem').setAttribute('src', productCharacteristic.main_images)
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
    const responseList = document.getElementById('response-list');
    const response = document.getElementById('response');
    const activeProduct = 'Sweet_Shot';
    // activeProduct для примера, нужно будет изменить
    let counter = 0;
    let ratingProductAmount = 0;
    for (let i = 0; i < responsive.length; i++) {
        if (responsive[i].product == activeProduct) {
            counter++;
            ratingProductAmount += Number(responsive[i].rating);
            let oneResponse = createElement('div', { id: `responsive${i}`, className:'oneResponsive'}, null, null, responseList);
            createElement('p', { id: `responsiveName`, }, null, responsive[i].name, oneResponse);
            createElement('p', { id: `responsiveDate`, }, null, responsive[i].orderDate, oneResponse);
            createElement('p', { id: `responsiveRating` }, null, `${responsive[i].rating}/10`, oneResponse);
            createElement('p', { id: `responsiveContent` }, null, responsive[i].content, oneResponse);
        }
    }
    let ratingProduct = ratingProductAmount / counter;
    createElement('p', { id: `rating` }, null, `Average rating: ${ratingProduct}/10`, response);
}  














