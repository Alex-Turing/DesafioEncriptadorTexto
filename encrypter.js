/*
   Author: Jeisson Alexander Hernandez
   Date:   August, 2024
   Encriptador de texto
   Filename: encrypter.js
*/
window.onload = function(){
    document.getElementById("user_input").value = "";
    document.getElementById("user_output").value = "";
}
function encryptText(text) {
    const encryption_map = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    return text.replace(/[eiaou]/g, match => encryption_map[match]);
}

function decryptText(text) {
    const decryption_map = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    return text.replace(/enter|imes|ai|ober|ufat/g, match => decryption_map[match]);
}

function removeAccents(str) {
    const accents_map = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'ã': 'a', 'õ': 'o', 'â': 'a', 'ê': 'e', 'î': 'i',
        'ô': 'o', 'û': 'u', 'ä': 'a', 'ë': 'e', 'ï': 'i',
        'ö': 'o', 'ü': 'u', 'ÿ': 'y'
    };
    return str.replace(/[áéíóúÁÉÍÓÚàèìòùãõâêîôûäëïöüÿ]/g, match => accents_map[match]);
}

function encrypt() {
    let user_input = document.querySelector("#user_input");
    let user_output = document.querySelector("#user_output");

    let lower_case_text = user_input.value.toLowerCase(); 
    let text_without_accents = removeAccents(lower_case_text); 
    let encrypted_text = encryptText(text_without_accents);

    document.getElementById("overlay-container").style.display = "none";
    document.getElementById("message").innerHTML = "";
    user_output.value = encrypted_text;

}

function decrypt() {
    let user_input = document.querySelector("#user_input");
    let user_output = document.querySelector("#user_output");

    let encrypted_text = user_input.value.toLowerCase();
    let text_without_accents = removeAccents(encrypted_text);
    let decrypted_text = decryptText(text_without_accents);

    user_output.value = decrypted_text;
}

function copy(){
    let user_output = document.querySelector('#user_output');
    let message = document.querySelector("#message");
    if(user_output.value.trim() === '')
    {
        message.textContent = "There is no text to copy";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    }    
    else
    {
        user_output.select();
        user_output.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(user_output.value)
        .then(() => {
            message.textContent = "text copied successfully";
            setTimeout(() => {
                message.textContent = '';
            }, 2000);
        })
        .catch(error => {
            message.textContent = "Error while copying text: " + error.message;
            setTimeout(() => {
                message.textContent = "";
            }, 2000);
        });
    }
}
