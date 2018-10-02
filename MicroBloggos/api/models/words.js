var mongoose = require('mongoose');
var WordsSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    theWords: {type: String, min: [5, 'Just say more than 4 letters?'],
    max: 140},
});  

var Words = mongoose.model('Words', WordsSchema);
module.exports = mongoose.model('Words', WordsSchema);

// var firstWords = new Words ({
//     theWords: 'This is so easy!',
// });
// firstWords.populate('user');
// firstWords.save(function(err) {
//     if (err) throw err;
 
//     console.log(firstWords.theWords);
// });