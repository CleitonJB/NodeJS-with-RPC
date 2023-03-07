//* Importando o modulo criado no passo anterior
//* Chamando o metodo List RPC e retornando os dados na console

const client = require('./client-grpc')
const prompt = require('prompt-sync')();

var valor = prompt('Valor (reais) para ser investido por 6 meses: ');
var juros = prompt('Percentual de juros mensal: ');

console.log(`Montante: ${valor}\n`);
console.log(`Juros: ${juros}\n`);

// client.list({}, (error, notes) => {
//     if (!error) {
//         console.log(notes)
//     } else {
//         console.error(error)
//     }
// });

client.calcular({valor, juros}, (error, notes) => {
    if (!error) {
        console.log(notes)
    } else {
        console.error(error)
    }
});