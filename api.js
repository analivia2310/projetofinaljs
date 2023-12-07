function obterMensagens() {
    var tabelaMensagens = $("#table-message tbody");

    tabelaMensagens.empty();

    $.ajax({
        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            data.forEach(function(mensagem) {
                var linha = '<tr>' +
                                '<td>' + mensagem.nome + '</td>' +
                                '<td>' + mensagem.email + '</td>' +
                                '<td>' + mensagem.mensagem + '</td>' +
                            '</tr>';
                tabelaMensagens.append(linha);
            });
        },
        error: function() {
            alert('Erro ao obter mensagens da API.');
        }
    });
}

obterMensagens();

function inserirMensagem(obj) {

    var inserir = $.ajax({

        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

$("#form-contact").submit(function(event) {
    event.preventDefault(); 

    var nome = $("#name").val();
    var email = $("#email").val();
    var mensagem = $("#message").val();

    var obj = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    inserirMensagem(obj);

    $("#name").val("");
    $("#email").val("");
    $("#message").val("");

    alert("Mensagem enviada!!!");
}); 


function validarUsuario(objLoginSenha) {

    var retorno = false;

    console.log(objLoginSenha);

    var validacao = $.ajax({
        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

$("#form-login").submit(function(event) {
    event.preventDefault();

    var email = $("#emailLogin").val();
    var senha = $("#passwordLogin").val();

    var objLoginSenha = {
        email: email,
        senha: senha
    };

    var resultadoValidacao = validarUsuario(objLoginSenha);

    $("#emailLogin").val("");
    $("#passwordLogin").val("");

    if (resultadoValidacao) {
        window.location.href = "/html/list.html";
    } else {
        alert("Dados inválidos");
    }

});