'use strict';
const slider = document.querySelector('.slider_block');
const arrImg = Array.from(slider.children);

arrImg.forEach(function(img, index) {
    if (index !== 0) {
        img.classList.add('hidden');
    } else {
        img.classList.add('active');
    }
    img.dataset.index = index;
})

let interval = setInterval(showSlider, 7000, 'next');

document.querySelector('#btn_next').addEventListener('click', function() {
    clearInterval(interval);
    showSlider('next');
    interval = setInterval(showSlider, 7000, 'next');
});

document.querySelector('#btn_previous').addEventListener('click', function() {
    clearInterval(interval);
    showSlider('previous');
    interval = setInterval(showSlider, 7000, 'next');
});

function addHidden(slide) {
    slide.classList.add('hidden');
    slide.classList.remove('active');
}

function addAcrive(slide) {
    slide.classList.add('active');
    slide.classList.remove('hidden');
}

function showSlider(direction) {
    const activeSlide = document.querySelector('.active');
    const activeSlideIndex = Number(activeSlide.dataset.index);
    addHidden(activeSlide);
    let nextSlideIndex;
    if(direction === 'next') {
        nextSlideIndex = activeSlideIndex + 1 === arrImg.length ? 0 : activeSlideIndex + 1;
    } else if (direction === 'previous') {
        nextSlideIndex = activeSlideIndex === 0 ? arrImg.length - 1 : activeSlideIndex - 1;
    }
    const nextSlide = slider.querySelector(`[data-index='${nextSlideIndex}']`);
    addAcrive(nextSlide);
}