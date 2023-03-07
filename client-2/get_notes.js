//* Importando o modulo criado no passo anterior
//* Chamando o metodo List RPC e retornando os dados na console

const client = require('./client-grpc')
client.list({}, (error, notes) => {
    if (!error) {
        console.log(notes)
    } else {
        console.error(error)
    }
})