import mongoose from 'mongoose';

const user = 'carlosmarquesdev';
const password = 'NBWfOeMZhTqTZ2DU';
const dbName = '1999Burguer';

const mongoDBUrl = `mongodb+srv://${user}:${password}@cluster0.fvdbal6.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Conecte-se ao MongoDB
mongoose.connect(mongoDBUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));

db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});