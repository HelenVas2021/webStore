// для скрытия и показа блоков
let pageArr = ['mainPage', 'category', 'allProductPage', 'about', 'contacts', 'oneItem','personal_page','pageShoppingCart'];
const mainPage = document.querySelector('#mainPage');
const categoryBlock = document.querySelector('#category');
const allProducts = document.getElementById('allProductPage');
const about = document.querySelector('#about');
const contacts = document.querySelector('#contacts');
const userPage = document.querySelector('#personal_page');
const shoppingCart = document.getElementById('pageShoppingCart');

document.querySelector('#aboutBtn').addEventListener('click', ()=> {
    pageCleanup()
    about.classList.remove('hidden');
});
document.querySelector('#contactsBtn').addEventListener('click', ()=> {
    pageCleanup()
    contacts.classList.remove('hidden');
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
});

function pageCleanup() {
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
}
    
