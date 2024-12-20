//import { observador } from './appLogin.js';
//const checkear = require('./appLogin.js');
//observador();
//console.log("app.js OK !!!")

// Your web app's Firebase configuration

firebase.initializeApp({
    apiKey: "AIzaSyCdiNV-w8h_dvPL7FJZk9P7lxSVLikhArg",
    authDomain: "pylp2024-87ff3.firebaseapp.com",
    databaseURL: "https://pylp2024-87ff3-default-rtdb.firebaseio.com",
    projectId: "pylp2024-87ff3",
    storageBucket: "pylp2024-87ff3.firebasestorage.app",
    messagingSenderId: "431421279374",
    appId: "1:431421279374:web:6780ab1da2a00e1f560ddf"
});
    
    // Initialize Firebase
    var db = firebase.firestore();

function validacion(nombre, apellido, fecha){
    console.log('Entro a Validar');
    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        alert('[ERROR] El campo nombre debe tener un valor');
        //document.fvalida.nombre.focus()
        return false;
    }
    else if (apellido == null || apellido.length == 0 || /^\s+$/.test(apellido)) {
        alert('[ERROR] El campo apellido debe tener un valor');
        //document.fvalida.apellido.focus()
        return false;
    }
    else if (fecha == null || fecha.length == 0 || /^\s+$/.test(fecha)) {
        alert('[ERROR] El campo Fecha debe tener un valor');
        //document.fvalida.fecha.focus()
        return false;
    } else {
        //document.fvalida.submit();
        console.log('Validacion OK');
        return true;     
    }
    // Si el script ha llegado a este punto, todas las condiciones
    // se han cumplido, por lo que se devuelve el valor true
    
}

//Agrega un elemento a la collection User
function guardar() {
    var nombre = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var categoria = document.getElementById('categorias').value;
    var fecha = document.getElementById('fecha').value;

    if (validacion(nombre, apellido, categoria, fecha)) {
        console.log('Entró al if del guardar');
        db.collection("users").add({
            first: nombre,
            last: apellido,
            category: categoria,
            born: fecha
        })
        .then(function(docRef) {
            console.log("Documento agregado con ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('categorias').value = 'Individual'; // Restablecer a opción por defecto
            document.getElementById('fecha').value = '';
            alert("Tus datos se registraron con éxito");
        })
        .catch(function(error) {
            console.error("Error al agregar documento: ", error);
        });
    } else {
        alert("Por favor, completa todos los campos antes de guardar.");
    }
}

    
    // Leer Registros
    var tabla = document.getElementById('tabla');
    //Con GET cuando agrego un user NO actualiza en tiempo real.
    //db.collection("users").get().then((querySnapshot) => {
    // Para que actualice en tiempo real se debe reemplazar el GET por Snap
    // ...tambien se debe eliminar el then, para evitar error en interprete
    var f = new Date();
    //document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    
    db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML='';
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        console.log(`${doc.id} => ${doc.data().first}`);

        tabla.innerHTML += `
            <tr>
            <th scope="row">${doc.id}</th> 
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().category}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().category}','${doc.data().born}')">Editar</button></td>
            </tr>
        `
    });
});
    
    // ELiminar registros
    //<td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
    function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        //console.log("id a eliminar: " + id);
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
    
    //Actualizar registro
function editar(id, nombre, apellido,categoria, fecha) {
    // Asignar valores a los campos de entrada
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('categorias').value = categoria;
    document.getElementById('fecha').value = fecha;

    // Configurar el botón de edición
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function() {
        const washingtonRef = db.collection("users").doc(id);

        // Obtener valores actualizados
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const categoria = document.getElementById('categorias').value;
        const fecha = document.getElementById('fecha').value;

        // Validar antes de actualizar
        if (validacion(nombre, apellido,categoria, fecha)) {
            console.log('Entró a validar por Editar');
            return washingtonRef.update({
                first: nombre,
                last: apellido,
                category: categoria,
                born: fecha,
            })
            .then(function() {
                console.log("Documento actualizado con éxito!");

                // Restablecer valores de entrada
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('categorias').value = 'Individual';
                document.getElementById('fecha').value = '';

                // Restablecer botón
                boton.innerHTML = 'Guardar';
                alert("Tus datos se editaron con éxito");
            })
            .catch(function(error) {
                console.error("Error al actualizar el documento: ", error);
            });
        }
    };
}
    

function registrar (){
    //console.log('Diste un clic')
    var email = document.getElementById('emailR').value;
    var clave = document.getElementById('claveR').value;
    console.log(email);
    console.log(clave);
    firebase.auth().createUserWithEmailAndPassword(email, clave)
    .then(function(){
        //SOLO SE EJECUTA VERIFICAR QUE EL USUARIO QUE SE ESTA REGISTRANDO
        verificar()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //alert(errorMessage);
        // ...
    });email-clave.html
}


function ingresar (){
    var email = document.getElementById('emailA').value;
    var clave = document.getElementById('claveA').value;
    firebase.auth().signInWithEmailAndPassword(email, clave)
    .then(function() {
        console.log("Usuario logueado correctamente");
        reiniciar();
        // Ahora que el usuario se ha logueado, no es necesario hacer nada más aquí.
        // El observador detectará el cambio de estado y actualizará la interfaz automáticamente.
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorMessage === "INVALID_LOGIN_CREDENTIALS"){
            alert("Error al iniciar sesión, verifique su correo y/o clave");
        }
        console.log(errorMessage);
        // ...
    });email-clave.html
}

function observador (){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
            console.log('Existe usuario activo');
            aparece(user);
            var displayName = user.displayName;
            var email = user.email;
            console.log("ESTO ES PARA MOSTRAR LA VERIFICACION VIA MAIL");
            console.log(user.emailVerified);
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
            
        } else {
            // User is signed out.
            console.log("usuario NO Loguedo");
            document.getElementById('login').style.display = "visible";
            document.getElementById('listado').style.display = "none";
            document.getElementById('navbar').style.display = "none";
            // ...
        }
    });
}

function aparece(user){
    
    var contenido = document.getElementById('navbar');
    if (user.emailVerified){
        contenido.innerHTML = `   
        <nav id="navbar" class="navbar">
            <p>Bienvenido/a <strong>${user.email}</strong></p> 
        <button id="btnCerrarSesion"class="btn btn-danger" style="display: visible;" onclick="cerrar()" >Cerrar Sesión</button>
        </nav>
        `;
        
        document.getElementById("login").style.display = "none";
        document.getElementById('btnCerrarSesion').style.display = "visible";
        document.getElementById('navbar').style.display = "visible";
        document.getElementById('listado').style.display = "visible";
        document.getElementById('listado').style.position = "center";

    }else{
        document.getElementById('login').style.display = "visible";
    }
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        document.getElementById("login").style.display = "visible";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('listado').style.display = "none";
        console.log("Saliendo....")
        location.reload();
    })
    .catch(function(error){
        console.log(error)
    })
}


function verificar(){
    //PARA CUALQUIER USER, VERIFICA ENVIANDO UN MAIL
    //SOLO SE DEBERÍA EJECUTAR PARA EL USUARIO QUE SE ESTA REGISTRANDO
    // VER CODIGO EN FUNCION REGISTRAR
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        // email sent
        console.log("Enviando correo...")
    }).catch(function(error) {
        // an error heppened
        console.log(error);
    });
}

let ejecutado = false;

function reiniciar() {
    if (!ejecutado) {
        console.log("La función se ejecuta por primera vez.");
        location.reload();
        ejecutado = true;  // Marca que la función ya ha sido ejecutada
    }
}

function crearTorneo() {
    db.collection("users").get()
        .then((querySnapshot) => {
            const grupos = {};

            // Agrupar participantes por categoría
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const { category, first, last } = data;
                const nombreCompleto = `${first} ${last}`;

                if (!grupos[category]) {
                    grupos[category] = [];
                }
                grupos[category].push(nombreCompleto);
            });

            // Generar torneo por categoría
            const torneos = {};
            for (const [categoria, participantes] of Object.entries(grupos)) {
                if (participantes.length < 2) {
                    console.log(`No hay suficientes participantes en la categoría ${categoria} para un partido.`);
                    continue;
                }

                torneos[categoria] = [];
                for (let i = 0; i < participantes.length; i++) {
                    for (let j = i + 1; j < participantes.length; j++) {
                        torneos[categoria].push(`${participantes[i]} vs ${participantes[j]}`);
                    }
                }
            }

            // Mostrar torneos en la consola o en el DOM
            for (const [categoria, matches] of Object.entries(torneos)) {
                console.log(`Partido categoría ${categoria}:`);
                matches.forEach(match => console.log(` - ${match}`));

                // Opcional: mostrar en el DOM
                const torneoContainer = document.getElementById('torneos');
                if (torneoContainer) {
                    torneoContainer.innerHTML += `<h3>Categoría ${categoria}</h3>`;
                    matches.forEach(match => {
                        torneoContainer.innerHTML += `<p>${match}</p>`;
                    });
                }
            }
        })
        .catch((error) => {
            console.error("Error al obtener datos de Firebase: ", error);
        });
}


observador();
