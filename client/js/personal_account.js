let arrOrdersPersonalPage = [];
getDataOrderArr();
async function getDataOrderArr() {
    await fetch(API_ORDERS_LIST)
        .then(res => res.json())
        .then(orders => {
            arrOrdersPersonalPage = orders;
        })
        initialOrders();
}

localStorage.setItem('client', JSON.stringify(client));
let clientInfoPage = JSON.parse(localStorage.getItem('client'));


function initialOrders() {
    const parentListPerson = document.querySelector('.person_info_block');
    const parentListOrder = document.querySelector('.orders_block');
    
    for (const key in clientInfoPage) {      
        createElement('div', { className: 'person_info'}, null, `Name: ${client[key].name}`, parentListPerson);
        createElement('div', { className: 'person_info'}, null, `Email: ${client[key].email}`, parentListPerson);
        createElement('div', { className: 'person_info'}, null, `Phone number: ${client[key].phone}`, parentListPerson);
    }

    for (let i=0; i < arrOrdersPersonalPage.length; i++){
            const parent = createElement('div', { className: 'orders_block_info'}, null, null, parentListOrder);
            createElement('div', { className: 'order_info'}, null, ` Order # ${arrOrdersPersonalPage[i].order_number}`, parent);
            createElement('div', { className: 'order_info'}, null, ` From ${arrOrdersPersonalPage[i].dateOrder}`, parent);
            createElement('div', { className: 'order_info _cost'}, null, ` Total cost: ${arrOrdersPersonalPage[i].totalCost} UAH`, parent);
            createElement('div', { className: 'order_done'}, null, 'DONE', parent);

            const btn_delete = createElement('div', { className: 'btn_delete', 'data-delete': `${arrOrdersPersonalPage[i].id_order}`,'data-info': i}, {click: deleteOrder},null, parent);
            btn_delete.innerHTML = `<svg data-delete: ${arrOrdersPersonalPage[i].id_order} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>`
            const img = createElement('div', { 'data-orderInfo': arrOrdersPersonalPage[i].order_number , className: 'order_svg', id:`${arrOrdersPersonalPage[i].id_order}`}, {click: showProductsOrder}, null, parent);
            img.innerHTML = `<svg id=${arrOrdersPersonalPage[i].id_order} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`;
            createElement('div', { className: 'orders_block_info_product', id :arrOrdersPersonalPage[i].order_number}, null, null, parent);
        }
    }

function showProductsOrder(event) {
    const categoryId = event.target.getAttribute('id');
    const list = document.getElementById(categoryId);
    if(list !== null) {
    if (!list.classList.contains('open_list')) {
        event.target.innerHTML = `<svg id="clear_order" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>`;
        for (let i = 0; i < arrOrdersPersonalPage.length; i++) {
            if (arrOrdersPersonalPage[i].id_order === categoryId) {
                const parent = document.getElementById(arrOrdersPersonalPage[i].order_number);
                parent.innerHTML = '';
               for (let j = 0; j < arrOrdersPersonalPage[i].products.length; j++) {
                let product = arrOrdersPersonalPage[i].products[j];
                let detProd = createElement('div', { className: 'order_product'}, {click: showDetailsOrder}, null, parent);
                detProd.innerHTML = `<div>Product #${j+1} <span class="product_det" id=${arrOrdersPersonalPage[i].products[j].id_product}>${product.name}</span></div>`;
                }
                for (let j = 0; j < arrOrdersPersonalPage[i].contacts.length; j++) {
                    let contacts = arrOrdersPersonalPage[i].contacts[j];
                    let detContacts = createElement('div', { className: 'order_contacts'}, null, null, parent);
                    detContacts.innerHTML = `<h3>CONTACT DETAILS</h3>
                                             <p>${contacts.name}, ${contacts.eMail}, ${contacts.phoneNumber}</p>
                                             <p>${contacts.country}, ${contacts.city}, ${contacts.street}, ${contacts.house}</p>`
                }
            }
        }
            intervalId = setTimeout (() => {
                list.classList.add('open_list');
            },0);
        }
    }

    if (event.target.classList.contains('open_list')) {
        clearTimeout(intervalId);
        for (let i = 0; i < arrOrdersPersonalPage.length; i++) {
            if (arrOrdersPersonalPage[i].id_order === categoryId) {
                const parent = document.getElementById(arrOrdersPersonalPage[i].order_number);
                parent.innerHTML = '';
            }}
        list.innerHTML = `<svg id=${categoryId} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`;
        intervalId = setTimeout (() => {
            list.classList.remove('open_list');
        },0);
    }
}
function deleteOrder(event) {
    const orderIndex = Number(event.target.getAttribute('data-info')); 
   
    if (event.target.className === 'btn_delete'){
        document.querySelector('#popup').classList.add('open');
            document.querySelector('#popup_delete').addEventListener ('click', function() {

            // arrOrdersPersonalPage.splice(orderIndex, 1);
            // localStorage.setItem('ordersPage', JSON.stringify(arrOrdersPersonalPage));        
            // event.target.closest('div').remove();

            document.querySelector('#popup').classList.remove('open');
        });
        document.querySelector('#popup_cancel').addEventListener ('click', function() {
        document.querySelector('#popup').classList.remove('open');
        });
    }
}


function closeDetails() {
    document.querySelector('#details_order').classList.add('hidden');
    document.querySelector('#personal_page').classList.remove('block_blurs');
}

function showDetailsOrder (event) {
    const categoryId = event.target.getAttribute('id');
    const parentOrderDet = document.querySelector('.order_more_info');
    
    document.querySelector('#personal_page').classList.add('block_blurs');
    parentOrderDet.innerHTML = '';
    document.querySelector('#details_order').classList.remove('hidden');
    createElement('button', {className: 'details_close', id: 'details_close'}, {click: closeDetails},'X', parentOrderDet);
    for (let i = 0; i < arrOrdersPersonalPage.length; i++) {
        for(let j = 0; j < arrOrdersPersonalPage[i].products.length; j++) {
            if (arrOrdersPersonalPage[i].products[j].id_product === categoryId) {
                console.log(arrOrdersPersonalPage[i].products[j])
                const details = createElement('div', { className: 'orders_details_block'}, null, null, parentOrderDet);
                details.innerHTML = `<p><span class="text_mod_order">Name:</span> ${arrOrdersPersonalPage[i].products[j].name} </p>
                                    <p><span class="text_mod_order">Price:</span> ${arrOrdersPersonalPage[i].products[j].price} UAH</p>
                                    <p><span class="text_mod_order">Color:</span> ${arrOrdersPersonalPage[i].products[j].color}</p>
                                    <p><span class="text_mod_order">Diagonal:</span> ${arrOrdersPersonalPage[i].products[j].diagonal}</p>
                                    <p><span class="text_mod_order">Processor:</span> ${arrOrdersPersonalPage[i].products[j].processor}</p>
                                    <p><span class="text_mod_order">Your comment:</span> ${arrOrdersPersonalPage[i].products[j].comment} </p>
                                    <p><span class="text_mod_order">Number of goods purchased:</span> ${arrOrdersPersonalPage[i].products[j].value}
                                    <p class="price_mod"><span class="text_mod_order _order_mod">Total cost:</span> ${arrOrdersPersonalPage[i].products[j].sum} UAH</p>`
            createElement('img', { className: 'orders_details_img', src:`${arrOrdersPersonalPage[i].products[j].main_images}`}, null, null, parentOrderDet);
            

            }
        }
    }
    }


