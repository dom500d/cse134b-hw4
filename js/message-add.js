document.addEventListener("DOMContentLoaded", (event)=>{
    let form = document.getElementsByTagName("form");
    console.log(form);
    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        let time = new Date();
        let name = document.getElementById('contact-form-name').value;
        let email = document.getElementById('contact-form-email').value;
        let message = document.getElementById('contact-form-message').value;
        let clone = document.querySelector('template').content.cloneNode(true);
        let messages = document.getElementById('message-wrapper');
        let image = clone.querySelector('img');
        clone.querySelector('.message').setAttribute('data-email', email); 
        image.setAttribute('alt', `Picture of ${name}`);
        console.log(clone);
        console.log(name);
        clone.querySelector('.message-sender').innerHTML = `${name} <time datetime="${time.toString()}">${time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</time>`
        clone.querySelector('.message-content').innerHTML = message;
        console.log(message);
        console.log(clone);
        messages.append(clone);
    });
});