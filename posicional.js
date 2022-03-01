////////////////////////////////////////////////////////////////////
// ! Cuidado, código feito as pressas e sem planejamento à frente!//
//                      Manuseie com cuidado                      //
////////////////////////////////////////////////////////////////////

let totalCaracteres = 0
let linhaPosicional = ""

let palavra1 = {campo: "Nome",valor: "Chavo", tamanho: 10, fillerDireita: true }
let palavra2 = {campo: "Sobrenome", valor: "Del Ocho", tamanho: 10, filler: "-"}
let palavra3 = {campo: "Idade", valor: "25", tamanho: 10, filler: 0}
let palavra4 = {campo: "Cidade", valor: "Acapulco", tamanho: 15, filler: "\xa0"}
let palavra5 = {campo: "Bairro", valor: "Guarujá", tamanho: 10, filler: "\xa0"}
let palavra6 = {campo: "Telefone", valor: "11-6565-6574", tamanho: 15, filler: "0"}

let palavras = [palavra1, palavra2, palavra3, palavra4, palavra5, palavra6]

function palavrasProcessadas() {
  return palavras.map(palavra => {
    let processada = palavra
    // Identificando espaço e transformando em \xa0
    if (!palavra.filler || palavra.filler === ' ' || palavra.filler === '  ') { // TODO: Pensar em solução melhor para aceitar qualquer quantidade de espaços
      palavra.filler = "\xa0";
    }
    return processada
  })
}

let body = document.querySelector("body")

let ultimaClasse = []
let ultimasTeclas = []

body.addEventListener("keyup", ev => {
  ultimasTeclas.push(ev.key) // Permite que pule certo quando aperta "Tab"
  if (ultimasTeclas.length > 2) {
    ultimasTeclas.shift()
  }
  try {
    ultimaClasse = ev.target.attributes[1].nodeValue.split('_')
  } catch {
    // console.log("não pegou");
  }
  if(ev.key == "Tab" && ultimasTeclas[0] !== "Tab") {
    if (ultimaClasse[0] === 'campo') {
      document.querySelector(`#valor_${ultimaClasse[1]}`).focus()
    }
    if (ultimaClasse[0] === 'valor') {
      document.querySelector(`#tamanho_${ultimaClasse[1]}`).focus()
    }
    if (ultimaClasse[0] === 'tamanho') {
      document.querySelector(`#filler_${ultimaClasse[1]}`).focus()
    }
    if (ultimaClasse[0] === 'filler') {
      document.querySelector(`#fillerDireita_${ultimaClasse[1]}`).focus()
    }
  }
} )

function formataBonito(jsonStr) {
  return jsonStr.replaceAll('[', '[\n ')
                .replaceAll(',"', ',\n  "')
                .replaceAll(',{', ',\n {')
                .replaceAll('}]', '}\n]')
}

function objParaJson() { // Só quando clica em copiar
  let json = JSON.stringify(palavrasProcessadas())
  return formataBonito(json)
}

function exportar(str) {
  atualizaLista()
  if (str === 'json') {
    navigator.clipboard.writeText(objParaJson())
  } else {
    navigator.clipboard.writeText(document.querySelector('#linhaPosicional').innerText)
  }
  window.alert("Copiado para a área de transferência.")
}

// Download

filenameResultado = 'resultadoPosicional.txt'
filenameJSON = 'posicional.json'

function baixar(text, tipo) {
  let filename = ''

  if (tipo == 'exportResultado') {
    if (filenameResultado === null) {
      filenameResultado = 'resultadoPosicional.txt'
    }
    filenameResultado = prompt("Nome do arquivo:", filenameResultado)
    filename = filenameResultado !== '' ? filenameResultado : 'resultadoPosicional.txt'
  } else {
    if (filenameJSON === null) {
      filenameJSON = 'posicional.json'
    }
    filenameJSON = prompt("Nome do arquivo:", filenameJSON)
    filename = filenameJSON !== '' ? filenameJSON : 'posicional.json'
  }

  if (filename) { // Só segue se der OK no prompt
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
}

// Validação
function tipoDado(valor, tipo, index, nome) {
  // Recebe o tipo esperado do dado e retorna true se estiver certo
  let erro = ""
  if (valor && typeof valor !== tipo) {
    erro = `Na coluna ${index + 1}, '${nome}' deve ser do tipo ${tipo}.`
  }
  return erro.length ? erro : null
}

function campoExiste(valor, index, nome) {
  return erro = valor ? null : `Na coluna ${index + 1}, '${nome}' é obrigatório.`  
}

function validaCampos(array) {
  let erros = []

  if (!array.length) {
    erros.push("Formulário vazio.") // Fazer modificação para também informar arquivo
  }

  array.forEach((coluna, index) => {
    // Campos obrigatórios
    erros.push(campoExiste(coluna.campo, index, "campo"))
    erros.push(campoExiste(coluna.tamanho, index, "tamanho"))
    if (coluna.numero) { // TODO - até este momento esses campos nem são inseridos
      // Se existir esse objeto não pode ser vazio, e devem ter os tres campos preenchidos, inteiros, decimais e separador
    }

    // Tipos de dados
    erros.push(tipoDado(coluna.campo, "string", index, "campo"))
    erros.push(tipoDado(coluna.valor, "string", index, "valor"))
    erros.push(tipoDado(coluna.tamanho, "number", index, "tamanho"))
    erros.push(tipoDado(coluna.filler, "string", index, "Filler"))
    erros.push(tipoDado(coluna.fillerDireita, "boolean", index, "Filler à direita"))
    erros.push(tipoDado(coluna.obrigatorio, "boolean", index, "campo obrigatório")) //TODO, ainda não existe
    if (coluna.numero) { // TODO - até este momento esses campos nem são inseridos
      erros.push(tipoDado(coluna.numero.inteiros, "number", index, "inteiros")) // TODO
      erros.push(tipoDado(coluna.numero.decimais, "number", index, "decimal")) // TODO
      erros.push(tipoDado(coluna.numero.separador, "number", index, "separado números")) // TODO
    }
  })

  erros = erros.filter(erro => typeof erro === "string")

  return erros
}

//////////////////////////////////

function jsonParaObj(cmd) {
  let layoutImport = '[' + document.querySelector("#layoutImport").value + ']'
  layoutImport = layoutImport.replace('[[', '[')
                             .replace(']]', ']')
                             .replace(',]', ']')
  let erros = ''
  
  // TODO, os campos precisam ser validados
  try {  // TODO: Caso não esteja dentro de um array, adicionar para cair no try
    let json = JSON.parse(layoutImport)
    let tudoOk = false
    erros = validaCampos(json)

    if (erros.length) {
      alert(erros)
    } else {
      tudoOk = true
    }
    if (cmd === "addFinal" && tudoOk) {
      json.forEach(campo => palavras.push(campo))
      atualizaLista()
    } else if (cmd === "addCustom" && tudoOk) {
      let index = window.prompt("Deseja inserir após qual campo?")
      index = parseInt(index)
      
      try {
        if (!isNaN(index)) {
          palavras.splice(index, 0, ...json);
          atualizaLista()
        } else {
          window.alert("Precisa ser um número")
        }
        
      } catch (error) {
        console.log(error);
        // TODO
      }
    } else if (cmd === "sub" && tudoOk) {
      if (window.confirm("Isso irá apagar toda a lista e inserir o novo layout, deseja continuar?")) {
        palavras = json
        atualizaLista()
      }
    }
  } catch (e){ // TODO, se mandar sem estar em um array, só um obj cai aqui tbm
    window.alert("JSON inválido")
  }
}

const modeloNovoCampo = {campo: "", valor: "", tamanho: 10, filler: "\xa0"}

function limparCampos() {
  confirma = window.confirm("Deseja apagar todos os campos?")
  if (confirma) {
    palavras = [modeloNovoCampo]
    atualizaLista()
    document.querySelector(`#campo_${0}`).focus()
  }
}

function criaCampo(posicao, campo) {
  novaPosicao = posicao
  palavras.splice(novaPosicao, 0, campo)
  atualizaLista()
  document.querySelector(`#campo_${novaPosicao}`).focus()
}

function removeCampo(posicao) {
  palavras.splice(posicao, 1)
  if (!palavras.length) {
    palavras.push(modeloNovoCampo)
  }
  atualizaLista()
  try { // TODO Fazer solução melhor do que essa
    document.querySelector(`#campo_${posicao}`).focus()
  } catch (error) { // Migué demais usar isso
    document.querySelector(`#campo_${posicao - 1}`).focus()
  }
}

function moveCampo(posicaoOriginal, posicaoFinal, foco) {
  if (palavras[posicaoFinal + 1]) { // Garante que não vai continuar movendo se não tem para onde ir
    let campo = palavras[posicaoOriginal]
    removeCampo(posicaoOriginal)
    criaCampo(posicaoFinal, campo)
    atualizaLista()
    document.querySelector(`#${foco}`).focus()
  }
}

function moveCampoPrompt(index) {
  novaPosicao = parseInt(prompt(`Deseja mover o campo ${index + 1} para qual posição?`)) - 1

  if (novaPosicao < 0) {
    novaPosicao = 0
  }
  
  if (novaPosicao || novaPosicao === 0) {
    moveCampo(index, novaPosicao, `btPosicao_${novaPosicao}`)
  }
  atualizaLista()
}

function limparFormulario() {
  confirma = window.confirm("Deseja apagar todos o formulário?")
  if (confirma) {
    document.querySelector("#layoutImport").value = ""
    atualizaLista()
    document.querySelector("#layoutImport").focus()
  }
}

function atualizaCampo(index, classeCSS) {
  if (classeCSS !== 'fillerDireita') {
    palavras[index][classeCSS] = document.querySelector(`#${classeCSS + '_' + index}`).value
    atualizaLista()
  } else { // fillerDireita
    if (document.querySelector(`#${classeCSS + '_' + index}`).checked) {
      palavras[index][classeCSS] = document.querySelector(`#${classeCSS + '_' + index}`).checked = true;
    } else {
      palavras[index][classeCSS] = document.querySelector(`#${classeCSS + '_' + index}`).checked = false;
    }
    atualizaLista()
    document.querySelector(`#${classeCSS + '_' + index}`).focus()
  }
}

function geraPosicao(valor, tamanho, filler = "0", fillerDireita) {
  saida = valor.toString()
  if (valor.length >= tamanho) {
    saida = saida.slice(0, tamanho)
  } else {
    if (fillerDireita) {
      while (saida.length <= tamanho) {
        saida += `${filler}`
      }
      saida = saida.slice(0, tamanho)
    } else { // Filler à esquerda
      while (saida.length <= tamanho) {
        saida = `${filler}` + saida
      }
      saida = saida.slice(saida.length - tamanho, saida.length)
    }
  }
  return saida
}

function geraLinhaInput(index, tipo, valor = false, classeCSS, placeholder, tamanhoCampo = 20) {
  // Se for número e tiver algum valor, não pode ter placeholder // TODO: Testar
  // TODO: Se o tipo for número mas o valor for string, deixar o tipo do valor, string
  let linha = ''
  if (tipo === "number" && valor.toString().length) {
    linha += `<input type="number" id="${classeCSS + '_' + index}" class="${classeCSS}" name="${classeCSS}" value="${valor.toString()}" size="${tamanhoCampo}" onchange="atualizaCampo(${index}, '${classeCSS}')">` //
  } else if (tipo === 'number') {
    linha += `<input type="${tipo}" id="${classeCSS + '_' + index}" class="${classeCSS}" name="${classeCSS}" placeholder="${placeholder}" value="${valor.toString()}" size="${tamanhoCampo}" onchange="atualizaCampo(${index}, '${classeCSS}')">`
  } else if (tipo === 'checkbox') {
    if (palavrasProcessadas()[index][classeCSS]) {
      linha += `<input type="${tipo}" id="${classeCSS + '_' + index}" class="${classeCSS}" name="${classeCSS}"  onchange="atualizaCampo(${index}, '${classeCSS}')" checked>`
    } else {
      linha += `<input type="${tipo}" id="${classeCSS + '_' + index}" class="${classeCSS}" name="${classeCSS}"  onchange="atualizaCampo(${index}, '${classeCSS}')">`
    }
  } else {
    linha += `<input type="${tipo}" id="${classeCSS + '_' + index}" class="${classeCSS}" name="${classeCSS}" placeholder="${placeholder}" value="${valor.toString()}" size="${tamanhoCampo}" onchange="atualizaCampo(${index}, '${classeCSS}')">`
  }

  return linha
}

function posicaoInicialFinal(totalCaracteres, tamanho) {
  let primeiraPosicao = totalCaracteres - tamanho + 1
  let posicaoFinal = totalCaracteres
  
  // as soluções a seguir estão uma porcaria :)
  if (primeiraPosicao < 10) {
    primeiraPosicao = "00" + primeiraPosicao.toString()
  } else if (primeiraPosicao < 100) {
    primeiraPosicao = "0" + primeiraPosicao.toString()
  }

  if (posicaoFinal < 10) {
    posicaoFinal = "00" + posicaoFinal.toString()
  } else if (posicaoFinal < 100) {
    posicaoFinal = "0" + posicaoFinal.toString()
  }
    return `<span class="posicaoInicialFinal">(${primeiraPosicao} - ${posicaoFinal}) </span>`
}

function geraInputsHTML({campo, valor, tamanho, filler, fillerDireita}, index, totalCaracteres) {
  let botaoRemover = ''
  if (palavrasProcessadas().length !== 1) {
    botaoRemover = `<button class="remover" id="botaoREM$_${index}" onclick="removeCampo(${index})">➖</button>`
  }

  let linha = `<div class="linhaPosicional_${index}" onmouseover="acenderCampos('linhaPosicional_${index}')" onmouseout="apagarCampos('linhaPosicional_${index}')">` +
              `<button id=btPosicao_${index} onclick="moveCampoPrompt(${index})">${index + 1}</button>   ` +
              geraLinhaInput(index, "text", campo, "campo", "Nome do campo (opcional)") +
              geraLinhaInput(index, "text", valor, "valor", "Valor") + 
              geraLinhaInput(index, "number", tamanho, "tamanho", "Tam" , 5) +
              posicaoInicialFinal(totalCaracteres, tamanho) +
              geraLinhaInput(index, "text", filler, "filler", "Filler", 4) +
              '<label>Filler à direita:</label>' +
              geraLinhaInput(index, "checkbox", fillerDireita, "fillerDireita", "Filler") +
              `<button class="adicionar" id="botaoADD_${index}" onclick="criaCampo(${index + 1}, modeloNovoCampo)">➕</button>` +
              botaoRemover +
              `<button class="move" id="botaoSobe_${index}" onclick="moveCampo(${index}, ${index - 1}, 'botaoSobe_${index - 1}')">⬆️ </button>` +
              `<button class="move" id="botaoDesce_${index}" onclick="moveCampo(${index}, ${index + 1}, 'botaoDesce_${index + 1}')">⬇️</button>` +
              `<button class="move" id="botaoDuplicar_${index}" onclick="criaCampo(${index + 1}, palavras[${index}])">📋</button>` +
              "</div>"
  return linha
}

// Dá para fazer algo melhor com essas duas funções
function acenderCampos(classeCSS) {
  document.querySelectorAll("." + classeCSS).forEach(input => {
    input.style.backgroundColor = "rgb(143, 143, 255)"
  })
}
function apagarCampos(classeCSS) {
  document.querySelectorAll("." + classeCSS).forEach(input => {
    input.style.backgroundColor = ""
  })
}

function atualizaLista() {
  const quebrarLinhas = document.querySelector('#quebrarLinhas').checked

  linhaPosicional = ''
  totalCaracteres = 0
  document.querySelector(".inputs").innerHTML = ''

  palavrasProcessadas().forEach((palavra, index) => {
    totalCaracteres += parseInt(palavra.tamanho)
    document.querySelector(".inputs").innerHTML += geraInputsHTML(palavra, index, totalCaracteres) + '<br>'
    
    // Separador negrito:
    if (index % 2 === 0) {
      linhaPosicional += '<b class="outraCor">'
    } else {
      linhaPosicional += "</b>"
    }
    linhaPosicional += `<span class="selected linhaPosicional_${index}" onmouseover="acenderCampos('linhaPosicional_${index}')" onmouseout="apagarCampos('linhaPosicional_${index}')">` + geraPosicao(palavra.valor, palavra.tamanho, palavra.filler, palavra.fillerDireita) + '</span>'
  })

  // Resultado
  if (linhaPosicional.length) {
    document.querySelector("#resultado").style.display = "block";
  } else {
    document.querySelector("#resultado").style.display = "none"; // TODO, testar
  }
  document.querySelector("#linhaPosicional").innerHTML = linhaPosicional
  document.querySelector("#tamanhoLinhaPosicional").innerText =  "Tamanho: " + totalCaracteres

  document.querySelector("#json").innerText = quebrarLinhas ? formataBonito(JSON.stringify(palavrasProcessadas())) : JSON.stringify(palavrasProcessadas())
}

atualizaLista()