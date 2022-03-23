//Filtra a tabela
filtraTabela();

//Atualiza a tabela com as informações do formulário
function atualizaTabela(event) {
    var form = document.querySelector("#form");
    if (form.checkValidity() == true) {
        //previne a página de atualizar
        event.preventDefault();

        //Extrai as infos do form
        var pessoa = getInfoForm(form);

        //Adiciona pessoa na tabela
        addPessoa(pessoa);

        //reseta o formulário após o click

        form.reset();
    }

}

//Adiciona pessoa na tabela
function addPessoa(pessoa) {
    //cria os elementos da tabela
    var pessoaTr = montaTr(pessoa);

    //adiciona a pessoa na tabela
    var tabela = document.querySelector("#tabelaCorpo");
    tabela.appendChild(pessoaTr);


}

//Pega as Informações da pessoa no formulário
function getInfoForm(form) {
    var pessoa = {
        nome: form.nome.value,
        niver: form.niver.value,
        tel: form.tel.value,
        email: form.email.value,
        tempoFalta: calculaNiver()
    }

    return pessoa;
}

//Monta a Linha da tabela
function montaTr(pessoa) {
    var pessoaTr = document.createElement("tr");
    pessoaTr.classList.add("pessoa");

    pessoaTr.appendChild(montaTd(pessoa.nome, "info-nome"));
    pessoaTr.appendChild(montaTd(pessoa.niver, "info-niver"));
    pessoaTr.appendChild(montaTd(pessoa.tel, "info-tel"));
    pessoaTr.appendChild(montaTd(pessoa.email, "info-email"));
    pessoaTr.appendChild(montaTd(pessoa.tempoFalta, "info-tempo"));

    return pessoaTr;
}

//Monta a Coluna da Linha
function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

//Filtra a tabela pela pesquisa
function filtraTabela() {
    var campoFiltro = document.querySelector("#filtraTabela");

    campoFiltro.addEventListener("input", function () {
        var pessoas = document.querySelectorAll(".pessoa");

        if (this.value.length > 0) {
            for (var i = 0; i < pessoas.length; i++) {
                var pessoa = pessoas[i];
                var tdNome = pessoa.querySelector(".info-nome");
                var nome = tdNome.textContent;
                var expressao = new RegExp(this.value, "i");

                if (!expressao.test(nome)) {
                    pessoa.classList.add("invisivel");
                } else {
                    pessoa.classList.remove("invisivel");
                }
            }
        } else {
            for (var i = 0; i < pessoas.length; i++) {
                var pessoa = pessoas[i];
                pessoa.classList.remove("invisivel");
            }
        }
    });

    return campoFiltro;
}

function calculaNiver() {
    var agora = new Date();
    var niver = document.getElementById("niver").value;
    var anoCalculo = agora.getFullYear();

    var ano_pessoa = niver.split('-')[0];
    var mes_pessoa = niver.split('-')[1] - 1;
    var dia_pessoa = niver.split('-')[2];

    if (mes_pessoa < agora.getMonth()) {
        anoCalculo = anoCalculo + 1;
    } else if (mes_pessoa == agora.getMonth() && dia_pessoa < agora.getDate()) {
        anoCalculo = anoCalculo + 1;
    }

    var niverValido = new Date(anoCalculo, mes_pessoa, dia_pessoa);

    var diff = niverValido.getTime() - agora.getTime();

    var diffDia = Math.round((niverValido.getTime() - agora.getTime()) / (1000 * 60 * 60 * 24));

    var diffMes = diffDia / 30;

    var diffMesExt = Math.floor(diffDia / 30);

    var sobraDia = Math.round((diffMes - diffMesExt) * 30);

    var resultado = ("Faltam " + diffMesExt + " meses e " + sobraDia + " dias");


    if (diffMesExt == 0 && sobraDia != 0) {
        if (sobraDia == 1) {
            resultado = ("Falta " + sobraDia + " dia");
        } else {
            resultado = ("Faltam " + sobraDia + " dias");
        }
    } else if (diffMes != 0 && sobraDia == 0) {
        if (diffMes == 1) {
            resultado = ("Faltam " + diffMesExt + " mes");
        } else {
            resultado = ("Faltam " + diffMesExt + " meses");
        }
    } else if (diffMesExt == 0 && sobraDia == 0) {
        resultado = ("É hoje! Feliz Aniversário!");
    }
    console.log(resultado);

    return resultado;
}