(function() {

    //Inicializar Firebase
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
    
    //Obtener elementos
    const preObject = document.getElementById('objeto');
    // PASO 3.
    const ulList = document.getElementById('lista');

    //Crear Referencias
    const dbRefObject = firebase.database().ref().child('curso');
    // PASO 4.
    const dbRefList = dbRefObject.child('alumnos');

    // Sincronizar cambios objeto
    //dbRefObject.on('value', snap => {preObject.innerText = JSON.stringify(snap.val(),null, 3);});
    // PASO 5.
    //Sincronizar los elemento añadidos en la lista
    dbRefObject.on('child_added', snap => console.log(snap.val()));

    // PASO 6. Visualizar objeto en el navegador. 
    dbRefList.on('value', snap => {ulList.innerText = JSON.stringify(snap.val(),null, 3);});
    
    } ());