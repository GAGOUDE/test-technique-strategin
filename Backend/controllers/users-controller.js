const userModel = require('../models/User');

const users = async (req, res, next) => {

   const usersFromDB = await userModel.find();

//    console.log(usersFromDB);
    
    return res
        .status(201)
        .json({ message: "Les utilisateurs enregistrés dans la base de données", usersFromDB: usersFromDB })

}

exports.users = users;