var express = require("express");
var router = express.Router();


const credential = {
    email: "clintps1010-pc@gmail.com",
    password: "1234"
}
router.get('/', (req, res) => {
    console.log(req.session.logged);
    if (req.session.logged) {
        res.redirect('/dashboard')
    } else {

        res.render("base", { title: "Login System"})
    }
})

//login user details
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        req.session.logged = true
        res.redirect('/dashboard')
    } else {
        res.end("Invalid user name or password")
    }
})


//route for dashboard

router.get('/dashboard', (req, res) => {

    if (req.session.user) {
        res.render('dashboard', { local: req.session.user, title: "HomePage" })
    } else {
        res.send("Unauthorize User")
    }
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router;