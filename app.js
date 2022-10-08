const express = require("express");
const path = require("path");
//const fs = require("fs");
const app = express();
//const bodyParser = require("body-parser");
const port = 8000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/contactDance");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// main().catch(err => console.log(err));

// async function main() {
//      await mongoose.connect('mongodb://localhost:27017/contactDance');
// }
//Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
}); 
//compiling the models 
var Contact = mongoose.model('kity', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('staticfolder')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, '/views_directory')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    //const con = "This is the best content on the internet so far so use it wisely"
    //const params = {'title': 'PubG is the best game', "content": con}
    // res.status(200).render('firstweb_HTML.pug'); //, params
    res.status(200).render('firstweb_HTML.pug');
})

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body); 
    myData.save().then(()=>{
        res.send("This item has been Saved to database.")
    }).catch(()=>{
     res.status(400).send("This item has not been Saved to database.")
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});