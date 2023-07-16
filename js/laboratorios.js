const app2 = Vue.createApp({//const { createApp } = Vue
    //createApp({
        data() {
            return {
                laboratorios:[],
                url:'https://pucho243.pythonanywhere.com/laboratorios',
                /*atributos para el guardar los valores del formulario */
                id:"",
                nombre:"", 
                direccion:"",
                telefono:"",
                director:"",
                sitio_web:"",
            }  
        },
        methods: {
            async fetchData(url) {
                try {
                const response = await fetch(url);
                const data = await response.json();
                this.laboratorios = data;
                this.cargando = false;
                } catch (err) {
                console.error(err);
                this.error = true;
                }
            },
            async remover_laboratorio(id) {
                const url = this.url + '/' + id;
                const options = {
                    method: 'DELETE',
                };
                try {
                    const res = await fetch(url, options);
                    const data = await res.json();
                    alert("Laboratorio removido correctamente del listado.");    
                    location.reload(); // recarga el json luego de eliminado el registro
                } catch (err) {
                    console.error(err);
                    alert("Mensaje 3.");
                }
            },
            agregar_laboratorio(){
                let laboratorio = {
                    id:this.id,
                    nombre:this.nombre,
                    direccion:this.direccion,
                    telefono:this.telefono,
                    director:this.director,
                    sitio_web:this.sitio_web
                }
                var options = {
                    body:JSON.stringify(laboratorio),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url, options)
                    .then(response => {
                        if (response.ok) {
                        alert("Laboratorio incorporado al listado.");
                        window.location.href = "./admin.html"; // recarga productos.html
                        } else {
                        throw new Error("Error al incorporar laboratorio al listado.");
                        }
                    })
                    .catch(err => {
                        console.error(error);
                        alert("Error al incorporar laboratorio al listado.")  // puedo mostrar el error tambien
                    })
            }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app2')