document.getElementById('allProductBtn').addEventListener('click', showAllProduct)

function showAllProduct() {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('allProductPage').classList.remove('hidden');
    const allProducts = document.getElementById('allProducts');
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].products.length; j++){
            index++
            createElement('div', { id: index , className: data[i].name, }, null, null, allProducts);
            let elem = document.getElementById(index);
            createElement('span', { className: 'allProductName'}, null, data[i].products[j].name, elem);
            createElement('span', { className: 'allProductPrice' }, null, `${data[i].products[j].price} $`, elem);
            createElement('img', { src: `images/${data[i].name}/${data[i].products[j].img}` }, null, null, elem);
        }
    }
}
