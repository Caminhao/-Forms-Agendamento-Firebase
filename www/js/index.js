var app = {
        
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener("click",app.inserir);  
    },

    inserir: function(){
        var db = firebase.firestore();

        let cnome = document.getElementById("txtNome").value;
        let ctelefone = document.getElementById("txtTelefone").value;
        let corigem = document.getElementById("txtOrigem").value;
        let cdata_contato = document.getElementById("txtDataContato").value;
        let cobservacao = document.getElementById("txtObservacao").value;

        db.collection("banco").add({
            Nome: cnome,
            Telefone: ctelefone,
            Origem: corigem,
            Data_contato: cdata_contato,
            Observacao: cobservacao
        })
        .then((docRef) => {
            console.log("Documento escrito com o ID: ", docRef.id);
            window.location.href = cordova.file.applicationDirectory + "index.html";
        })
        .catch((error) => {
            console.error("Erro ao buscar os dados: ", error);
        });

    }  
};

app.initialize();