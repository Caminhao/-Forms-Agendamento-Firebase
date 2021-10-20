var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnExcluir").addEventListener("click",app.excluir);
    },
    
    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("Telefone");

        var db = firebase.firestore();
        var ag = db.collection("banco").where("Telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("txtNome").value = doc.data().Nome;
                document.getElementById("txtTelefone").value = doc.data().Telefone;
                document.getElementById("txtOrigem").value = doc.data().Origem;
                document.getElementById("txtDataContato").value = doc.data().Data_contato;
                document.getElementById("txtObservacao").value = doc.data().Observacao;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },

    excluir: function(){ 
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("Telefone");

        var db = firebase.firestore();
        var ag = db.collection("banco").where("Telefone", "==", getTelefone);

        navigator.notification.confirm(
            'Deseja realmente excluir esse registro?',  // message
            onConfirm,         // callback
            'Excluir',         // title
            ['Sim','Não']      // buttonName
        );

        function onConfirm(buttonIndex) {
            // do something
            if(buttonIndex == 1){
                ag.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection("banco").doc(doc.id).delete().then(() => {
                            console.log("Document successfully deleted!");
                            window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            }
        }

    }

};

app.initialize();