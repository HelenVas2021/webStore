// для скрытия и показа блоков
let pageArr = ['mainPage', 'category', 'allProductPage', 'about', 'contacts', 'oneItem'];
const mainPage = document.querySelector('#mainPage');
const categoryBlock = document.querySelector('#category');
const allProducts = document.getElementById('allProductPage');
const about = document.querySelector('#about');
const contacts = document.querySelector('#contacts');

document.querySelector('#aboutBtn').addEventListener('click', ()=> {
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
    about.classList.remove('hidden');
});
document.querySelector('#contactsBtn').addEventListener('click', ()=> {
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
    contacts.classList.remove('hidden');
});
document.querySelector('#main_page_btn').addEventListener('click', ()=> {
    for (let i = 0; i < pageArr.length; i++) {
        document.getElementById(pageArr[i]).classList.add('hidden');
    }
    mainPage.classList.remove('hidden');
});
