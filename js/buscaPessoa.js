//import dados from "./dados.xml";

function buscaPessoa(event) {
    event.preventDefault();

    var buscaBotao = document.querySelector("#buscaPessoa");;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //Ainda sem url para receber as infos, para teste usar: https://api-pacientes.herokuapp.com/pacientes

    xhr.addEventListener("load", function () {
        var erroAjax = document.querySelector("#erro-ajax");
        
        erroAjax.classList.add("invisivel");
        
        if (xhr.status == 200) {
            var resposta = xhr.responseText;
            var pessoasExt = JSON.parse(resposta);

            pessoasExt.forEach(function (pessoa) {
                addPessoa(pessoa);
            });
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            
            erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send();
}