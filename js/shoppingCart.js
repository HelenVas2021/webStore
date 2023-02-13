function showShoppingCart() {
    pageCleanup();
    document.getElementById('pageShoppingCart').classList.remove('hidden')
    breadcrumbsCart();
    const orderArr = JSON.parse(localStorage.getItem('orderArr')) || [];
    let orders = document.getElementById('orders')
    let discountIndex = 0;
    orders.innerHTML = '';
    document.getElementById('discount').innerHTML = '';
    for (let i = 0; i < orderArr.length; i++){
        
        let elem = createElement('div', { className: 'cart-table__title' }, null, null, orders);
        let article = createElement('div',{className: "cart-table__order"}, null, null, elem);
        createElement('img', { src: orderArr[i].img }, null, null, article);
        createElement('span',null, null, orderArr[i].name, article);
        createElement('span', {className: "cart-table__inform"}, null, orderArr[i].price + ' UAN', elem);
        let value = createElement(
            'input',
            { className: "cart-table__input", type: 'text', value: orderArr[i].value, 'data-in':i},
            null,
            null,
            elem);
        let sum = createElement('span', { className: "cart-table__inform" }, null, orderArr[i].price*value.value+' UAN', elem);
        value.onchange = function (event) {
            product = event.target.getAttribute('data-in');
            let arr = JSON.parse(localStorage.getItem('orderArr'));
            if (value.value == 0) {
                arr.splice(product, 1);
                localStorage.setItem('orderArr', JSON.stringify(arr));
                discountIndex = 0;
                showShoppingCart();
                price()
            } else {
                sum.innerHTML = orderArr[i].price * value.value + 'UAN';
                arr[product].value = value.value;
                arr[product].sum = orderArr[i].price * value.value
                localStorage.setItem('orderArr', JSON.stringify(arr));
                discountIndex = 0;
                price()
            }
        };
    }
    // total price
    let totalPrice = 0;
    function price() {
        totalPrice = 0;
        let priceArr = JSON.parse(localStorage.getItem('orderArr'));
        for (let i = 0; i < priceArr.length; i++) {
        totalPrice = totalPrice + priceArr[i].sum 
        }
        document.getElementById('totalPrice').innerHTML = totalPrice + ' UAN';
    }
    price()
    // discount
    document.getElementById('chekDiscount').addEventListener('click', chekDiscount)
    function chekDiscount() {
        const discount = document.getElementById('discount');
        if (discountIndex == 0) {
            if (discount.value == 'hillel' || discount.value == 'Hillel' ) {
                let finalPrice = totalPrice * 0.8;
                discountIndex++;
                document.getElementById('totalPrice').innerHTML = finalPrice.toFixed(2) + ' UAN';
            }    
        }  
    }
}

// Хлебные крошки
function breadcrumbsCart() {
    let breadcrumbsOne = document.getElementById('breadcrumbsOneShopping');
    let pagesArr = ['category', 'mainPage', 'oneItem', 'allProductPage', 'oneItem', 'pageShoppingCart']
    breadcrumbsOne.addEventListener('click', () => {
        for (let i = 0; i < pagesArr.length; i++) {
        document.getElementById(pagesArr[i]).classList.add('hidden');
        }
        document.getElementById('mainPage').classList.remove('hidden');
    })
}