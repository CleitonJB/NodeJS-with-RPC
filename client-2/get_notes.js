//* Importando o modulo criado no passo anterior
//* Chamando o metodo List RPC e retornando os dados na console

const client = require('./client-grpc')
const prompt = require('prompt-sync')();

var valor = prompt('Valor (reais) para ser investido por 6 meses: ');
var juros = prompt('Percentual de juros mensal: ');

// console.log(`Montante: ${valor}\n`);
// console.log(`Juros: ${juros}\n`);

client.calcular({ valor, juros }, (error, dados) => {
    if (!error) {
        const data = dados.resultado[0];
        //console.log(data);
        console.log("\nResultado final:");
        console.log(`- Valor inicial investido (reais): R$ ${data.valorInicial}`);
        console.log(`- Juros mensal (porcentagem): ${data.jurosMensal} %`);
        console.log(`\nNo final dos ${data.meses} meses, você terá R$ ${parseFloat(data.montante).toFixed(2)}. O juros composto totaliza R$ ${parseFloat(data.jurosComposto).toFixed(2)}.`);
    } else {
        console.error(error);
    }
});