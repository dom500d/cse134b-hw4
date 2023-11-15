document.addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementsByTagName('form')[0];
    let name = form.querySelector('#contact-form-name');
    let email = form.querySelector('#contact-form-email');
    let message = form.querySelector('#contact-form-comments');
    let message_holder = document.querySelector('#message-wrapper');
    get_existing_messages(700);
    //Maybe not the best thing to be doing, but this at least makes it so the images are different between each other.

    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        let time = new Date();
        let date_time = time.toString();
        let time_print = time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
        append_message(name.value, email.value, message.value, date_time, time_print);
        let stored_messages = JSON.parse(localStorage.getItem('messages') || null); 
        let new_message = {'name': name.value, 'email': email.value, 'message': message.value, 'time': date_time, 'time_to_print': time_print};
        if (stored_messages === null) {
            stored_messages = [new_message];
            console.log(stored_messages);
        } else {
            stored_messages = stored_messages.concat(new_message);
        }
        localStorage.setItem('messages', JSON.stringify(stored_messages));
        form.reset();
    });

    function append_message(name, email, comment, time, time_to_print) {
        let clone = document.querySelector('template').content.cloneNode(true);
        clone.querySelector('.message').setAttribute('data-email', email);
        clone.querySelector('img').setAttribute('alt', `Picture of ${name}`);
        clone.querySelector('.message-sender').innerHTML = `${name} <time datetime="${time.toString()}">${time_to_print}</time>`;
        clone.querySelector('.message-content').innerHTML = comment;
        message_holder.append(clone);
    }

    async function get_existing_messages(delay) {
        let message_list = JSON.parse(localStorage.getItem('messages') || null);
        if (message_list !== null) {
            for(let i = 0; i < message_list.length; i++) {
                let message = message_list[i];
                append_message(message.name, message.email, message.message, message.time, message.time_to_print);
                await new Promise(x => setTimeout(x, delay));
            }
        }
    }
});

