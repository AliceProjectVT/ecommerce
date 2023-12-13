import { logger } from '../../middleware/loggers.js';

const form = document.getElementById('registerForm');

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    fetch('/sessions/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })

        .then(response => response.json())
        .then((data) => {
            if (data.status === 'success') {
                logger.info(data);
            } else {
                logger.error('Ocurrió un error durante el registro')
            }
        })


})