"use strict";
var express = require("express")
    , logfmt = require("logfmt")
    , fs = require('fs')
    , pg = require("pg")
    , url = require('url')
    , app = express();
var strl;
var port = Number(process.env.PORT || 5000);

var conString = "postgres://kyhetrqttjglpi:949BScb2C_YjRZKFH2eA5ngz7-@ec2-54-235-245-180.compute-1.amazonaws.com:5432/d3i4729gmg7s1o";  //production
//var conString = "postgres://sssr:hui@localhost/postgres";  //develop
var index = fs.readFileSync('Framework/index.html');
app.use(express.static('Framework'));
app.use(logfmt.requestLogger());

app.listen(port, function () {
    console.log("Listening on " + port);
});

app.get('/', function (req, res) {
    res.end(index);
});

//@todo  ПОМОЕМУ КЛИЕНТ БД НЕ ЗАКРЫВАЕТСЯ
app.get('/register', function (req, res) {
    var url_parts = url.parse(req.url, true)
        , id = parseInt(url_parts.query.id);

    if (typeof id == 'number') {
        getRegister(id, res);
    } else {
        var str = {
            rating: 0,
            amount: 0,
            rights: 0
        };
        str = JSON.stringify(str);
        str = del_spaces(str);
        console.log('Ошибка в getRegister');
        res.end(str);
    }
});

app.get('/fresh', function (req, res) {
    var url_parts = url.parse(req.url, true)
        , id = parseInt(url_parts.query.id)
        , amount = parseInt(url_parts.query.amount)
        , rights = parseInt(url_parts.query.rights);
    if (typeof amount == 'number' && typeof rights == 'number' && typeof id == 'number' && !(isNaN(amount) || isNaN(id) || isNaN(rights))) {
        fresh(id, amount, rights, res)
    } else {
        res.end(null);
    }
});



//
//
//
//
//app.get('/rating', function (req, res) {
//    var url_parts = url.parse(req.url, true)
//        , id = parseInt(url_parts.query.id)
//        , amount = parseInt(url_parts.query.amount)
//        , rights = parseInt(url_parts.query.rights);
//    if (typeof amount == 'number' && typeof rights == 'number' && typeof id == 'number' && !(isNaN(amount) || isNaN(id) || isNaN(rights))) {
//        insertRating(id, amount, rights, res)
//    } else {
//        var str = {
//            rating: 0,
//            amount: 0,
//            rights: 0
//        };
//        str = JSON.stringify(str);
//        str = del_spaces(str);
//        console.log('Ошибка в getRating');
//        res.end(str);
//    }
//});





app.get('/users', function (req, res) {
    if(strl == undefined) {return}
    res.end(strl);
});


setInterval(function () {
    // Каждые 10 сек. сканирует БД и составляет новый рейтинг.
    var client = new pg.Client(conString);
    client.connect();
    client.query('SELECT id FROM hsk ORDER BY rating DESC', [], function (err, result) {
        var array = [];
        console.log(result.rows.length);
        if (result.rows.length > 12) {
            var length = 12
        } else {
            length = result.rows.length
        }
        for (var i = 0; i < length; i++) {
            if (result.rows[i].id == undefined) {
                break
            }
            array.push(result.rows[i].id)
        }
        strl = array.join();
        strl = del_spaces(strl);
//        strl = '['+strl+']';
        client.end();
    });
}, 10000);



function del_spaces(str) {
    // Удаляет пробелы
    str = str.replace(/\s/g, '');
    return str;
}


function getRegister(id, res) {
    var client = new pg.Client(conString);
    client.connect();
    client.query('SELECT amount,rights,rating FROM hsk WHERE id = $1', [id], function (err, result) {
        if (err) { client.end();
        } else {
        if (result.rows.length > 0) {
            var rating = parseInt(result.rows[0].rating),
                amount = parseInt(result.rows[0].amount),
                rights = parseInt(result.rows[0].rights);
            if (typeof amount == 'number' && typeof rights == 'number' && typeof id == 'number' && !(isNaN(amount) || isNaN(rating) || isNaN(rights))) {
                var  str = {
                    rating: result.rows[0].rating,
                    amount: result.rows[0].amount,
                    rights: result.rows[0].rights
                };
                str = JSON.stringify(str);
                str = del_spaces(str);
                res.end(str);
                client.end();
            }

                str = {
                rating: 0,
                amount: 0,
                rights: 0
            };
                str = JSON.stringify(str);
                str = del_spaces(str);
                res.end(str);
                client.end();
        } else {
            client.query("INSERT INTO hsk (id, amount, rights, date, rating) VALUES ($1, $2, $3, $4, $5);",
                [id, '0', '0', new Date(), 0], function (err, result) {
                    if (err) { client.end();
                    } else {
                    var str = {
                        rating: 0,
                        amount: 0,
                        rights: 0
                    };
                    str = JSON.stringify(str);
                    str = del_spaces(str);
                    res.end(str);
                    client.end();
                }
            });
        }
        }
    })
}

function fresh(id, amount, rights, res) {
    var client = new pg.Client(conString);
    client.connect();
    client.query("UPDATE hsk SET amount=$1, rights=$2, date=$4, rating=$5 WHERE id=$3 ",
        [amount, rights, id, new Date(), setRating(amount,rights)], function (err, result) {
        if (err) {
            res.end(null);
            client.end();
        } else {
            res.end(null);
            client.end();
        }
    });
}

function setRating(amount,rights) {
    if (amount < 100) { return 0}
    //ололо  магическое число!!!!
    return  ((rights * rights) / (amount * amount))+(Math.random()/100);
}