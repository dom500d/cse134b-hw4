window.addEventListener('DOMContentLoaded', () => {
    const name_exp = new RegExp('[a-zA-Z\- ]');
    const email_exp = new RegExp('[a-zA-Z0-9\-_.@]');
    const comment_exp = new RegExp('[a-zA-Z\- .!?]');

    let name_error = document.querySelector('[name="name-error"]');
    let name_info = document.querySelector('[name="name-info"]');
    let email_error = document.querySelector('[name="email-error"]');
    let email_info = document.querySelector('[name="email-info"]');
    let comments_error = document.querySelector('[name="comments-error"]');
    let comments_info = document.querySelector('[name="comments-info"]');

    let inputs = document.querySelectorAll('input');
    document.querySelector('textarea').addEventListener('input', check_input);
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', check_input);
    }

    function check_input(event) {
        if(event.target.value.length > 0) {
            let id_split = event.target.id.split('-')[2];
            if(id_split === 'name') {
                if(name_exp.test(event.target.value.charAt(event.target.value.length - 1)) === false) {
                    name_error.innerHTML = `${event.target.value.charAt(event.target.value.length -1)} isn't allowed in this field`;
                    event.target.value = event.target.value.slice(0, -1);
                    mis_input(event);
                }
            } else if (id_split === 'email') {
                if(email_exp.test(event.target.value.charAt(event.target.value.length - 1)) === false) {
                    email_error.innerHTML = `${event.target.value.charAt(event.target.value.length -1)} isn't allowed in this field`;
                    event.target.value = event.target.value.slice(0, -1);
                    mis_input(event);
                }
            } else if (id_split === 'comments') {
                if(comment_exp.test(event.target.value.charAt(event.target.value.length - 1)) === false) {
                    comments_error.innerHTML = `${event.target.value.charAt(event.target.value.length -1)} isn't allowed in this field`;
                    event.target.value = event.target.value.slice(0, -1);

                    mis_input(event);
                }
            }   
        }
    }

    async function mis_input(event) {
        event.target.classList.add('invalid');
        await new Promise(x => setTimeout(x, 300));
        event.target.classList.remove('invalid');
    }
});