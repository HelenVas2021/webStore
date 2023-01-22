// для скрытия и показа блоков
const mainPage = document.querySelector('#mainPage');
const categoryBlock = document.querySelector('#category');
const allProducts = document.getElementById('allProductPage');
const about = document.querySelector('#about');
const contacts = document.querySelector('#contacts');

document.querySelector('#aboutBtn').addEventListener('click', ()=> {
    about.classList.remove('hidden');
    mainPage.classList.add('hidden');
    categoryBlock.classList.add('hidden');
    allProducts.classList.add('hidden');
    contacts.classList.add('hidden');
});
document.querySelector('#contactsBtn').addEventListener('click', ()=> {
    contacts.classList.remove('hidden');
    mainPage.classList.add('hidden');
    categoryBlock.classList.add('hidden');
    allProducts.classList.add('hidden');
    about.classList.add('hidden');
});
