const mongoose = require('mongoose');
const envVariables = process.env;
console.log('env: ', envVariables);
const { DB_URI } = envVariables;
console.log(DB_URI);

mongoose
    .connect('mongodb+srv://admin:root@cluster0.taroxn5.mongodb.net/?retryWrites=true&w=majority', {
        // options for the connect method to parse the URI
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // sets the name of the DB that our collections are part of
        dbName: 'SoloDB',
    })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 86400, default: Date.now },
    userState: { type: Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('User', userSchema);