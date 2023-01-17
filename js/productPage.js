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
responses()

// Блок характеристик 
function characteristic() {
    let productCharacteristic = data[0].products[0];
    // productCharacteristic для примера, нужно будет изменить
    console.log(productCharacteristic.name)
    const parent = document.getElementById('listCharacteristic')
    for (let key in productCharacteristic) {
        createElement('li', { className: `oneItem-information__feature-li`, }, null, key + ' : ' +productCharacteristic[key] , parent);
    }
}
characteristic()




