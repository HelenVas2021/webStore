document.getElementById('allSaleBtn').addEventListener('click', showAllSaleProduct);
document.getElementById('buttonSaveFilter').addEventListener('click', checkedCheckBoxes);
document.getElementById("filters-minPriceBtn").oninput = function () {
    let minPriceSliderSale = document.getElementById('filters-minPriceBtn');
    let minPriceInputSale = document.getElementById('filters-minPriceValue');
    minPriceInputSale.value = minPriceSliderSale.value;
}
document.getElementById("filters-maxPriceBtn").oninput = function () {
    let minPriceSliderSale = document.getElementById('filters-maxPriceBtn');
    let minPriceInputSale = document.getElementById('filters-maxPriceValue');
    minPriceInputSale.value = minPriceSliderSale.value;
}
const percent = '20%';
function showAllSaleProduct() {
    removeSalesSort('ascendingAllProducts', 'descendingAllProducts');
    document.getElementById('allProducts').textContent = '';
    document.getElementById('allProductPage').classList.remove('hidden');
	document.getElementById('filtersAvailabilityBtn').className="hidden";
	document.getElementById('allProductHeader').className="hidden";
	document.getElementById('saleHeader').classList.remove('hidden');
	document.getElementById('saleHeader').className = 'allProductSalePage-title';
    let pagesArrSale = ['category', 'mainPage', 'oneItem'];
    for (let i = 0; i < pagesArrSale.length; i++) {
        document.getElementById(pagesArrSale[i]).classList.add('hidden');
    }
    const allProductsSale = document.getElementById('allProducts');
    let indexSale = 0;
    let indexParentSale = 0;
    let indexChildSale = 0;
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].products.length; j++){
            if (data[i].products[j].sale === true) {
            createElement('div', { id: `card${indexSale}`, className: data[i].name, 'data-priceAllProducts' : data[i].products[j].price }, null, null, allProductsSale);
            let elemSale = document.getElementById(`card${indexSale}`);
			let elemValueWithSale = Math.round(data[i].products[j].price-(data[i].products[j].price/100*parseFloat(percent))) ;
            elemSale.classList.add('allProducts-card');
            elemSale.classList.add('showAllProducts');
            elemSale.classList.add(data[i].products[j].color);
            createElement('span', { className: 'allProductName'}, null, data[i].products[j].name, elemSale);
            createElement('img', { id: `img${indexSale}`, src: data[i].products[j].main_images , className: 'allProductImg' }, null, null, elemSale);
            createElement('span', {id: data[i].products[j].price , className: 'allSalePrice' }, null, `${data[i].products[j].price}UAH`, elemSale);
			createElement('span', {id: data[i].products[j].price , className: 'discount', id:'discount' }, null, `Discount: ${percent}`, elemSale);
			createElement('span', {id: data[i].products[j].price , className: 'allSaleWithDiscout' }, null, `${elemValueWithSale}UAH`, elemSale);
            createElement('span', { id: `availability${indexSale}`, className: 'allProductAvailability' }, null, null, elemSale);
            createElement('button', { type: 'button', className: 'allProduct_btn', 'data-category':indexParentSale, 'data-product': indexChildSale }, { click: saleShowProductPage}, 'explore', elemSale);
        } 
            indexSale++;
            indexChildSale++;
		}
        indexParentSale++;
        indexChildSale = 0;
		}
}
// убираем сортировку! Передаем Id кнопок 
function removeSalesSort(saleAscending, SaleDescending) {
    let btnSaleAscending = document.getElementById(saleAscending) ;
    let btnSaleDescending = document.getElementById(SaleDescending);
    if (btnSaleAscending.classList.contains('activ_btn_sort')) {
        btnSaleAscending.classList.remove('activ_btn_sort');
    }
    if (btnSaleDescending.classList.contains('activ_btn_sort')) {
        btnSaleDescending.classList.remove('activ_btn_sort');
    }
}
 function checkedCheckBoxes() {
//     // убираем сортировку
    removeSalesSort('ascendingAllProducts', 'descendingAllProducts');
    // находим все товары
    let allSalesArr = document.getElementsByClassName('allSales-card');
    for (let i = 0; i < allSalesArr.length; i++) {
        allSalesArr[i].classList.remove('showAllProducts');
        allSalesArr[i].classList.remove('selectedColor');
        allSalesArr[i].classList.add('hiddenAllProducts');
    }
    // довляем в массив классы которые выбрал пользователь 
    const saleCheckboxes = document.getElementsByClassName('filters-form__input');
    const typeSaleArr = ['PHONES', 'LAPTOPS', 'WATCHES', 'TABLETS'];
    const countSaleType = saleCheckboxes.length;
    let saleCheckboxesChecked = findFilter(saleCheckboxes, typeSaleArr, countSaleType);

    // скрываем или показываем выбраный тип продуктов
    for (let i = 0; i < saleCheckboxesChecked.length; i++) {
        let elemForSale= document.getElementsByClassName(saleCheckboxesChecked[i]);
        for (let j = 0; j < elemForSale.length; j++) {
            elemForSale[j].classList.remove('hiddenAllProducts');
            elemForSale[j].classList.add('showAllProducts');
        }
    }
    // довляем в массив цвета которые выбрал пользователь
    const saleCheckboxesColor = document.getElementsByClassName('filters-form__color');
    const colorArrSale = ['Black', 'Silver', 'White', 'Golden', 'Pink', 'Purple', 'Green', 'Gray', 'Blue', 'Yellow', 'Red', 'Chocolate', 'Brown',];
    const countColorSale = saleCheckboxesColor.length;
    let saleCheckboxesColorChecked = findFilter(saleCheckboxesColor, colorArrSale, countColorSale );

    // среди выбраных продуктов выбираем цвет
    let selectedSalesArr = document.getElementsByClassName('showAllProducts');
    for (let i = 0; i < selectedSalesArr.length; i++) {
        for (let j = 0; j < saleCheckboxesColorChecked.length; j++) {
            if (selectedSalesArr[i].classList.contains(saleCheckboxesColorChecked[j])) {
                selectedSalesArr[i].classList.add('selectedColor');
            }
        }
    }
    for (let i = 0; i < selectedSalesArr.length; i++) {
        for (let j = 0; j < saleCheckboxesColorChecked.length; j++) {
            if (!selectedSalesArr[i].classList.contains('selectedColor')) {
                selectedSalesArr[i].classList.add('hiddenAllProducts');
            }
        }
    }
// фильтр по мин цене
    let minPriceValue = document.getElementById('filters-minPriceValue');
    let minPriseArray = [];
    if (minPriceValue.value != 0) {
        for (let i = 0; i < allSalesArr.length; i++) {
        if (allSalesArr[i].classList.contains('selectedColor')) {
            minPriseArray.push(allSalesArr[i]);
            }
        }        
        for (let i = 0; i < minPriseArray.length; i++) {
            if (Number(minPriseArray[i].childNodes[2].id) < Number(minPriceValue.value)) {
                minPriseArray[i].classList.add('hiddenAllProducts');
                minPriseArray[i].classList.remove('selectedColor');
            } 
        }
    }
// фильтр по макс цене
    let maxPriceValue = document.getElementById('filters-maxPriceValue');
    let maxPriseArray = [];
    if (maxPriceValue.value != 0) {
        console.log(maxPriceValue.value);
        for (let i = 0; i < allSalesArr.length; i++) {
        if (allSalesArr[i].classList.contains('selectedColor')) {
            maxPriseArray.push(allSalesArr[i]);
            }
        }        
        for (let i = 0; i < maxPriseArray.length; i++) {
            if (Number(maxPriseArray[i].childNodes[2].id) > Number(maxPriceValue.value)) {
                console.log(maxPriseArray[i].childNodes[2].id);
                maxPriseArray[i].classList.add('hiddenAllProducts');
                maxPriseArray[i].classList.remove('selectedColor');
            } 
        }
    }
}

let categoryIndexSale = 0;
let productIndexSale = 0;

function saleShowProductPage(event) {
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
    breadcrumbsForSale(categoryIndex, productIndex, pagesArr);
    saleCharacteristic(categoryIndex, productIndex);
    responses(categoryIndex, productIndex);
}

function saleCharacteristic(categoryIndexSale, productIndexSale) {
    let productCharacteristicSale = data[categoryIndexSale].products[productIndexSale];
    const parentSale = document.getElementById('listCharacteristic');
    let elemValueWithSale = Math.round(productCharacteristicSale.price-(productCharacteristicSale.price/100*parseFloat(percent))) ;
    parentSale.innerHTML = '';
    document.getElementById('imgOneItem').setAttribute('src', productCharacteristicSale.main_images);
    document.getElementById('titleOneItem').innerHTML = productCharacteristicSale.name;
    document.getElementById('priceOneItem').innerHTML = elemValueWithSale + ' UAH';
    for (let key in productCharacteristicSale) {
        if(key === 'price'){
            createElement('li', { className: `oneItem-information__feature-li`, }, null, key + ' : ' +elemValueWithSale , parentSale);
            continue;
        }
        if (key !== 'main_images' && key !== 'image_arr' && key !== 'availability') {
            createElement('li', { className: `oneItem-information__feature-li`, }, null, key + ' : ' +productCharacteristicSale[key] , parentSale);
        }
    }
    let imgSale = document.getElementById('oneItemImg')
    createElement('div', { id: 'allPhoto' }, null, null, imgSale);
    let allPhotoSale = document.getElementById('allPhoto')
    allPhotoSale.innerHTML = '';
    let allPhotoArrSale = productCharacteristicSale.image_arr;
    let indexPhotoSale = 0;
    for (let i = 0; i < allPhotoArrSale.length; i++) {
        createElement('img', { className: `oneItem__allPhoto`,'data-photo': indexPhotoSale, src: allPhotoArrSale[i] },  { click: miniPhotoShowSale }, null, allPhotoSale);
        indexPhotoSale++
    }
    function miniPhotoShowSale(event) {
        const miniPhotoIndexSale = event.target.getAttribute('data-photo');
        document.getElementById('imgOneItem'). setAttribute('src', data[categoryIndex].products[productIndex].image_arr[miniPhotoIndexSale])
    }
}

function breadcrumbsForSale(categoryIndex, productIndex, pagesArr) {
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
    breadcrumbsTwo.addEventListener('click', showAllSaleProduct);
    let breadcrumbsThree = document.getElementById('breadcrumbsThree');
    breadcrumbsThree.innerHTML = data[categoryIndex].products[productIndex].name;
}

