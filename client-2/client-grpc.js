//* Criando uma instância do arquivo .proto
//* Conectando-se ao servidor

const grpc = require('grpc');
const PROTO_PATH = '../server/notes.proto';

const NoteService = grpc.load(PROTO_PATH).NoteService;
//* Criando o objeto sem SSL (Não seguro)
const client = new NoteService(`localhost:50051`,
    grpc.credentials.createInsecure());
    
module.exports = client;