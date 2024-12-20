console.log('Entro al app');

(function() {

    // PASO 3. Inicializar Firebase
      const config = {
        apiKey: "AIzaSyCdiNV-w8h_dvPL7FJZk9P7lxSVLikhArg",
        authDomain: "pylp2024-87ff3.firebaseapp.com",
        databaseURL: "https://pylp2024-87ff3-default-rtdb.firebaseio.com",
        projectId: "pylp2024-87ff3",
        storageBucket: "pylp2024-87ff3.firebasestorage.app",
        messagingSenderId: "431421279374",
        appId: "1:431421279374:web:6780ab1da2a00e1f560ddf"

    };
      firebase.initializeApp(config);
    
      // PASO 4. Obtener elementos
      const preObject = document.getElementById('objeto');
    
      // PASO 5. Crear Referencias
      const dbRefObject = firebase.database().ref().child('curso');
    
      /* PASO 6. En firebase/Realtime creamos un objeto con la siguiente estructura:
        curso: {
          "nombre": "BDA",
          "Horas": 15,
          "institucion": "UNNE - UNaM"
        }
       */
      
      // PASO 7. Sincronizar cambios objeto por Consola
      dbRefObject.on('value', snap => console.log(snap.val()));
      
      // PASO 8. Otra opción para mostrar en pantalla
      dbRefObject.on('value', snap => {preObject.innerText = JSON.stringify(snap.val(),null, 3);});
    
    
    } ());