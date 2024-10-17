const mongoose = require('mongoose');

const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI_DEV, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch(err => {
        console.log(`Server Error: ${err}`)
    })
}

module.exports = connectDatabase;