const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const flash = require('flash');
const userRouter = require("./routes/user");
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');

const path = require('path');

//session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// Conf HTML
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Conf bodyparser

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

// Conexão com o mongoDBA

mongoose.connect("mongodb+srv://admin:admin@cluster0-krymp.mongodb.net/Wnews", {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// validacao
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'), 
        root    = namespace.shift(), 
        formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
// flash

app.use(flash());

// Imagem

let dir = path.join(__dirname, 'img');

app.use('/img', express.static(dir));


// Rota sz

app.get('/user/update', function (req, res) {

  res.render('atualizacao');

});

app.get('/user/cadastro', function (req, res) {

    res.render('cadastro');

});


app.use('/user', userRouter);



// Abrir Servidor

app.listen(process.env.PORT || 5000, () => {
  console.log('aaa')
})