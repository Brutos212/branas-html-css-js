class Lancamento {

    constructor (categoria, tipo, valor){
        if(tipo !== "receita" && tipo !== "despesa"){
            throw new Error("Lançamento Inválido: Tipo deve ser receita ou despesa")
        }

        if (valor <= 0){
            throw new Error("Lançamento Inválido: Valor deve ser maior que zero")
        }
        if (categoria === ""){
            throw new Error("Lançamento Inválido: A Categoria é obrigatoria")
        }

        this.categoria = categoria
        this.tipo = tipo
        this.valor = valor
    }
}



function arredondar (valor) {
    return Math.round(valor * 100) / 100
}

function calcularJuros(valor) {
    juros = arredondar(valor * 0.1)
    return juros
}

function calcularRendimentos (valor) {
    rendimentos = arredondar(valor * 0.005)
    return rendimentos
}

function distribuirDespesas (lancamentos, total){
    distribuicaoDeDespesas = []
    for(lancamento of lancamentos){
        if(lancamento.tipo === "despesa"){
            percentual = arredondar((lancamento.valor / total)*100)
            distribuicaoDeDespesas.push({categoria: lancamento.categoria, percentual})

        }
        
    }
    return distribuicaoDeDespesas
}

function calcularSaldo (mes, saldoInicial,  lancamentos) {
    console.log(mes)
    totalizadorDoMes = {saldo: 0, saldoInicial, juros: 0, rendimentos: 0, receitas:0, despesas: 0, distribuicaoDeDespesas: []}
    totalizadorDoMes.saldo = saldoInicial

    for (lancamento of lancamentos){
        if (lancamento.tipo === "receita"){
            totalizadorDoMes.saldo += lancamento.valor
            totalizadorDoMes.receitas += lancamento.valor
        }
        if(lancamento.tipo === "despesa"){
            totalizadorDoMes.saldo -= lancamento.valor
            totalizadorDoMes.despesas += lancamento.valor
        }

    }
   
    totalizadorDoMes.distribuicaoDeDespesas = distribuirDespesas(lancamentos, totalizadorDoMes.despesas)
    estaNegativo = totalizadorDoMes.saldo < 0
    if (estaNegativo) {
        totalizadorDoMes.juros = calcularJuros(totalizadorDoMes.saldo)
        totalizadorDoMes.saldo = arredondar(totalizadorDoMes.saldo + totalizadorDoMes.juros)
    } else {
        totalizadorDoMes.rendimentos = calcularRendimentos(totalizadorDoMes.saldo)
        totalizadorDoMes.saldo = arredondar(totalizadorDoMes.saldo + totalizadorDoMes.rendimentos)
    }
    return totalizadorDoMes
}

saldoInicial = 0

lancamentosJaneiro = [
    new Lancamento( "Salário",  "receita", 3000), 
    new Lancamento( "Aluguel",  "despesa", 10000),
    new Lancamento( "Conta de Luz",  "despesa", 200), 
    new Lancamento( "Conta de Agua",  "despesa", 100), 
    new Lancamento( "Internet",  "despesa",  100), 
    new Lancamento( "Transporte",  "despesa",  300), 
    new Lancamento( "Lazer",  "despesa",  300), 
    new Lancamento( "Alimentação",  "despesa",  500),
    new Lancamento( "Condominio",  "despesa",  300), 
    new Lancamento( "Farmácia",  "despesa",  100)
]

totalizadorDoMes1 = calcularSaldo("janeiro", saldoInicial, lancamentosJaneiro)
console.log(totalizadorDoMes1)

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

totalizadorDoMes2 = calcularSaldo("fevereiro", totalizadorDoMes1.saldo, lancamentosFevereiro)
console.log(totalizadorDoMes2)

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

saldo3 = calcularSaldo("marco", totalizadorDoMes2.saldo, lancamentosMarco)
console.log(saldo3)
acumuladoAno = saldo3.saldo
console.log("ano")
console.log(acumuladoAno)