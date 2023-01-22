document.getElementById('allProductBtn').addEventListener('click', showAllProduct)
document.getElementById('buttonSaveFilter').addEventListener('click', getCheckedCheckBoxes )
document.getElementById("filters-minPriceBtn").oninput = function () {
    let minPriceSlider = document.getElementById('filters-minPriceBtn');
    let minPriceInput = document.getElementById('filters-minPriceValue');
    minPriceInput.value = minPriceSlider.value
}
document.getElementById("filters-maxPriceBtn").oninput = function () {
    let minPriceSlider = document.getElementById('filters-maxPriceBtn');
    let minPriceInput = document.getElementById('filters-maxPriceValue');
    minPriceInput.value = minPriceSlider.value
}

function showAllProduct() {
    document.getElementById('allProducts').textContent = '';
    document.getElementById('allProductPage').classList.remove('hidden');
    let pagesArr = ['category', 'mainPage']
    for (let i = 0; i < pagesArr.length; i++) {
        document.getElementById(pagesArr[i]).classList.add('hidden');
    }
    const allProducts = document.getElementById('allProducts');
    let index = 0;
    let availability;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].products.length; j++){
            if (data[i].products[j].availability === 0) {
                availability = 'is expected';
            } else {
                availability = 'on sale'
            }
            createElement('div', { id: index , className:data[i].name, }, null, null, allProducts);
            let elem = document.getElementById(index);
            elem.classList.add('allProducts-card')
            elem.classList.add('showAllProducts')
            elem.classList.add(data[i].products[j].color)
            createElement('span', { className: 'allProductName'}, null, data[i].products[j].name, elem);
            createElement('img', { id: `img${index}`, src: data[i].products[j].main_images , className: 'allProductImg' }, null, null, elem);
            createElement('span', {id: data[i].products[j].price , className: 'allProductPrice' }, null, `${data[i].products[j].price} UAH`, elem);
            createElement('span', { id: `availability${index}`, className: 'allProductAvailability' }, null, availability, elem);
            createElement('button', { type: 'button', className: 'allProduct_btn' }, null, 'explore', elem);
            let card = document.getElementById(index);
            if (availability === 'is expected') {  
                let elem = document.getElementById(`availability${index}`);
                elem.classList.add('filter-notAviability');
                card.classList.add('allProducts-card__notActive')
            }
            index++
        }
    }
}
function getCheckedCheckBoxes() {
    // находим все товары
    let allProductsArr = document.getElementsByClassName('allProducts-card')
    for (let i = 0; i < allProductsArr.length; i++) {
        allProductsArr[i].classList.remove('showAllProducts');
        allProductsArr[i].classList.remove('selectedColor');
        allProductsArr[i].classList.add('hiddenAllProducts');
    }
    // довляем в массив классы которые выбрал пользователь 
    const checkboxes = document.getElementsByClassName('filters-form__input');
    const typeArr = ['PHONES', 'LAPTOPS', 'WATCHES', 'TABLETS'];
    const countType = checkboxes.length;
    let checkboxesChecked = findFilter(checkboxes, typeArr, countType);

    // скрываем или показываем выбраный тип продуктов
    for (let i = 0; i < checkboxesChecked.length; i++) {
        let elem = document.getElementsByClassName(checkboxesChecked[i]);
        for (let j = 0; j < elem.length; j++) {
            elem[j].classList.remove('hiddenAllProducts')
            elem[j].classList.add('showAllProducts')
        }
    }
    // довляем в массив цвета которые выбрал пользователь
    const checkboxesColor = document.getElementsByClassName('filters-form__color');
    const colorArr = ['Black', 'Silver', 'White', 'Golden', 'Pink', 'Purple', 'Green', 'Gray', 'Blue', 'Yellow', 'Red', 'Chocolate', 'Brown',];
    const countColor = checkboxesColor.length;
    let checkboxesColorChecked = findFilter(checkboxesColor, colorArr, countColor);

    // среди выбраных продуктов выбираем цвет
    let selectedProductsArr = document.getElementsByClassName('showAllProducts')
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
    let minPriceSlider = document.getElementById('filters-minPriceValue');
    let minPriseArr = [];
    if (minPriceSlider.value != 0) {
        for (let i = 0; i < allProductsArr.length; i++) {
        if (allProductsArr[i].classList.contains('selectedColor')) {
            minPriseArr.push(allProductsArr[i])
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
    let maxPriceSlider = document.getElementById('filters-maxPriceValue');
    let maxPriseArr = [];
    if (maxPriceSlider.value != 0) {
        console.log(maxPriceSlider.value)
        for (let i = 0; i < allProductsArr.length; i++) {
        if (allProductsArr[i].classList.contains('selectedColor')) {
            maxPriseArr.push(allProductsArr[i])
            }
        }        
        for (let i = 0; i < maxPriseArr.length; i++) {
            if (Number(maxPriseArr[i].childNodes[2].id) > Number(maxPriceSlider.value)) {
                console.log(maxPriseArr[i].childNodes[2].id)
                maxPriseArr[i].classList.add('hiddenAllProducts');
                maxPriseArr[i].classList.remove('selectedColor');
            } 
        }
    }
}
function findFilter(inputArr, filterArr, count) {
    let countType = 0;
        let selectedFilter = []
        for (let i = 0; i < inputArr.length; i++) {
            if (inputArr[i].checked) {
                if (inputArr[i].value == 'ALL'|| inputArr[i].value == 'ALLColor' ) {
                    for (let i = 0; i < filterArr.length; i++) {
                        selectedFilter.push(filterArr[i]);
                    }
                } else {
                    selectedFilter.push(inputArr[i].value);
                } 
            } else {
                countType++
            }
        }
        if (countType === count) {
            selectedFilter = filterArr;
        }
        return selectedFilter
}
    






