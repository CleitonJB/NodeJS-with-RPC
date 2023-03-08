const grpc = require('grpc');
const notesProto = grpc.load('../server/notes.proto');

const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' }
];

const server = new grpc.Server();

server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, notes)
    },
    calcular: (_, callback) => {
        console.log("Parâmetros: ", _.request);

        const resultado = calcularJuros(_.request.valor, _.request.juros);

        callback(null, { resultado });
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

    return { valor: parseFloat(valor).toString(), juros: juros.toString(), meses: '6', jurosComposto: porcentagem.toString(), montante: parseFloat(capitalTotal).toString() };
}

server.bind(`127.0.0.1:50051`, grpc.ServerCredentials.createInsecure());
console.log(`Servidor rodando em http://127.0.0.1:50051`);
server.start();

//* Fontes
//  - https://www.mundojs.com.br/2020/07/31/introducao-ao-grpc-com-node-js/