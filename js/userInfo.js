document.getElementById('confirm').addEventListener('click', userInfo);

function userInfo(){
	const orderPage = document.getElementById('order_page');
	const confirmWindow = document.getElementById('confirm_window');
	const userInfo = {
		formName: document.forms[0].elements.formName.value,
		email: document.forms[0].elements.email.value,
		phoneNumber: document.forms[0].elements.phoneNumber.value,
		country: document.forms[1].elements.country.value,
		city: document.forms[1].elements.city.value,
		street: document.forms[1].elements.street.value,
		house: document.forms[1].elements.house.value,
		apartment: document.forms[1].elements.apartment.value,
	  }
	  defaultValue();

	  if(checkValidate(userInfo)){
		return;
	  }
	 
	 saveInfo(userInfo);
	 document.forms[0].reset();
	 document.forms[1].reset();

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



