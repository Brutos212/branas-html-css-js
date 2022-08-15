class Lancamento {
    constructor (categoria, tipo, valor){
        if(tipo !== "receita" && tipo !== "despesa"){
            throw new Error("Lançamento Inválido: Tipo deve ser receita ou despesa")
        }

        if (valor <=0){
            throw new Error("Lançamento Inválido: Valor deve ser maior que zero")
        }
        if (categoria === ""){
            throw new Error("Lançamento Inválido: A Caregoria é obrigatoria")
        }

        this.categoria = categoria
        this.tipo = tipo
        this.valor = valor
    }
}



function arrendondar(valor) {
    return Math.round(valor * 100) / 100
}

function calcularJuros(valor) {
    juros = arrendondar(valor * 0.1)
    return juros
}

function calcularRendimentos (valor) {
    rendimentos = arrendondar(valor * 0.005)
    console.log(rendimentos)
    return rendimentos
}
      

function calcularSaldo(mes, saldoInicial,  lancamentos) {
    console.log(mes)
    totalizadorDoMes = {saldo: 0, juros: 0, rendimentos: 0, receita:0, despesa: 0}
    totalizadorDoMes.saldo = saldoInicial

    for (lancamento of lancamentos){
        if (lancamento.tipo ==="receita"){
            totalizadorDoMes.saldo += lancamento.valor
        }
        if(lancamento.tipo === "despesa"){
            totalizadorDoMes.saldo -= lancamento.valor
        }

    }

    estaNegativo = totalizadorDoMes.saldo < 0
    if (estaNegativo) {
        juros = calcularJuros(totalizadorDoMes.saldo)
        totalizadorDoMes.saldo = arrendondar(totalizadorDoMes.saldo + juros)
    } else {
        rendimentos = calcularRendimentos(totalizadorDoMes.saldo)
        totalizadorDoMes.saldo = arrendondar(totalizadorDoMes.saldo + rendimentos)
    }
    return totalizadorDoMes
}

saldoInicial = 0

lancamentosJaneiro = [
    new Lancamento( "Salário",  "receita", 3000), 
    new Lancamento( "Aluguel",  "despesa", 1000), 
    new Lancamento( "Conta de Luz",  "despesa", 200), 
    new Lancamento( "Conta de Agua",  "despesa", 100), 
    new Lancamento( "Internet",  "despesa",  100), 
    new Lancamento( "Transporte",  "despesa",  300), 
    new Lancamento( "Lazer",  "despesa",  300), 
    new Lancamento( "Alimentação",  "despesa",  500),
    new Lancamento( "Condominio",  "despesa",  300), 
    new Lancamento( "Farmácia",  "despesa",  100)
]

saldo1 = calcularSaldo("janeiro", saldoInicial, lancamentosJaneiro)
console.log(saldo1)

lancamentosFevereiro = [
    new Lancamento( "Salario",  "receita",  3000), 
    new Lancamento( "ALuguel",  "despesa",  1200), 
    new Lancamento( "Conta de Luz",  "despesa",  250), 
    new Lancamento( "Conta de Agua",  "despesa",  100), 
    new Lancamento( "Internet",  "despesa",  100), 
    new Lancamento( "Transporte",  "despesa",  500), 
    new Lancamento( "Alimentação",  "despesa",  1000), 
    new Lancamento( "Condominio",  "despesa",  400)
]

saldo2 = calcularSaldo("feveiro", saldo1, lancamentosFevereiro)
console.log(saldo2)

lancamentosMarco = [
    new Lancamento( "Salário",  "receita",  4000), 
    new Lancamento( "Aluguel",  "despesa",  1200), 
    new Lancamento( "Conta de Luz",  "despesa",  200), 
    new Lancamento( "Conta de Agua",  "despesa",  100), 
    new Lancamento( "Internet",  "despesa", 200), 
    new Lancamento( "Transporte",  "despesa",  500), 
    new Lancamento( "Lazer",  "despesa", 800), 
    new Lancamento( "Alimentação",  "despesa",  1000), 
    new Lancamento( "Condominio",  "despesa",  400)
]

saldo3 = calcularSaldo("marco", saldo2, lancamentosMarco)
console.log(saldo3)
acumuladoAno = saldo3
console.log("ano")
console.log(acumuladoAno)
