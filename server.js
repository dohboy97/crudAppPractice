console.log('may node be with you')

const express = require('express');
const bodyParser = require ('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();



MongoClient.connect('mongodb+srv://dohboy1997:JKcfkFnFx5IGRrKN@cluster0.qj4uy.mongodb.net/?retryWrites=true&w=majority')
.then(client => {
    // ...
    const db = client.db('star-wars')

    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

   

app.use(bodyParser.urlencoded( {extended: true}))

app.listen(3000, function () {
    console.log('listening on 3000')
})

app.get('/', (req,res) =>{
    // res.sendFile(__dirname + '/index.html')

    const cursor = db.collection('quotes').find().toArray()
    .then(results =>{
        res.render('index.ejs', {quotes: results})
    })
    
})

app.post('/quotes', (req,res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch (error => console.error(error))
})
  })
  .catch(console.error)