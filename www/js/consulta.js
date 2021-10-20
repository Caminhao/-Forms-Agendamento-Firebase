var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnListar").addEventListener("click",app.listar);
    },

    listar: function(){
        var db = firebase.firestore();
        var ag = db.collection("banco");

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                $("#TableData").append("<tr>");
                $("#TableData").append("<td scope='col'>" + doc.data().Nome + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Telefone + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Origem + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Data_contato + "</td>");
                $("#TableData").append("<td scope='col'>" + doc.data().Observacao + "</td>");
                $("#TableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory + "www/editarClientes.html?Telefone=" + doc.data().Telefone + "'>Editar</a>&nbsp;|&nbsp;<a href='" + cordova.file.applicationDirectory + "www/excluirClientes.html?Telefone=" + doc.data().Telefone + "'>Excluir</a></td>");
                $("#TableData").append("</tr>");
            });
        })
        .catch((error) => {
            console.log("Erro ao buscar os dados: ", error);
        });
    }

};

app.initialize();