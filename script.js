// Script para controlar as abas e inicializar funcionalidades
document.addEventListener("DOMContentLoaded", () => {
  // Controle das abas
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab")

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to current tab and content
      tab.classList.add("active")
      document.getElementById(tabId).classList.add("active")

      // Show mostruario if that tab is selected
      if (tabId === "mostruario-tab") {
        document.getElementById("mostruario").style.display = "grid"
      }
    })
  })

  // Botões de ordenação do mostruário
  const btnOrdenarPreco = document.getElementById("btn-ordenar-preco")
  const btnOrdenarAlfabetica = document.getElementById("btn-ordenar-alfabetica")

  if (btnOrdenarPreco) {
    btnOrdenarPreco.addEventListener("click", ordenarPorPreco)
  }

  if (btnOrdenarAlfabetica) {
    btnOrdenarAlfabetica.addEventListener("click", ordenarPorOrdemAlfabetica)
  }

  // Modificar o comportamento do botão calcular para mostrar o resultado
  const btnCalcular = document.getElementById("calcular")
  if (btnCalcular) {
    btnCalcular.addEventListener("click", () => {
      // Declare calculo_valor_total here or ensure it's imported
      if (typeof calculo_valor_total === "function") {
        calculo_valor_total()
        document.getElementById("resultado").style.display = "block"
      } else {
        console.error("calculo_valor_total is not defined.")
        // Optionally display an error message to the user
        alert("Erro: A função de cálculo não está disponível.")
      }
    })
  }
})

// Função para ordenar os itens por preço
function ordenarPorPreco() {
  const categorias = document.getElementsByClassName("categoria")

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i]
    const itens = categoria.getElementsByClassName("item")

    const sortedItens = Array.from(itens).sort((a, b) => {
      // Extrai o preço do texto do item
      const precoTextoA = a.textContent.match(/Preço: R\$ ([\d,.]+)/)
      const precoTextoB = b.textContent.match(/Preço: R\$ ([\d,.]+)/)

      if (!precoTextoA || !precoTextoB) return 0

      const precoA = Number.parseFloat(precoTextoA[1].replace(".", "").replace(",", "."))
      const precoB = Number.parseFloat(precoTextoB[1].replace(".", "").replace(",", "."))

      return precoA - precoB
    })

    // Reinsere os itens ordenados
    for (let j = 0; j < sortedItens.length; j++) {
      categoria.appendChild(sortedItens[j])
    }
  }
}

// Função para ordenar os itens por ordem alfabética
function ordenarPorOrdemAlfabetica() {
  const categorias = document.getElementsByClassName("categoria")

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i]
    const itens = categoria.getElementsByClassName("item")

    const sortedItens = Array.from(itens).sort((a, b) => {
      const textoA = a.querySelector("strong").textContent.toLowerCase()
      const textoB = b.querySelector("strong").textContent.toLowerCase()

      return textoA.localeCompare(textoB)
    })

    // Reinsere os itens ordenados
    for (let j = 0; j < sortedItens.length; j++) {
      categoria.appendChild(sortedItens[j])
    }
  }
}
