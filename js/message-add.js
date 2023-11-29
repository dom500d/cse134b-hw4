document.addEventListener("DOMContentLoaded", (event) => {
    let theme_picker = document.querySelector('body main section #nav-holder #theme-picker');
    let div = document.createElement('div');
    theme_picker.removeChild(theme_picker.querySelector('p'));
    div.innerHTML = '<label>Mode Toggle:<input type="checkbox" id="color-theme-toggle"></label><label>Left Background Color:<input type="color" id="left-background-color"></label><label>Left Text Color:<input type="color" id="left-text-color"></label><label>Right Background Color:<input type="color" id="right-background-color"></label><label>Right Text Color:<input type="color" id="right-text-color"></label><button type="button" id="reset-theme">Reset Theme</button>';
    theme_picker.appendChild(div);
    theme_picker = null;
    div = null;


    let form = document.getElementsByTagName('form')[0];
    let name = form.querySelector('#contact-form-name');
    let email = form.querySelector('#contact-form-email');
    let message = form.querySelector('#contact-form-comments');
    let message_holder = document.querySelector('#message-wrapper');
    let root = document.querySelector(':root');
    let left_background_color = document.querySelector('#left-background-color');
    let left_text_color = document.querySelector('#left-text-color');
    let right_background_color = document.querySelector('#right-background-color');
    let right_text_color = document.querySelector('#right-text-color');
    let theme_toggle = document.querySelector('#color-theme-toggle');
    let reset_theme_button = document.querySelector('#reset-theme');

    
    let stored_theme = localStorage.getItem('theme') || null;
    theme_apply(stored_theme);

    get_existing_messages(700);
    //Maybe not the best thing to be doing, but this at least makes it so the images are different between each other.

    left_background_color.addEventListener('input', change_color);
    left_text_color.addEventListener('input', change_color);
    right_background_color.addEventListener('input', change_color);
    right_text_color.addEventListener('input', change_color);
    theme_toggle.addEventListener('input', change_theme);
    reset_theme_button.addEventListener('click', reset_theme);

    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        let time = new Date();
        let date_time = time.toString();
        let time_print = time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
        let image_data = append_message(name.value, email.value, message.value, date_time, time_print);
        let stored_messages = JSON.parse(localStorage.getItem('messages') || null); 
        let new_message = {'name': name.value, 'email': email.value, 'message': message.value, 'time': date_time, 'time_to_print': time_print, 'img': image_data};
        if (stored_messages === null) {
            stored_messages = [new_message];
            console.log(stored_messages);
        } else {
            stored_messages = stored_messages.concat(new_message);
        }
        localStorage.setItem('messages', JSON.stringify(stored_messages));
        // get_image_bytes();
        form.reset();
    });

    document.getElementById('remove-messages').addEventListener('click', (event) => {
        localStorage.removeItem('messages');
        let nodes = document.querySelectorAll('[data-email]');
        console.log(nodes);
        for (let i = 0; i < nodes.length; i++) {
            message_holder.removeChild(nodes[i]);
        }
    });

    function append_message(name, email, comment, time, time_to_print) {
        let clone = document.querySelector('template').content.cloneNode(true);
        let image = clone.querySelector('picture');
        clone.querySelector('.message').setAttribute('data-email', email);
        clone.querySelector('img').setAttribute('alt', `Picture of ${name}`);
        clone.querySelector('.message-sender').innerHTML = `${name} <time datetime="${time.toString()}">${time_to_print}</time>`;
        clone.querySelector('.message-content').innerHTML = comment;
        message_holder.append(clone);

        return image;
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

    async function get_image_bytes() {
        await fetch('https://thispersondoesnotexist.com/', {
            method: 'GET',
            mode: 'no-cors'
        }).then(response => {
            console.log(response);
        })
    }

    function get_image() {
        console.log(img);
        let image = img.querySelector('img');
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWeight;
        context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
        console.log(canvas.toDataURL('image/png'));
        return canvas.toDataURL();
    }

    function change_color(event) {
        let x = event.target.id.split('-');
        let temp = x[1] + '-' + x[2];
        if(x[0] === 'left') {
            if(temp === 'text-color') {
                if(theme_toggle.checked) {
                    root.style.setProperty('--left-text-color', event.target.value);
                    localStorage.setItem('dark--left-text-color', event.target.value);
                } else {
                    root.style.setProperty('--left-text-color', event.target.value);
                    localStorage.setItem('--left-text-color', event.target.value);
                }  
            } else if(temp === 'background-color') {
                if(theme_toggle.checked) {
                    root.style.setProperty('--left-color', event.target.value);
                    localStorage.setItem('dark--left-color', event.target.value);
                } else {
                    root.style.setProperty('--left-color', event.target.value);
                    localStorage.setItem('--left-color', event.target.value);
                }
            } else {
                console.log('Something went wrong when changing the color theme');
            }
        } else if(x[0] ==='right') {
            if(temp === 'text-color') {
                if(theme_toggle.checked) {
                    root.style.setProperty('--right-text-color', event.target.value);
                    localStorage.setItem('dark--right-text-color', event.target.value);
                } else {
                    root.style.setProperty('--right-text-color', event.target.value);
                    localStorage.setItem('--right-text-color', event.target.value);
                }  
            } else if(temp === 'background-color') {
                if(theme_toggle.checked) {
                    root.style.setProperty('--right-color', event.target.value);
                    localStorage.setItem('dark--right-color', event.target.value);
                } else {
                    root.style.setProperty('--right-color', event.target.value);
                    localStorage.setItem('--right-color', event.target.value);
                }
            } else {
                console.log('Something went wrong when changing the color theme');
            }
        }
        
    }

    function change_theme() {
        let theme = theme_toggle.checked ? 'dark' : 'light'
        localStorage.setItem('theme', theme);
        theme_apply(theme);
    }

    function theme_apply(state) {
        if(state === 'dark') {
            theme_toggle.checked = true;
            root.style.setProperty('--left-color', localStorage.getItem('dark--left-color'));
            root.style.setProperty('--left-text-color', localStorage.getItem('dark--left-text-color'));
            root.style.setProperty('--right-color', localStorage.getItem('dark--right-color'));
            root.style.setProperty('--right-text-color', localStorage.getItem('dark--right-text-color'));
        } else if (state === 'light') {
            theme_toggle.checked = false;
            root.style.setProperty('--left-color', localStorage.getItem('--left-color'));
            root.style.setProperty('--left-text-color', localStorage.getItem('--left-text-color'));
            root.style.setProperty('--right-color', localStorage.getItem('--right-color'));
            root.style.setProperty('--right-text-color', localStorage.getItem('--right-text-color'));
        }
        apply_computed_style();
    }

    function reset_theme() {
        theme_toggle.checked = false;
        root.style.setProperty('--left-color', '#a80ea1');
        root.style.setProperty('--left-text-color', '#e0e0e0');
        root.style.setProperty('--right-color', '#f1f1f1');
        root.style.setProperty('--right-text-color', '#192525');
        localStorage.removeItem('--left-color');
        localStorage.removeItem('--left-text-color');
        localStorage.removeItem('--right-color');
        localStorage.removeItem('--right-text-color');
        localStorage.setItem('dark--left-color', '#454545');
        localStorage.setItem('dark--left-text-color', '#e0e0e0');
        localStorage.setItem('dark--right-color', '#6f6d6d');
        localStorage.setItem('dark--right-text-color', '#e0e0e0');
        apply_computed_style();
    }

    function apply_computed_style() {
        left_background_color.value = getComputedStyle(root).getPropertyValue('--left-color');
        left_text_color.value = getComputedStyle(root).getPropertyValue('--left-text-color');
        right_background_color.value = getComputedStyle(root).getPropertyValue('--right-color');
        right_text_color.value = getComputedStyle(root).getPropertyValue('--right-text-color');
    }
});

