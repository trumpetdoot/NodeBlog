const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoute = require('./routes/blogRoutes')

const app = express();

const dbURI = 'mongodb+srv://Me:1234@nodemongo.ihr1oko.mongodb.net/nodetut?retryWrites=true&w=majority&appName=NodeMongo'
mongoose.connect(dbURI).then(() => app.listen(3000)).catch((err) => console.log(err))

app.set('view engine', 'ejs')

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))


//Gen routes 
app.get('/', (req, res) => {
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})
app.get('/blogs/create', (req, res)=> {
    res.render('create', { title: 'Creating a blog'})
})

//Blog Routes
app.use('/blogs', blogRoute)


//Catch all Route
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})