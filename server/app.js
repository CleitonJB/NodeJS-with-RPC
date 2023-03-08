const grpc = require('grpc');
const notesProto = grpc.load('../server/notes.proto');

const server = new grpc.Server();

server.addService(notesProto.NoteService.service, {
    calcular: (_, callback) => {
        console.time("Tempo de processamento");

        console.log(`\nIP do cliente: (${_.getPeer()})`);

        const resultado = calcularJuros(_.request.valor, _.request.juros);
        callback(null, { resultado });

        console.timeEnd("Tempo de processamento");
    },
});

function calcularJuros(valor, juros) {
    let capitalTotal = 0;
    let valorMensal  = 0;
    let porcentagem  = 0;

    for(let i = 1; i <= 6; i++) {
        capitalTotal = valor * (1 + juros / 100) ** i;

        valorMensal = capitalTotal - valor;
  
        porcentagem = valorMensal / valor;
    }

    return { 
        valorInicial:  parseFloat(valor).toString(), 
        jurosMensal:   juros.toString(), 
        meses:         '6', 
        jurosComposto: (parseFloat(capitalTotal) - parseFloat(valor)).toString(), 
        montante:      parseFloat(capitalTotal).toString() 
    };
}

server.bind(`127.0.0.1:50051`, grpc.ServerCredentials.createInsecure());
console.log(`Servidor rodando em http://127.0.0.1:50051`);
server.start();