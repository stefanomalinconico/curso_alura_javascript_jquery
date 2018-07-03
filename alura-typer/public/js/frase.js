$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
  //trocaFraseAleatoria é a função chamada ao final do get
  //$.get("http://localhost:3000/frases", trocaFraseAleatoria);
  $("#spinner").toggle();
  $.ajax({
						url: "http://localhost:3001/frases",
						dataType: "json",
						cache: false,
						success: trocaFraseAleatoria
					})
          // callback pra quando houver erro.
          .fail(function(){
            $("#erro").toggle();
            setTimeout(function() {
              $("#erro").toggle();
            }, 2000);
          })
          .always(function(){
            $("#spinner").toggle();
          });
}

function trocaFraseAleatoria(data) {
  var numeroAleatorio = Math.floor(Math.random() * data.length);
  var novaFrase = data[numeroAleatorio].texto;
  $(".frase").text(novaFrase);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
  $("#spinner").toggle();
  var fraseId = $("#frase-id").val();
  var dados = {id: fraseId};
  $.get("http://localhost:3001/frases", dados, trocaFrase)
  .fail(function() {
    $("#erro").toggle();
    setTimeout(function() {
      $("#erro").toggle();
    }, 2000);
  })
  .always(function(){
    $("#spinner").toggle();
  });
}

function trocaFrase(data){
  $(".frase").text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}
