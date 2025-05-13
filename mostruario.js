// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Define a ordenação inicial como "preco"
  let ordenacao = "preco"

  // Adiciona event listeners aos botões de ordenação
  const btnOrdenarPreco = document.querySelector('button[onclick="ordenarPorPreco()"]')
  const btnOrdenarAlfabetica = document.querySelector('button[onclick="ordenarPorOrdemAlfabetica()"]')

  // Declare the functions before using them
  function ordenarPorPreco() {
    ordenacao = "preco"
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

  function ordenarPorOrdemAlfabetica() {
    ordenacao = "alfabetica"
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

  if (btnOrdenarPreco) {
    btnOrdenarPreco.addEventListener("click", ordenarPorPreco)
  }

  if (btnOrdenarAlfabetica) {
    btnOrdenarAlfabetica.addEventListener("click", ordenarPorOrdemAlfabetica)
  }

  // Função para ordenar os itens por preço
  window.ordenarPorPreco = ordenarPorPreco

  // Função para ordenar os itens por ordem alfabética
  window.ordenarPorOrdemAlfabetica = ordenarPorOrdemAlfabetica

  // Função para mostrar o mostruário quando o botão for clicado
  window.mostrarMostruario = () => {
    const mostruario = document.getElementById("mostruario")
    if (mostruario.style.display === "none") {
      mostruario.style.display = "grid"
    } else {
      mostruario.style.display = "none"
    }
  }
})
