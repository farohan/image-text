//Welcome to app.js!

const form = document.querySelector('#form');
const input = document.querySelector('#input');

const imgBox = document.querySelector('#image-box');

const outputBox = document.querySelector('#result-box');
const output = document.querySelector('#results');
const copyBtn = document.querySelector('#copy-btn');

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
            outputBox.style.visibility = 'visible';
            copyBtn.style.visibility = 'visible';
            output.innerHTML = '';
            console.log(result);
            for (let i = 0; i <= result.length; i++) {
                output.innerHTML += `${result[i].text} `;
            }
        },
        error: function ajaxError(jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}

input.addEventListener('change', function(e) {
    imgBox.innerHTML = '';

    let newImg = new Image(800, 600);
    newImg.src = e.target.files[0];
    newImg.src = URL.createObjectURL(e.target.files[0]);
    imgBox.appendChild(newImg);
});

function copyText() {
    navigator.clipboard.writeText(output.innerHTML);
    alert(`You just copied: ${output.innerHTML}`);
}
