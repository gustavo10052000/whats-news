var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true,
        unique: true
    },
    categoria: {
        type: Array,
        required: true
    },
    horario: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("usuarios", usuarioSchema, "usuarios");