
const validate = {
	formName: /[A-Za-z]{1,15}/,
	eMail: /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
	phoneNumber: /^\+380\d{3}\d{2}\d{2}\d{2}$/,
	country: /[A-Za-z]{1,15}/,
	city: /[A-Za-z]{1,15}/,
	street: /[A-Za-z]{1,15}/,
	house: /[0-9]{1,3}/,
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


// Валидация формы страницы Contacts

const validators = {
	name_contact: {
		regExp: /^[A-z][a-z]{1,}$/,
		error: 'Name is incorrect'
	},
	tel: {
		regExp: /^\+380\d{3}\d{2}\d{2}\d{2}$/,
		error: 'Incorrect phone number'
	},
	email_contact: {
		regExp: /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
		error: 'Email is incorrect'
	},
}

document.getElementById('btn_form_contact').addEventListener('click', chekFormContacts);
const message = document.querySelector('.message');


function chekFormContacts (){
	const {
		name_contact: {value: name_contact},
		tel: {value: tel},
		email_contact: {value: email_contact},
	} = document.forms[3].elements;

	if(validateContactForm ({
		name_contact,
		tel,
		email_contact
	})) {
		document.querySelector('#form_contacts_person').classList.add('hidden');
		document.querySelector('.message_contacts').classList.remove('hidden');
	}
}
function validateContactForm (args) {
	let validFields = 0;
	let count = 0;
	for(let key in validators) {
		const input = document.forms[3].elements[key];
		count++;
		if(validators[key].regExp.test(args[key])) {
			validFields++;
			formRemoveError(input);
		} else {
			const error = document.createElement('span');
			error.textContent = validators[key].error;
			input.before(error);
			error.setAttribute('class','text-field__message mode__size');
			if(input.name === 'tel') {
				error.setAttribute('class','text-field__message mode__size _telError');
			}
			formAddError(input);
		}
	}
	return validFields === count;
}

function formAddError(input) {
	input.classList.add('error');
}
function formRemoveError(input) {
  input.classList.remove('error');
  defaultValue();
}