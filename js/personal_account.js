let arrLocalStorageOrder = JSON.parse(localStorage.getItem('orders')) || [];
if (arrLocalStorageOrder.length === 0) {
    localStorage.setItem('orders', JSON.stringify(order));
    arrLocalStorageOrder = JSON.parse(localStorage.getItem('orders'));
}

if (arrLocalStorageOrder[0].orders.length === 0) {
  localStorage.setItem('orders', JSON.stringify(order));
  arrLocalStorageOrder = JSON.parse(localStorage.getItem('orders'));
}


const ordersArr = [];

initialOrders();

function initialOrders() {
    const parentListPerson = document.querySelector('.person_info_block');
    const parentListOrder = document.querySelector('.orders_block');
    
    for (const key in arrLocalStorageOrder) {      
        createElement('div', { className: 'person_info'}, null, `Name: ${arrLocalStorageOrder[key].name}`, parentListPerson);
        createElement('div', { className: 'person_info'}, null, `Email: ${arrLocalStorageOrder[key].email}`, parentListPerson);
        createElement('div', { className: 'person_info'}, null, `Phone number: ${arrLocalStorageOrder[key].phone}`, parentListPerson);

        for (let i=0; i< arrLocalStorageOrder[key].orders.length; i++){
            const parent = createElement('div', { className: 'orders_block_info'}, null, null, parentListOrder);
            ordersArr.push(arrLocalStorageOrder[key].orders[i]);
            createElement('div', { className: 'order_info', id:`${arrLocalStorageOrder[key].orders[i].id_order}`}, {click: showDetailsOrder}, ` ${arrLocalStorageOrder[key].orders[i].dateOrder}, ${arrLocalStorageOrder[key].orders[i].name}`, parent);
            createElement('button', { className: 'btn_delete', 'data-delete': `${arrLocalStorageOrder[key].orders[i].id_order}`,'data-info': i}, {click: deleteOrder},"Delete", parent);
        }
    }
}

function deleteOrder(event) {
    const orderIndex = Number(event.target.getAttribute('data-info')); 
   
    if (event.target.className === 'btn_delete'){
        document.querySelector('#popup').classList.add('open');
            document.querySelector('#popup_delete').addEventListener ('click', function() {

            arrLocalStorageOrder[0].orders.splice(orderIndex, 1);
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
    for (let i = 0; i < ordersArr.length; i++) {
        if (ordersArr[i].id_order === categoryId) {
            const details = createElement('div', { className: 'orders_details_block'}, null, null, parentOrderDet);
            details.innerHTML = `<p><span class="text_mod_order">Data of purchase:</span> ${ordersArr[i].dateOrder}</p>
                                 <p><span class="text_mod_order">Name:</span> ${ordersArr[i].name} </p>
                                 <p><span class="text_mod_order">Price:</span> ${ordersArr[i].price} UAN</p>
                                 <p><span class="text_mod_order">Color:</span> ${ordersArr[i].color}</p>
                                 <p><span class="text_mod_order">Diagonal:</span> ${ordersArr[i].diagonal}</p>
                                 <p><span class="text_mod_order">Processor:</span> ${ordersArr[i].processor}</p>
                                 <p><span class="text_mod_order">Your comment:</span> ${ordersArr[i].comment} </p> `
            createElement('img', { className: 'orders_details_img', src:`${ordersArr[i].main_images}`}, null, null, parentOrderDet);
        }
    }
  }

