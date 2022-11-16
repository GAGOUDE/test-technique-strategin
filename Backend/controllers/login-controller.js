const userModel = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {

    const { email, password } = req.body;

    let existingUser;

    // ===== Présence ou pas d'Email dans la base de données
    try {
        existingUser = await userModel.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }

    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "Email ou Mot de passe incorrect !" })
    }

    // ===== Comparaison de mot de passe saisi et celui de la base de données
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({ message: 'Mot de passe incorrect' })
    }

    // Attribution d'un token avec un delai d'expiration
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    });

    return res
        .status(200)
        .json({ message: 'Connexion réussie !', user: existingUser, token :  token })

}

exports.login = login;


