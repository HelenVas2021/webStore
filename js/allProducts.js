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
            createElement('span', { className: 'allProductName'}, null, data[i].products[j].name, elem);
            createElement('img', { src: `images/${data[i].name}/${data[i].products[j].img}`, className: 'allProductImg' }, null, null, elem);
            createElement('span', { className: 'allProductPrice' }, null, `${data[i].products[j].price} $`, elem);
            createElement('span', { className: 'allProductAvailability' }, null, availability, elem);
            createElement('button', { type: 'button', className: 'allProduct_btn'  }, null, 'explore' , elem);
            index++
        }
    }
}
