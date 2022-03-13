import express from 'express'
import { engine } from 'express-handlebars'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFileSync } from 'fs'

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// configure Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.set('views', './views');

// static files
app.use(express.static(__dirname + '/public'))

/* Route handlers */

// home page
app.get('/', (req, res) => res.render('home'))

// about page
app.get('/about', (req, res) => res.render('about'))


// get data from file
const jsonStr = readFileSync('public/data/data.json', 'utf8')
// parse json
const obj = JSON.parse(jsonStr);
console.log(obj);


// assuming this is coming from the database
app.get('/api/data', (req, res) => {
  res.json(obj);
  console.log(res);
  //const data = [100, 50, 300, 40, 350, 250];
  //res.json(data);
});

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})




app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
