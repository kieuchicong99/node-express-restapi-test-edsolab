const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departmentSchema = new Schema({
    name: {
        type: String
    },
    created_at: {
        type: Date
    }
}, {
    collection: 'departments'
})

module.exports = mongoose.model('DepartmentSchema', departmentSchema)