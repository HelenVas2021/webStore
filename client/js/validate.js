
const validate = {
	formName: /[A-Za-z]{1,15}/,
	eMail: /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
	phoneNumber: /^\+380\d{3}\d{2}\d{2}\d{2}$/,
	country: /[A-Za-z]{1,15}/,
	city: /[A-Za-z]{1,15}/,
	street: /[A-Za-z]{1,15}/,
	house: /[0-9]{1,3}/,
	apartment: /[0-9]{1,3}/,
}

function checkValidate(userInfo) {
	let isError = false;
	
	for (let key in validate) {
		
		if (validate[key].exec(userInfo[key])) {
			
			continue;
		} else {
			let elem = document.getElementById(key);
			const error = document.createElement('span');
			error.textContent = 'Change your info!';
			elem.before(error);
			error.setAttribute('class','text-field__message');
			isError = true;

		}
	}
	return isError;
}

function defaultValue() {
	let items = document.querySelectorAll('span.text-field__message');
	items.forEach(elem => elem.remove());
	
}




// for (let key in userInfo) {
// 	let item = document.getElementById(key);
// 	console.log(item);
// 	if (item.contains(span)) {
// 		item.className.remove('span');
// 	}
// }