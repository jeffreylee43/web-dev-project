const usersRoutes = require('./users');
const stocksRoutes = require('./stocks');
const companiesRoutes = require('./companies');
const loginRoutes = require('./login');
const registerRoutes = require('./register');

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.render('landing/landingpage', { title: 'Home' });
    });

    app.use('/login', loginRoutes);
    app.use('/register', registerRoutes);
    app.use('/users', usersRoutes);
    app.use('/stocks', stocksRoutes);
    app.use('/companies', companiesRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Provided route is not found' });
    });
};

module.exports = constructorMethod;
