const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const { createApp } = Vue
    createApp({
        data() {
            return {
                id:"",
                nombre:"",
                direccion:"",
                telefono:"",
                director:"",
                sitio_web:"",
                url:'https://pucho243.pythonanywhere.com/laboratorios/'+id,
            }  
            },
            methods: {
                fetchData(url) {
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.id=data.id
                            this.nombre = data.nombre
                            this.direccion=data.direccion
                            this.telefono=data.telefono
                            this.director=data.director
                            this.sitio_web=data.sitio_web
                        })
                        .catch(err => {
                            console.error(err);
                            this.error=true              
                        })
                },
                async modificar_laboratorio() {
                    let laboratorio = {
                        
                        id: this.id,
                        nombre: this.nombre,
                        direccion: this.direccion,
                        telefono: this.telefono,
                        director: this.director,
                        sitio_web: this.sitio_web
                    }
                    var options = {
                        body: JSON.stringify(laboratorio),
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow'
                    }
                    try {
                        await fetch(this.url, options);
                        alert("Registro modificado.");
                        window.location.href = "./admin.html";
                    } catch (err) {
                        console.error(err);
                        alert("Error al modificar registro de laboratorio.");
                    }
                }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app2')