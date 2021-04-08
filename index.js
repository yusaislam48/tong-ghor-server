const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 4000;
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json()) 
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gukge.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const breakfastCollection = client.db("tong-ghor").collection("breakfast");
  const lunchCollection = client.db("tong-ghor").collection("lunch");
  const dinnerCollection = client.db("tong-ghor").collection("dinner");

  console.log('connected')
  
  dinnerCollection.insertMany([
    {
    name: "Baked Chicken",
    image: "https://i.ibb.co/pPkbhJM/dinner1.png",
    price: 9.99
    },
    {
    name: "Lemony Salmon Piccata",
    image: "https://i.ibb.co/gRzK8yj/dinner2.png",
    price: 10.99
    },
    {
    name: "Garlic Butter Baked Salmon",
    image: "https://i.ibb.co/q59VxrV/dinner3.png",
    price: 6.99
    },
    {
    name: "French Fries With Cheese",
    image: "https://i.ibb.co/thfvVmZ/dinner4.png",
    price: 8.99
    },
    {
    name: "Pork Tenderloin With Quinoa Pilaf",
    image: "https://i.ibb.co/swNXrPF/dinner5.png",
    price: 9.99
    },
    {
    name: "Salmon With Lentil Salad",
    image: "https://i.ibb.co/12j66wY/dinner6.png",
    price: 23.99
    }
    ])
  .then(function(result) {
    console.log(result)
  })

  app.get('/breakfast', (req, res) => {
    breakfastCollection.find()
    .toArray((error, documents) => {
      res.send(documents)
    })
  })
  
  app.get('/lunch', (req, res) => {
    lunchCollection.find()
    .toArray((error, documents) => {
      res.send(documents)
    })
  })

  app.get('/dinner', (req, res) => {
    dinnerCollection.find()
    .toArray((error, documents) => {
      res.send(documents)
    })
  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
