
const express = require ('express');

const bodyParser =require('body-parser')
const app = express();

const MongoClient = require ('mongodb').MongoClient

MongoClient.connect('', {useUnifiedTopology: true})
    .then(client =>{
        console.log('Connected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
        app.use(express.static('public'))
        app.get('/',(req, res)=>{
            db.collection('quotes').find().toArray()
            .then(results=>{
                res.render('index.ejs', { quotes : results })
            })
            .catch(err=>{
                console.log(err)
            })

        app.put('/quotes', (req, res)=>{
            quotesCollection.findOneAndUpdate(
                { name : 'Yoda'},
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert:true
                }
                )
                .then(result =>{
                    res.json('Success')
                })
                .catch(err =>{
                    console.log(err)
                })
                
        })
            
    
         })
        app.post('/quotes', (req,res)=>{
            quotesCollection.insertOne(req.body)
        .then(result =>{
            res.redirect('/')
        })
        .catch(error => console.log(error))
        })

        app.delete('/quotes', (req,res)=>{
            quotesCollection.deleteOne(
                {name: req.body.name},
            )
            .then(result =>{
                res.json(`Deleted Darth Vader's Quote`)
            })
            .catch(error => console.error(error))
        })


        app.listen(3000, function(){
            console.log('listening on server 3000')
        })
    })

    .catch(error => console.log(error))

    
