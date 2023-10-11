const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 7000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.use(express.static(publicPath))


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})


app.post('/signup', async (req, res) => {
    
    const data = {
        name: req.body.name,
        password: req.body.password
    }

        await LogInCollection.insertMany([data])

    res.render("success")
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.render("home", { naming: `${req.body.name}` })
            
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})