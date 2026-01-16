exports.login = (req, res) => {
    const { email, password } = req.body;

    // Simulation de vérification
    if (email === "janedoe@xxx.com" && password === "1234567") {
        console.log("Succès ! Redirection vers dashboard...");
        return res.redirect('/dashboard'); 
    } else {
        console.log("Échec : Identifiants incorrects.");
        return res.redirect('/users/auth/login?error=1');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};