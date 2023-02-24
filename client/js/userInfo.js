document.getElementById('confirm').addEventListener('click', userInfo);
document.getElementById('checkout_btn').addEventListener('click', showOrderPage);

let orderArr = JSON.parse(localStorage.getItem('orderArr')) || [];
let orderPersonalPage = JSON.parse(localStorage.getItem('ordersPage'));


function showOrderPage(){
let orderArr = JSON.parse(localStorage.getItem('orderArr')) || [];
const orderPage = document.getElementById("order");
const basket = document.getElementById('pageShoppingCart');
const parents = document.getElementById('product_order');
parents.innerHTML = '';
let totalPrice = 0;
orderArr.forEach(items => {
	totalPrice += +items.price;
	let trItems = createElement('tr', { className: 'checked_product'}, null, null, parents);
	createElement('td', { className: 'checked_product_text'}, null, ` ${items.name}`, trItems);
	createElement('td', { className: 'checked_product_text'}, null, ` ${items.price}`, trItems);
});
let totalTR = createElement('tr', { className: 'checked_total'}, null, null, parents);
createElement('td', { className: 'checked_total_text'}, null, 'TOTAL', totalTR);
createElement('td', { className: 'checked_total_text'}, null, `${totalPrice} $`, totalTR);

orderPage.classList.remove('hidden');
basket.className = 'hidden';

}


function userInfo(){
	orderArr = JSON.parse(localStorage.getItem('orderArr'));
	const orderPage = document.getElementById('order_page');
	const confirmWindow = document.getElementById('confirm_window');
	const userInfo = {
		formName: document.forms[4].elements.formName.value,
		eMail: document.forms[4].elements.eMail.value,
		phoneNumber: document.forms[4].elements.phoneNumber.value,
		country: document.forms[5].elements.country.value,
		city: document.forms[5].elements.city.value,
		street: document.forms[5].elements.street.value,
		house: document.forms[5].elements.house.value,
		apartment: document.forms[5].elements.apartment.value,
	  }
	  defaultValue();

	  if(checkValidate(userInfo)){
		return;
	  }
	 
	 saveInfo(userInfo);
	 document.forms[4].reset();
	 document.forms[5].reset();

	 for(let i=0; i < orderArr.length; i++) {
		let comment = document.querySelector('#comment').value;
		let dataOrder = new Date().toLocaleDateString();
		let orderId = `order_${orderArr[i].name}`;
		orderArr[i].comment = comment;
		orderArr[i].dateOrder = dataOrder;
		orderArr[i].id_order = orderId;
		orderPersonalPage.push(orderArr[i]);
	}
	localStorage.setItem('ordersPage',JSON.stringify(orderPersonalPage));

orderPage.className='hiddenPage';
confirmWindow.classList.remove('hiddenPage');
}

function saveInfo(userInfo){
	let historyOrders = JSON.parse(localStorage.getItem('historyOrders'));
	if(historyOrders === null){
		localStorage.setItem('historyOrders', JSON.stringify([userInfo]));
		return;
	}

	historyOrders.push(userInfo);
	localStorage.setItem('historyOrders', JSON.stringify(historyOrders));
}

document.getElementById('final_confirm_page').addEventListener('click',() => {
	const confirmWindow = document.getElementById('confirm_window');
	confirmWindow.className = 'hiddenPage';
	
})



