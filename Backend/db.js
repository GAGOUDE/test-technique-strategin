
const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    };

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connexion à MongoDB !");
    } catch (error) {
        console.log(error);
        console.log("Pas de connexion à MongoDB !");
    }
}