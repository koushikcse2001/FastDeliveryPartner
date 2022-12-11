
// Import the mongoose module and .env
const mongoose = require("mongoose");
const file=require("./index");
const StartDbConnection = () => {
    // "mongodb://localhost:27017/ecom"
    // Set up default mongoose connection
    const mongoDB = `mongodb://${file.link.NameURL}/${file.link.DbName}`;
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Connection MongoDB Successfull!!'))
    .catch((err)=>console.log('Something was wrong!!'+err));
    // Get the default connection
    const db = mongoose.connection;
    // Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
StartDbConnection();














///////////////////////extra note for knowdage

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const database='index';
// const client=new MongoClient(url);

// async function getData() {

//     let result= await client.connect();
//     let db=result.db(database);
//     let collection=db.collection('data');
//     let response = await collection.find({}).toArray();
//     console.log(response);
// }
// getData();


// // Import the mongoose module
// const mongoose = require("mongoose");
// // Set up default mongoose connection
// const mongoDB = "mongodb://127.0.0.1/index";
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connnection seccessfull!!"))
//     .catch((err) => console.log("Something was wrong!!" + err));
// // Get the default connection
// const db = mongoose.connection;
// // Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));



