var mongoose = require("mongoose");
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// EXIBIR  USURAIOS

exports.list = function (req, res, next) {

    User.find(function (err, usuarios) {

        if (err) {

            return res.status(406).json({

                "error": "Sem usuarios"

            });

        } else {

            return res.status(200).json({

                "response": usuarios

            })

        };

    });

};

// ADICIONAR USUARIO.

exports.create = function (req, res) {

    let nome = req.body.nome;
    let numero = req.body.numero;
    let categoria = req.body.categoria;
    let horario = req.body.horario;
    let senha = req.body.senha;

    req.checkBody('nome', 'Preencha o campo nome').notEmpty();
    req.checkBody('numero', 'Preencha o campo numero').notEmpty();
    req.checkBody('senha', 'Preencha o campo senha').notEmpty();
    req.checkBody('horario', 'Escolha algum horario').notEmpty();
    req.checkBody('categoria', 'Escolha alguma categoria').notEmpty();

    var errors = req.validationErrors();

    if (errors) {

        res.render('cadastro', { errors: errors });

    } else {

        User.findOne({ numero : { 
            
            "$regex": "^" + numero + "\\b", "$options": "i" 
        
        }}, function (err, user) {

            if (user) {
                
                var errors = [{ msg : 'Numero já cadastrado!' }];
                res.render('cadastro', { errors: errors });

            } else {

                var newUser = new User({

                    nome: nome,
                    numero: numero,
                    senha: senha,
                    horario: horario,
                    categoria: categoria

                });

                newUser.save(function (err, result) {

                    if (err) {

                        console.log(err)
                        throw err;
                    
                    } else {

                        var semErros = [{ msg : 'Usuario '+nome+' Cadastrado com sucesso!' }];
                        res.render('cadastro', { semErros: semErros });
                        console.log(result);
                        
                    }

                });


            }
        })

        

    }

}

// ALTERRAR DADOS DE USUARIOS

exports.update = function (req, res, next) {

    let nome = req.body.nome;
    let numero = req.body.numero;
    let categoria = req.body.categoria;
    let horario = req.body.horario;
    let senha = req.body.senha;

    req.checkBody('senha', 'Preencha o campo senha').notEmpty();
    req.checkBody('numero', 'Preencha o campo numero').notEmpty();

    var errors = req.validationErrors();

    if (errors) {

        res.render('atualizacao', { errors: errors });
        
    } else {

        User.find({numero: numero, senha: senha}, function (err, result) {

            if (err) {

                var errors = [{ msg : err }];

                res.render('atualizacao', { errors: errors });

            }

            else {

                if (result.length) {

                    let dados = {

                        'nome': nome,
                        'numero': numero,
                        'categoria': categoria,
                        'horario': horario,
                        'senha': senha

                    };

                    for (let key in dados) {

                        if (dados[key] == undefined || dados[key] == '') {

                            delete dados[key];

                        }

                    }

                    User.updateOne({
                        numero: numero
                        }, {
                            "$set": dados
                        },
                        function (err, result) {

                            if (err) {

                                var semErros = [{ msg : err }];

                                res.render('atualizacao', { semErros: semErros });

                            } else {
            
                                var errors = [{ msg : 'Dados atualizados com Sucesso!' }];

                                res.render('atualizacao', { errors: errors });
            
                            }

                        }
                    )
    
                } else {

                    var errors = [{ msg : 'Numero ou senha invalidos!' }];

                    res.render('atualizacao', { errors: errors });

                }
            }
        })

    }

}
