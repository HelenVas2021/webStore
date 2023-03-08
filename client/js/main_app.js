let data = [];
getData();
async function getData() {
    await fetch(API_CATEGORIES_LIST)
        .then(res => res.json())
        .then(res => {
            data = res;
        }) 
}

// для скрытия и показа блоков

let pageArr = ['mainPage', 'category', 'allProductPage', 'about', 'contacts', 'oneItem','personal_page','pageShoppingCart','confirm_window', 'order'];
const mainPage = document.querySelector('#mainPage');
const categoryBlock = document.querySelector('#category');
const about = document.querySelector('#about');
const contacts = document.querySelector('#contacts');
const userPage = document.querySelector('#personal_page');
const shoppingCart = document.getElementById('pageShoppingCart');
const salesPage = document.getElementById('allProductPage');


document.getElementById('allSaleBtn').addEventListener('click', ()=>{
    pageCleanup();
    salesPage.classList.remove('hidden');
})
document.querySelector('#aboutBtn').addEventListener('click', ()=> {
    pageCleanup()
    about.classList.remove('hidden');
});
document.querySelector('#contactsBtn').addEventListener('click', ()=> {
    pageCleanup()
    contacts.classList.remove('hidden');
    document.querySelector('#form_contacts_person').classList.remove('hidden');
	document.querySelector('.message_contacts').classList.add('hidden');
});
document.querySelector('#main_page_btn').addEventListener('click', ()=> {
    pageCleanup()
    mainPage.classList.remove('hidden');
});


document.querySelector('#user_basket').addEventListener('click', ()=> {
    pageCleanup();
    shoppingCart.classList.remove('hidden');
    showShoppingCart();
});
document.querySelector('#user_page').addEventListener('click', ()=> {
    pageCleanup();
    userPage.classList.remove('hidden');
    getDataOrderArr();
});


function pageCleanup() {
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
}

    
