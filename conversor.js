const unidades = {
  0: "zero",
  1: "um",
  2: "dois",
  3: "três",
  4: "quatro",
  5: "cinco",
  6: "seis",
  7: "sete",
  8: "oito",
  9: "nove",
}

const dezenas = {
  10: "dez",
  11: "onze",
  12: "doze",
  13: "treze",
  14: "quatorze",
  15: "quinze",
  16: "dezesseis",
  17: "dezessete",
  18: "dezoito",
  19: "dezenove",
  2: "vinte",
  3: "trinta",
  4: "quarenta",
  5: "cinquenta",
  6: "sessenta",
  7: "setenta",
  8: "oitenta",
  9: "noventa",
}

const centenas = {
  1: "cento",
  2: "duzentos",
  3: "trezentos",
  4: "quatrocentos",
  5: "quinhentos",
  6: "seiscentos",
  7: "setecentos",
  8: "oitocentos",
  9: "novecentos",
}

function numeroParaExtenso(numero) {
  if (numero === 0) {
    return "zero"
  }

  if (numero < 0 || numero >= 1000000000000) {
    throw new Error("O número deve estar entre 0 e 999.999.999.999")
  }

  const valorInteiro = Math.floor(numero)
  const centavos = Math.round((numero % 1) * 100)

  let extenso = ""
  if (valorInteiro > 0) {
    extenso += numeroParaExtensoInteiro(valorInteiro) + " reais"
  }

  if (centavos > 0) {
    extenso += ` e ${numeroParaExtensoCentavos(centavos)}`
  }

  return extenso
}

function numeroParaExtensoInteiro(numero) {
  const bilhoes = Math.floor(numero / 1000000000)
  const milhoes = Math.floor((numero / 1000000) % 1000)
  const milhares = Math.floor((numero / 1000) % 1000)
  const unidades_ = Math.floor(numero % 1000)

  let extenso = ""
  if (bilhoes > 0) {
    extenso += `${numeroParaExtensoUnidades(bilhoes)} bilhão${bilhoes > 1 ? "s" : ""}`
  }

  if (milhoes > 0) {
    if (extenso) {
      extenso += " "
    }
    extenso += `${numeroParaExtensoUnidades(milhoes)} milhão${milhoes > 1 ? "es" : ""}`
  }

  if (milhares > 0) {
    if (extenso) {
      extenso += " "
    }
    extenso += `${numeroParaExtensoUnidades(milhares)} mil`
  }

  if (unidades_ > 0) {
    if (extenso) {
      extenso += " "
    }
    extenso += numeroParaExtensoUnidades(unidades_)
  }

  return extenso
}

function numeroParaExtensoCentavos(numero) {
  if (numero === 1) {
    return "um centavo"
  } else {
    return numeroParaExtensoUnidades(numero) + " centavos"
  }
}

function numeroParaExtensoUnidades(numero) {
  if (numero === 100) {
    return "cem"
  }

  let extenso = ""

  const centena = Math.floor(numero / 100)
  const dezena = Math.floor((numero / 10) % 10)
  const unidade = Math.floor(numero % 10)

  if (centena > 0) {
    extenso += centenas[centena]
    if (dezena === 0 && unidade === 0) {
      return extenso
    }
  }

  if (dezena > 0) {
    if (extenso) {
      extenso += " e "
    }
    if (dezena === 1) {
      extenso += dezenas[dezena * 10 + unidade]
      return extenso
    }

    extenso += dezenas[dezena]
  }

  if (unidade > 0) {
    if (extenso) {
      extenso += " e "
    }
    extenso += unidades[unidade]
  }

  return extenso
}

function converterParaExtenso() {
  const numeroDigitado = Number.parseFloat(document.getElementById("numero").value)
  const resultado = numeroParaExtenso(numeroDigitado)
  document.getElementById("resultado-cheque").innerText = `O valor por extenso é: ${resultado}`
}
