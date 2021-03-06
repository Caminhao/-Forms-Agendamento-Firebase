var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
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

    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("Telefone");

        let cnome = document.getElementById("txtNome").value;
        let ctelefone = document.getElementById("txtTelefone").value;
        let corigem = document.getElementById("txtOrigem").value;
        let cdata_contato = document.getElementById("txtDataContato").value;
        let cobservacao = document.getElementById("txtObservacao").value;

        var db = firebase.firestore();
        var ag = db.collection("banco").where("Telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("banco").doc(doc.id);

                return dados.update({
                    Nome: cnome,
                    Telefone: ctelefone,
                    Origem: corigem,
                    Data_contato: cdata_contato,
                    Observacao: cobservacao
                })
                .then(() => {
                    console.log("Documento atualizado com sucesso!");
                    window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Erro atualizando documentos: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Erro ao buscar os dados: ", error);
        });

    }

};

app.initialize();