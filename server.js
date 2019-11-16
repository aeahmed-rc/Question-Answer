const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;

var db, collection;

const url = "mongodb+srv://demo:demo@cluster0-9qbbz.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "PalindromeAssignment";

app.listen(3000, () => {
  MongoClient.connect(url, {useNewUrlParser: true}, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('questions').find().toArray((err, result) => {

    if (err) return console.log(err)
    // console.log(result)
    res.render('index.ejs', {
      questions: result
    })

  })
})

app.post('/questions', (req, res) => {
  console.log(req.body.questions)

  db.collection('questions').save({questions: req.body.questions,answers:[]}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')

  })

})


app.put('/questions', (req, res) => {
console.log(req.body.answers)
  db.collection('questions')
    .findOneAndUpdate({questions:req.body.questions},
      {
        $push: {
          answers:req.body.answers
        }
      }, (err, result) => {
    if (err) return console.log(err)
    console.log('adding to database')
    res.redirect('/')

  })

})



app.delete('/questions', (req, res) => {
  console.log("WTF")
  db.collection('questions').findOneAndDelete({
    questions: req.body.questions,
    // button:req.body.button,

  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
// app.delete('/questions2', (req, res) => {
//   db.collection('questions').findOneAndDelete({
//     questions: req.body.questions
//   }, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })
