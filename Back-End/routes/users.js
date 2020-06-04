var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');


const config = {
  user: 'labarbera.luca',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'labarbera.luca', //(Nome del DB)
}
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      res.send(result);
      sql.close();
    });

  });
}
/* GET users listing. */

router.get('/login/:user/:psw', function (req, res, next) {
  let sqlQuery = `select count( IdUtente) FROM T_Utente WHERE email='${req.params.user}' AND PSW='${req.params.psw}'`;
  executeQuery(res, sqlQuery, next);
});
router.get('/serch/:user/:psw', function (req, res, next) {
  let sqlQuery = `select IdUtente FROM T_Utente WHERE email='${req.params.user}' AND PSW='${req.params.psw}'`;
  executeQuery(res, sqlQuery, next);
});



router.post('/registrazione', function (req, res, next) {
  let utente = req.body;
  if (!utente) {
    next(createError(400 , "Please provide a correct user"));
  }
  sql.connect(config, err => {
    let sqlRequest = new sql.Request();
    let sqlInsert = `INSERT INTO T_Utente (nome,cognome, email, PSW, citta) VALUES ('${utente.nome}','${utente.cognome}','${utente.email}','${utente.PSW}', '${utente.citta}')`;
    sqlRequest.query(sqlInsert, (error, results) => {
        if (error) throw error;
        res.send({success:true, message: "utente inserita con successo"})
    });
  })
});
router.post('/', function (req, res, next) {
  let prenotazione = req.body;
  if (!prenotazione) {  //Qui dovremmo testare tutti i campi della richiesta
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return;
  }
  let sqlInsert = `INSERT INTO T_Noleggio (IdUtente, IdBici, Dataprelievo, Oraprelievo, latitudineprelievo, longitudineprelievo) 
                     VALUES (${prenotazione.id},${prenotazione.idBici},'${prenotazione.dataInizio}', '${prenotazione.oraInizio}', '${prenotazione.lat}', '${prenotazione.lng}')`;
  executeQuery(res, sqlInsert, next);
  res.send({success:true, message: "Prenotazione con successo", prenotazione: prenotazione})
});


router.post('/:id', function (req, res, next) { 
  let rilascio = req.body;
  if (!rilascio) {  //Qui dovremmo testare tutti i campi della richiesta
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return; 
  }
  let sqlUpdate = `Update T_Noleggio set Datarilascio = '${rilascio.dataFine}', Orarilascio = '${rilascio.oraFine}', longitudinerilascio = '${rilascio.lng}', latitudinerilascio = '${rilascio.lat}' where IdUtente = ${rilascio.id} and IdBici = ${rilascio.idBici} and Dataprelievo ='${rilascio.dataInizio}' and Oraprelievo = '${rilascio.oraInizio}'`;
  executeQuery(res, sqlUpdate, next);
  res.send({success:true, message: "Rilascio con successo", rilascio: rilascio}) 
});
module.exports = router;

