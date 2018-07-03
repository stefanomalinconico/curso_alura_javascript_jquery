$(function () {
  var botoes = $(".botao-remover");
  botoes.each(function() {
    $(this).click(removeLinha);
  });

  $("#botao-placar").click(mostraPlacar);

  $("#botao-sync").click(sincronizaPlacar);
});

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function(data) {
    $(data).each(function(){
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  })
}

function sincronizaPlacar() {
  var placar = [];
  //Pegar todos os tr's que sejam filhos direto de tbody.
  var linhas = $("tbody>tr")
  linhas.each(function(){
    //Pega o primeiro td filho de tr
    var usuario = $(this).find("td:nth-child(1)").text();
    //Pega o segundo td filho de tr
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {usuario: usuario, pontos: palavras};

    //Insere no array
    placar.push(score);
  });
  var dados = {
    placar: placar
  }
  $.post("http://localhost:3000/placar", dados, function(){
    console.log("Salvamos o placar no servidor");
    $(".tooltip").tooltipster("open").tooltipster("content",
    "Sucesso ao sincronizar");
  }).always(function(){
    setTimeout(function() {
      $(".tooltip").tooltipster("close");
    }, 1200);

  }).fail(function() {
    $(".tooltip").tooltipster("open").tooltipster("content",
    "Falha ao sincronizar");
  });
}

function mostraPlacar() {
  // o toggle é pra evitar inserir lógicas de hide() e show()
  //$(".placar").toggle();

  //slideToggle: Insere animação e abstrai a lógica de slideDown ou slideUp
  //stop: Pára a animação anterior e inicia a nova. Necessidade que surge quando o usuário fica clicando rapidamente.
  $(".placar").stop().slideToggle(600);// o parâmetro é em milissegundos

}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = $("#usuarios").val();
  var numPalavras = $("#contador-palavras").text();

  //var botaoRemover = "<a href='#' class='botao-remover'><i class='small material-icons'>delete</i></a>" ;

  /*  var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";
  */
  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  //prepend escreve antes. append escreve depois.
  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
  scrollPlacar();
}

function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top;
  $("body").animate(
  {
    scrollTop: posicaoPlacar+"px"
  }, 1000);
}

function novaLinha(nomeUsuario, numeroPalavras) {
  // criando um elemento html tr
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(nomeUsuario);
  var colunaPalavras = $("<td>").text(numeroPalavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}


function removeLinha(event) {
  event.preventDefault();
  var linha = $(this).parent().parent();

  //Tem tbm o fadeIn e o fadeToggle
  /*
  linha.fadeOut(1000);
  setTimeout(function() {
      linha.remove();
  }, 1000);
  */

  //Outra forma de fazer o código acima.
  linha.fadeOut(1000,function() {
      linha.remove();
  });


}
