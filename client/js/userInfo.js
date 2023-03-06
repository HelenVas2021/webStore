const confirmPage = document.getElementById('order');
document.getElementById('confirm').addEventListener('click', userInfo);
document.getElementById('checkout_btn').addEventListener('click', showOrderPage);

let orderArr = JSON.parse(localStorage.getItem('orderArr')) || [];

function showOrderPage(){
let orderArr = JSON.parse(localStorage.getItem('orderArr')) || [];
const orderPage = document.getElementById("order_page");
const basket = document.getElementById('pageShoppingCart');
const parents = document.getElementById('product_order');
parents.innerHTML = '';
// let totalPrice = 0;
orderArr.forEach(items => {
	// totalPrice += +items.price;
	let trItems = createElement('tr', { className: 'checked_product'}, null, null, parents);
	createElement('td', { className: 'checked_product_text'}, null, ` ${items.name}`, trItems);
	createElement('td', { className: 'checked_product_text'}, null, ` ${items.price} X ${items.value}`, trItems);
});
let totalTR = createElement('tr', { className: 'checked_total'}, null, null, parents);
createElement('td', { className: 'checked_total_text'}, null, 'TOTAL', totalTR);
createElement('td', { className: 'checked_total_text'}, null, `${buyerPrice} $`, totalTR);

orderPage.classList.remove('hidden');
confirmPage.classList.remove('hidden');
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
		
	  }
	  defaultValue();

	  if(checkValidate(userInfo)){
		return;
	  }
	 
	 saveInfo(userInfo);
	 document.forms[4].reset();
	 document.forms[5].reset();
	
	//создание объекта и отправка его на сервер

	let orderUser = {
		id_order: `order_${Date.now()}`,
		order_number: Date.now(),
        dateOrder: new Date().toLocaleDateString(),
        totalCost: buyerPrice,
        products: [],
		contacts: [
			{
				name: userInfo.formName,
				eMail: userInfo.eMail,
				phoneNumber: userInfo.phoneNumber,
				country: userInfo.country,
				city: userInfo.city,
				street: userInfo.street,
				house: userInfo.house,
			}
		]
	}

	 for(let i=0; i < orderArr.length; i++) {
		let comment = document.querySelector('#comment').value;
		orderArr[i].id_product = `${orderUser.id_order}${orderArr[i].sum}`;
		orderArr[i].comment = comment;
		orderUser.products.push(orderArr[i]);
	}

	fetch(API_ORDERS_LIST, {
		    method: 'POST',
		    body: JSON.stringify(orderUser),
		    headers: {
		        "Content-Type":"application/json"
		    }
		}).then(response => console.log(response))

orderPage.className='hidden';
confirmWindow.classList.remove('hidden');
confirmPage.classList.remove('hidden');
countProduct = 0;
localStorage.removeItem('orderArr');

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
	confirmWindow.className = 'hidden';
	confirmPage.className = 'hidden';;
})



