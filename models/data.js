var mongoose = require('mongoose')
var url = 'mongodb://localhost:27017/music'
var Schema = mongoose.Schema

mongoose.connect(url, (database,err)=>{
    if(err) throw err;

    console.log('connection to mongodb is successful.')
})

var musicSchema = new Schema({
    name: String,
    date: String,
    artist: String
})
var musicstore= mongoose.model('music',musicSchema)



module.exports = musicstore;