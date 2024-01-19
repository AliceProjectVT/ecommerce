function registerUser(event) {
    event.preventDefault();

    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/sessions/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                if (result.message === 'Rellena todos los campos.') {
                    Swal.fire('Failed', 'Debes rellenar todos los campos.', 'error');
                }
                if (result.message === 'El correo se encuentra en uso.') {
                    Swal.fire('Failed', 'El correo se encuentra en uso.', 'error');
                }

            } else {
                // Show success alert
                Swal.fire('Éxito', 'Usuario registrado exitosamente', 'success');
                // Redirect to login
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);

            }
        })
        .catch(error => {
            // Show failed alert
            Swal.fire('Failed', 'No se pudo crear el usuario', 'error');
        });
}