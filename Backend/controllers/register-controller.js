const userModel = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {

    const { username, email, password } = req.body;

    let existingUser;

    //===== Présence d'utilisateur dans la base de données

    try {
        existingUser = await userModel.findOne({ email: email });
    } catch (error) {
        console.log(error);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "Email déja utilisé.  Veuillez-vous connecter plutôt que de vous réinscrire" });
    }

    // Hash du mot de passe
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, 10);

    // creation d'un utilisateur
    const user = new userModel({
        username: username,
        email: email,
        password: hashedPassword
    });

    // Enregistrement d'utilisateur
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    return res
        .status(201)
        .json({ message: "Utilisateur crée avec succès !", user: user })
           
}

exports.register = register;