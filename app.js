const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser')
const musicstore = require('./models/data')
const mongoose = require('mongoose')
 


app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({extended:true}))
// default options
app.use(fileUpload({ safeFileNames: true,preserveExtension: true }));
 
app.use(express.static('public'))
//delete music

app.get("/delete/:id",(req,res)=>{
  musicstore.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err) throw err;
        res.redirect("/")
  })
  
})


app.get('/addmusic',(req,res)=>{
    res.render('index')
})
app.get('/',(req,res)=>{
  musicstore.find({}, (err, data)=>{
    var dat = data.reverse()
    res.render('lists',{
      musicname: dat
    })
  })
})

app.post('/upload', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
   
    // Use the mv() method to place the file somewhere on your server
    var uploadPath = __dirname + '/public/images/' + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.send(err);
   
        res.redirect("/");

      //save to database
     var newMusic = new musicstore({
        name: sampleFile.name,
        date: Date.now(),
        artist: req.body.artist
    })
    newMusic.save((err,result)=>{
        if(err){
            console.log(err)
        }
        console.log('saved')
    })
      console.log(sampleFile.name)
      
    });
  });

app.listen(8080,(req,res)=>{
    console.log('listening on port')
})