const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    pass_word: {
        type: String
    }
}, {
    collection: 'customers'
})

module.exports = mongoose.model('CustomerSchema', customerSchema)