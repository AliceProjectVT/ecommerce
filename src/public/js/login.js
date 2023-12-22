const form = document.getElementById('loginForm')
form.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    fetch('/sessions/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = '/catalog'
            } else {
                // Display SweetAlert message for invalid credentials
                Swal.fire('Credenciales Invalidas', 'Revisa tu correo y contraseña', 'error');
            }
        })
        .catch(error => {
            console.log(error.message)
        })
})