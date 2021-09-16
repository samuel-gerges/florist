const express = require('express'); 
var mysql = require('mysql');
var bodyParser = require('body-parser');

const session = require('express-session');
const { name } = require('ejs');

const server = express();

server.set('view engine','ejs');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'gerges',
    passoword : '',
    database : 'dm'
});

connection.connect();

server.use(express.static(__dirname));
server.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: false,
}));

var currentNameUser;
var currentNameEmploye;
var connected = false;
var connected2 = false;

server.post('/accueil', function (req, res) {

    var isValidName;
    var isValidPwd;

    connection.query('SELECT * FROM utilisateur', function (err, rows, fields) {
        if (err) throw err;
        for (i = 0; i < rows.length; i++) {
            isValidName = false;
            isValidPwd = false;

            if (req.body['name'] == rows[i]['pseudo']) {
                isValidName = true;
            }
            if (req.body['password'] == rows[i]['mdp']) {
                isValidPwd = true;
            }
            if (isValidName && isValidPwd) {
                res.render('accueil', { name: req.body['name'] });
                currentNameUser = req.body['name'];
                connected = true;
                break;
            }
        }
        if (!(isValidName && isValidPwd)) {
            res.send("L'utilisateur ou le mot de passe entré ne correspond pas à un compte enregistré.");
        }
    });
});

server.post('/employes', function (req, res) {

    var isValidName2;
    var isValidPwd2;

    connection.query('SELECT * FROM employe', function (err, rows, fields) {
        if (err) throw err;
        for (i = 0; i < rows.length; i++) {
            isValidName2 = false;
            isValidPwd2 = false;

            if (req.body['name'] == rows[i]['pseudo']) {
                isValidName2 = true;
            }
            if (req.body['password'] == rows[i]['mdp']) {
                isValidPwd2 = true;
            }
            if (isValidName2 && isValidPwd2) {
                res.render('employes', { name: req.body['name'] });
                currentNameEmploye = req.body['name'];
                connected2 = true;
                break;
            }
        }
        if (!(isValidName2 && isValidPwd2)) {
            res.send("L'utilisateur ou le mot de passe entré ne correspond pas à un compte enregistré");
        }
    });
});

server.get('/index.html', function (req, res) {
    console.log("oui mec");
    req.session.destroy();
});

server.get('/employes', function(req, res) {
    if(connected2) {
        res.render('employes', {name: currentNameEmploye});
    }
    else {
        res.send("Vous devez vous connecter en tant qu'enmployé pour accéder à ce contenu!");
    }
});

server.get('/utilisateurs', function(req, res) {
    if(connected) {
        res.render('utilisateurs', {name: currentNameUser});
    }
    else {
        res.send("Vous devez vous connecter avant d'accéder à ce contenu!");
    }
});

server.get('/accueil', function(req, res) {
    if(connected) {
        res.render('accueil', {name: currentNameUser});
    }
    else {
        res.send("Vous devez vous connecter avant d'accéder à ce contenu!");
    }
});

server.get('/panier', function(req, res) {
    if(connected) {
        res.render('panier', {name: currentNameUser});
    }
    else {
        res.send("Vous devez vous connecter avant d'accéder à ce contenu!");
    }
});

server.get('/commandes', function (req, res) {
    if (connected) {
        res.render('commandes', {name: currentNameUser});
    }
    else {
        res.send("Vous devez vous connecter avant d'accéder à ce contenu!");
    }
});

server.get('/achat', function(req, res) {
    if(connected) {
        res.render('achat', {name: currentNameUser});
    }
    else {
        res.send("Vous devez vous connecter avant d'accéder à ce contenu!");
    }
});

server.listen(8080);
