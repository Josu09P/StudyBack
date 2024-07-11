const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Configurar el motor de plantillas
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/templates'),
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/templates'));

// Ruta para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
