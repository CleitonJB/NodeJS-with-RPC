//* Estamos passando o arquivo do arquivo .proto
//* Criando uma chamado com o server

const grpc = require('grpc')
const PROTO_PATH = '../server/notes.proto'
const NoteService = grpc.load(PROTO_PATH).NoteService
const client = new NoteService('localhost:50051',
    grpc.credentials.createInsecure())
    
module.exports = client