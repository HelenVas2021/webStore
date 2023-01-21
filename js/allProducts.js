document.getElementById('allProductBtn').addEventListener('click', showAllProduct)
function showAllProduct() {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('allProductPage').classList.remove('hidden');
    const allProducts = document.getElementById('allProducts');
    let index = 0;
    let availability = 'in stock'
    // тут должна быть функция которая смотрит наличие и соотв. и меняет цвет текста
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].products.length; j++){
            createElement('div', { id: index , className:data[i].name, }, null, null, allProducts);
            let elem = document.getElementById(index);
            elem.classList.add('allProducts-card')
            elem.classList.add('showAllProducts')
            elem.classList.add(data[i].products[j].color)
            createElement('span', { className: 'allProductName'}, null, data[i].products[j].name, elem);
            createElement('img', { src: data[i].products[j].main_images , className: 'allProductImg' }, null, null, elem);
            createElement('span', { className: 'allProductPrice' }, null, `${data[i].products[j].price} $`, elem);
            createElement('span', { className: 'allProductAvailability' }, null, availability, elem);
            createElement('button', { type: 'button', className: 'allProduct_btn'  }, null, 'explore' , elem);
            index++
        }
    }
}

document.getElementById('buttonSaveFilter').addEventListener('click', getCheckedCheckBoxes )
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
    const typeArr = ['PHONES', 'LAPTOPS', 'WATCHES'];
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
    const colorArr = ['Black', 'Silver', 'White', 'Golden', 'Pink', 'Purple', 'Green', 'Gray', 'Blue', 'Yellow','Red', 'Chocolate', 'Brown',];
    const countColor = checkboxesColor.length;
    let checkboxesColorChecked = findFilter(checkboxesColor, colorArr, countColor);

// среди выбраных продуктов выбираем цвет
    let selectedProductsArr = document.getElementsByClassName('showAllProducts')
    for (let i = 0; i<selectedProductsArr.length; i++) {
        for (let j = 0; j<checkboxesColorChecked.length; j++) {
            if (selectedProductsArr[i].classList.contains(checkboxesColorChecked[j])) {
                selectedProductsArr[i].classList.add('selectedColor');
            }
        }
    }
    for (let i = 0; i<selectedProductsArr.length; i++) {
        for (let j = 0; j<checkboxesColorChecked.length; j++) {
            if (!selectedProductsArr[i].classList.contains('selectedColor')) {
                selectedProductsArr[i].classList.add('hiddenAllProducts');
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
    






