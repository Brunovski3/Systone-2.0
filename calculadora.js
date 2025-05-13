// Dados de materiais, acabamentos, cubas e cooktop;

const materiais = {
  Ardósia: 250,
  "Ardósia Bipolida": 270,
  "Arabesco Samoa": 290,
  "Bege Prime": 980,
  "Branco Dallas": 360,
  "Branco Paraná Claro": 1450,
  "Branco Paraná Escuro": 1400,
  "Branco Prime": 1000,
  "Branco Siena": 540,
  "Cinza Castelo": 300,
  Cinza_Andorinha: 325,
  "Cinza Corumbá": 330,
  "Crema Marfil": 1400,
  "Dolomitico Pegasus": 700,
  Itaúnas: 550,
  "Itaúnas Escovado": 780,
  "Marrom Café": 620,
  "Marrom Café Comercial": 425,
  "Marrom Coral": 450,
  "Ocre Itabira": 300,
  Piracema: 600,
  "Preto Absoluto": 1575,
  "Preto Escovado": 625,
  "Preto São Gabriel": 490,
  "Quartzo Branco": 1380,
  "Quartzo Cinza": 1300,
  "Santa Cecília": 380,
  "Taj Mahal": 1900,
  Travertino: 400,
  Verde: 360,
  "Via Láctea": 625,
}

const acabamentos = {
  Boleado: 70,
  Reto: 50,
  "Meia esquadria": 85,
}

const cubas = {
  "Sem Cuba": 0,
  "Corte da Chopeira": 90,
  "Corte da Cuba": 90,
  "Corte da Cuba Gourmet": 170,
  "Corte Lixeira": 80,
  "Corte Calha Úmida": 85,
  "Cuba N¹46x30/14": 215,
  "Cuba N¹46x30/17": 235,
  "Cuba N²56x32/14": 235,
  "Cuba N²56x32/17": 285,
  "Cuba Oval Grande": 150,
  "Cuba Oval Pequena": 100,
}

const cooktop = {
  "Sem Corte": 0,
  "Com Corte Cooktop": 60,
}

function calculo_valor_total() {
  const material = document.getElementById("material").value
  const p_materiais = materiais[material]
  const p_cubas = cubas[document.getElementById("cubas").value]
  const p_cooktop = cooktop[document.getElementById("cooktop").value]
  const acabamento = document.getElementById("acabamento").value
  const p_acabamento = acabamentos[acabamento]
  const comp_pia = document.getElementById("comprimento-pia").value
  const larg_pia = document.getElementById("largura-pia").value
  const larg_saia = document.getElementById("largura-saia").value
  const larg_espelho = document.getElementById("largura-espelho").value
  const lados_M_saia = Number.parseInt(document.getElementById("lados-maiores-saia").value)
  const lados_m_saia = Number.parseInt(document.getElementById("lados-menores-saia").value)
  const lados_M_espelho = Number.parseInt(document.getElementById("lados-maiores-espelho").value)
  const lados_m_espelho = Number.parseInt(document.getElementById("lados-menores-espelho").value)

  const area_pia = larg_pia * comp_pia
  const preço_pia = area_pia * p_materiais

  const lados_saia = lados_m_saia * larg_pia + lados_M_saia * comp_pia
  const area_saia = lados_saia * larg_saia
  const valor_saia = area_saia * p_materiais

  const lados_espelho = lados_m_espelho * larg_pia + lados_M_espelho * comp_pia
  const area_espelho = lados_espelho * larg_espelho
  const valor_espelho = area_espelho * p_materiais

  const comp_saia = lados_saia
  const p_acabamentoTotal = comp_saia * p_acabamento

  const valorTotal = preço_pia + valor_saia + valor_espelho + p_acabamentoTotal + p_cubas + p_cooktop
  document.getElementById("resultado").innerHTML = `
        <h3>Resultado do Orçamento</h3>
        <p>O valor total da pia é <strong>R$${valorTotal.toFixed(2)}</strong></p>
        <p>Detalhamento:</p>
        <ul>
          <li>Preço da área da pia: R$${preço_pia.toFixed(2)}</li>
          <li>Preço da saia: R$${valor_saia.toFixed(2)}</li>
          <li>Preço do espelho: R$${valor_espelho.toFixed(2)}</li>
          <li>Preço do acabamento: R$${p_acabamentoTotal.toFixed(2)}</li>
          <li>Preço da cuba: R$${p_cubas.toFixed(2)}</li>
          <li>Corte Cooktop: R$${p_cooktop.toFixed(2)}</li>
        </ul>
        <p><strong>Observações:</strong></p>
        <p>Material utilizado: ${material}</p>
        <p>Preço do Material: R$${p_materiais.toFixed(2)}</p>
        `
}

// Função para atualizar o acabamento selecionado
function atualizar_acabamento() {
  let lados_M_saia = 0
  let lados_m_saia = 0

  const checkboxes = document.querySelectorAll(".checkbox-lado")
  const retangulo = document.querySelector(".retangulo")

  for (const checkbox of checkboxes) {
    const lado = checkbox.getAttribute("data-lado")
    const lado_elemento = retangulo.querySelector(`.lado.${lado}`)

    const cuba_element = retangulo.querySelector(".cuba")
    const cuba_selecionada = document.getElementById("cubas").value

    if (cuba_selecionada !== "Sem Cuba") {
      cuba_element.style.display = "block"
    } else {
      cuba_element.style.display = "none"
    }

    // Verifique se o lado correspondente está selecionado na seção espelho
    const espelho_check_box = document.querySelector(`.checkbox-lado-espelho[data-lado="${lado}"]`)
    if (espelho_check_box && espelho_check_box.checked) {
      checkbox.checked = false // Desmarque a caixa de seleção se o lado correspondente já estiver marcado
      continue // Pular para a próxima iteração
    }

    if (checkbox.checked) {
      lado_elemento.classList.add("lado-selecionado")
      if (lado === "superior" || lado === "inferior") {
        lado_elemento.classList.add("linha-verde")
        lados_M_saia++
      } else {
        lados_m_saia++
      }
    } else {
      lado_elemento.classList.remove("lado-selecionado")
      if (lado === "superior" || lado === "inferior") {
        lado_elemento.classList.remove("linha-verde")
      }
    }
  }

  document.getElementById("lados-maiores-saia").value = lados_M_saia.toString()
  document.getElementById("lados-menores-saia").value = lados_m_saia.toString()
}

function atualizar_espelho() {
  let lados_M_espelho = 0
  let lados_m_espelho = 0

  const checkboxes = document.querySelectorAll(".checkbox-lado-espelho")
  const retangulo = document.querySelector(".retangulo")

  for (const checkbox of checkboxes) {
    const lado = checkbox.getAttribute("data-lado")
    const lado_elemento = retangulo.querySelector(`.lado.${lado}`)

    const cuba_element = retangulo.querySelector(".cuba")
    const cuba_selecionada = document.getElementById("cubas").value

    if (cuba_selecionada !== "Sem Cuba") {
      cuba_element.style.display = "block"
    } else {
      cuba_element.style.display = "none"
    }

    // bloqueia se caso o usuário selecionar o mesmo lado
    const saia_check_box = document.querySelector(`.checkbox-lado[data-lado="${lado}"]`)
    if (saia_check_box && saia_check_box.checked) {
      checkbox.checked = false
      continue
    }

    if (checkbox.checked) {
      lado_elemento.classList.add("lado-selecionado1")
      if (lado === "superior" || lado === "inferior") {
        lado_elemento.classList.add("linha-azul")
        lados_M_espelho++
      } else {
        lados_m_espelho++
      }
    } else {
      lado_elemento.classList.remove("lado-selecionado1")
      if (lado === "superior" || lado === "inferior") {
        lado_elemento.classList.remove("linha-azul")
      }
    }
  }

  document.getElementById("lados-maiores-espelho").value = lados_M_espelho.toString()
  document.getElementById("lados-menores-espelho").value = lados_m_espelho.toString()
}

// Função para inicializar o código
function init() {
  // Adicionar event listeners para os checkboxes de saia
  const checkboxes_saia = document.querySelectorAll(".checkbox-lado")
  checkboxes_saia.forEach((checkbox) => {
    checkbox.addEventListener("change", atualizar_acabamento)
  })

  // Adicionar event listeners para os checkboxes de espelho
  const checkboxes_espelho = document.querySelectorAll(".checkbox-lado-espelho")
  checkboxes_espelho.forEach((checkbox) => {
    checkbox.addEventListener("change", atualizar_espelho)
  })

  // Adicionar event listener para o botão de calcular
  const botao_calcular = document.getElementById("calcular")
  botao_calcular.addEventListener("click", calculo_valor_total)

  // Adicionar event listener para o botão de limpar
  const botao_limpar = document.getElementById("limpar")
  botao_limpar.addEventListener("click", limpar_seleção)

  // Adicionar event listener para o select de cubas
  const select_cubas = document.getElementById("cubas")
  select_cubas.addEventListener("change", () => {
    atualizar_acabamento()
    atualizar_espelho()
  })
}

function limpar_seleção() {
  const check_box_saia = document.querySelectorAll(".checkbox-lado")
  const check_box_espelho = document.querySelectorAll(".checkbox-lado-espelho")

  check_box_saia.forEach((checkbox) => {
    checkbox.checked = false
  })

  check_box_espelho.forEach((checkbox) => {
    checkbox.checked = false
  })

  // Limpa os valores
  atualizar_acabamento()
  atualizar_espelho()
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init)
