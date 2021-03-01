const mongoose = require('mongoose');
module.exports=()=>{
  mongoose.connect('mongodb+srv://meavci:<password>@cluster0.5uqz0.mongodb.net/movieapp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open',()=>{console.log('MongoDB Connected success')})
mongoose.connection.on('error',(err)=>{console.log('MongoDB: Connection failed:',err)})
}
