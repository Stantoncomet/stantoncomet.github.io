let cur_slide = 0;

/**
 * @type {HTMLElement[]}
 */
let all_slides = [];

document.addEventListener('DOMContentLoaded', e => {
    // load slides
    all_slides = document.querySelectorAll('.slide');
    loadSlide(cur_slide);

    //make slides advance
    all_slides.forEach(s => s.addEventListener('dblclick', nextSlide));
    //prev slides
    document.getElementById('imgloaded').addEventListener('dblclick', prevSlide);

    //image loading progress
    total_images = document.querySelectorAll('img').length;
    document.querySelectorAll('img').forEach(i => i.addEventListener('load', imgLoad));

})

function loadSlide(slide) {
    all_slides.forEach(s => {
        s.style.visibility = 'hidden';
        s.style.display = 'none';
    })
    all_slides[slide].style.visibility = 'visible';
    all_slides[slide].style.display = 'flex';

    // update slide counter
    document.getElementById('imgloaded').querySelectorAll('span')[0].innerText = `${cur_slide+1} of ${all_slides.length}`;
}

function nextSlide() {
    cur_slide++;
    if (cur_slide > all_slides.length-1)
        cur_slide = 0;
    loadSlide(cur_slide);
}
function prevSlide() {
    cur_slide--;
    if (cur_slide < 1)
        cur_slide = all_slides.length-1;
    loadSlide(cur_slide);
}


//
function fullscreen() {
    document.getElementById('fullscreen').requestFullscreen();
    document.getElementById('controls').style.visibility = 'visible';
    all_slides.forEach(s => s.style.scale = 1.4);

}
function fullscreenLeave() {
    document.exitFullscreen();
    document.getElementById('controls').style.visibility = 'hidden';
    all_slides.forEach(s => s.style.scale = 1.0);
}




//
let total_images = 0;
let loaded_images = 0;
function imgLoad() {
    loaded_images++;
    document.getElementById('imgloaded').querySelectorAll('span')[1].innerText = `${loaded_images} of ${total_images}`;
}