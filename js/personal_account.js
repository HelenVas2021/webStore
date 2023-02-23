let arrLocalStorageOrder = JSON.parse(localStorage.getItem('ordersPage')) || [];
if (arrLocalStorageOrder.length === 0) {
    localStorage.setItem('ordersPage', JSON.stringify(order));
    arrLocalStorageOrder = JSON.parse(localStorage.getItem('ordersPage'));
}

if (arrLocalStorageOrder.length === 0) {
  localStorage.setItem('ordersPage', JSON.stringify(order));
  arrLocalStorageOrder = JSON.parse(localStorage.getItem('ordersPage'));
}

localStorage.setItem('client', JSON.stringify(client));
let clientInfoPage = JSON.parse(localStorage.getItem('client'));

initialOrders();

function initialOrders() {
    const parentListPerson = document.querySelector('.person_info_block');
    const parentListOrder = document.querySelector('.orders_block');
    
    for (const key in clientInfoPage) {      
        createElement('div', { className: 'person_info'}, null, `Name: ${client[key].name}`, parentListPerson);
        createElement('div', { className: 'person_info'}, null, `Email: ${client[key].email}`, parentListPerson);
        createElement('div', { className: 'person_info'}, null, `Phone number: ${client[key].phone}`, parentListPerson);
    }

    for (let i=0; i < arrLocalStorageOrder.length; i++){
            const parent = createElement('div', { className: 'orders_block_info'}, null, null, parentListOrder);
            createElement('div', { className: 'order_info', id:`${arrLocalStorageOrder[i].id_order}`}, {click: showDetailsOrder}, ` ${arrLocalStorageOrder[i].dateOrder}, ${arrLocalStorageOrder[i].name}`, parent);
            createElement('button', { className: 'btn_delete', 'data-delete': `${arrLocalStorageOrder[i].id_order}`,'data-info': i}, {click: deleteOrder},"Delete", parent);
        }
    }

function deleteOrder(event) {
    const orderIndex = Number(event.target.getAttribute('data-info')); 
   
    if (event.target.className === 'btn_delete'){
        document.querySelector('#popup').classList.add('open');
            document.querySelector('#popup_delete').addEventListener ('click', function() {

            arrLocalStorageOrder.splice(orderIndex, 1);
            localStorage.setItem('orders', JSON.stringify(arrLocalStorageOrder));        
            event.target.closest('div').remove();

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
    for (let i = 0; i < arrLocalStorageOrder.length; i++) {
        if (arrLocalStorageOrder[i].id_order === categoryId) {
            const details = createElement('div', { className: 'orders_details_block'}, null, null, parentOrderDet);
            details.innerHTML = `<p><span class="text_mod_order">Data of purchase:</span> ${arrLocalStorageOrder[i].dateOrder}</p>
                                 <p><span class="text_mod_order">Name:</span> ${arrLocalStorageOrder[i].name} </p>
                                 <p><span class="text_mod_order">Price:</span> ${arrLocalStorageOrder[i].price} UAN</p>
                                 <p><span class="text_mod_order">Color:</span> ${arrLocalStorageOrder[i].color}</p>
                                 <p><span class="text_mod_order">Diagonal:</span> ${arrLocalStorageOrder[i].diagonal}</p>
                                 <p><span class="text_mod_order">Processor:</span> ${arrLocalStorageOrder[i].processor}</p>
                                 <p><span class="text_mod_order">Your comment:</span> ${arrLocalStorageOrder[i].comment} </p> `
            createElement('img', { className: 'orders_details_img', src:`${arrLocalStorageOrder[i].main_images}`}, null, null, parentOrderDet);
        }
    }
  }

