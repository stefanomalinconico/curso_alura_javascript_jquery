//var frase = jQuery(".frase");
// faz a mesma coisa de:
//var frase = $(".frase");
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


$(document).ready(function(){ // mesma coisa de $(document).ready(function(){...});
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    atualizaPlacar();
    $('#usuarios').selectize({
      create: true,
      sortField: 'text'
    });
    $(".tooltip").tooltipster({
      trigger: "custom"
    });
});

function atualizaTamanhoFrase() {
    var frase = $("#frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
    campo.on("input",function(){
        // Pra recuperar conteúdo de elementos de input usa-se .val
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaMarcadores (){

  campo.on("input",function(){
    var frase = $(".frase");
    var conteudoDigitado = campo.val();
    var comparavel = frase.text().substr(0, conteudoDigitado.length);
    if (conteudoDigitado == comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}


function inicializaCronometro() {

    // com o 'one' ao invés do 'on', a função só
    // executada uma vez.

    // Desabilita o botão enquanto se digita;
    $("#botao-reiniciar").attr("disabled",true);

    //campo.css("background-color", "white");
    //campo.addClass("campo-ativado");

    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
        //Insere um intervalo em milissegundos.
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {

                //Pára o intervalo
                clearInterval(cronometroID);

                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
  campo.attr("disabled", true);

  //toggle é o mesmo que ligar e desligar a classe.
  campo.toggleClass("campo-desativado");

  //campo.removeClass("campo-ativado");

  // Reabilita o botão;
  $("#botao-reiniciar").attr("disabled",false);
  inserePlacar();
}

$("#botao-reiniciar").click(reiniciaJogo);
function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    //toggle é o mesmo que ligar e desligar a classe.
    //pode ser passado um segundo parâmetro (true/false);
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
