new Vue({
    el: '#app',
    data: {
        username: '',
        password: ''
    },
    methods: {
        login(event) {
        event.preventDefault();
        if (this.username === 'admin' && this.password === 'com23020') {
            window.location.href = 'admin.html';
        } else {
            alert('Usuario o Contraseña inválida, intente nuevamente...');
        }
        }
    }
});