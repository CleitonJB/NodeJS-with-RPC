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
        console.log("Calculando papai");
        console.log(_.request);

        callback(null, { resultado: {valor: '1', juros: '2', meses: '3', jurosComposto: '4', montante: '5'}})
    },
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Servidor rodando em http://127.0.0.1:50051');
server.start();

//* Fontes
//  - https://www.mundojs.com.br/2020/07/31/introducao-ao-grpc-com-node-js/