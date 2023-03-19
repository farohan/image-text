//Welcome to app.js!

const form = document.querySelector('#form');
const input = document.querySelector('#input');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

form.addEventListener('submit', formHandler);

function formHandler(event) {
    event.preventDefault();
}

function postData() {
    let formData = new FormData(form);
    let image = input.files[0];
    formData.append('image', image);

    $.ajax({
        method: 'POST',
        url: 'https://api.api-ninjas.com/v1/imagetotext',
        headers: { 'X-Api-Key': 'lADrXDhx/+1Lr4lvwW0xVA==BCdFzqo0r4kgRry1'},
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false, 
        success: function (result) {
            console.log(result);
            const img = new Image();
            img.src = image;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        },
        error: function ajaxError(jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}
