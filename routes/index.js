const userRoutes = require('./user');
const landingRoutes = require('./landing');
const matchRoutes = require('./match');

const constructorMethod = (app) => {
    app.use('/user', userRoutes);
    app.use('/', landingRoutes);
    app.use('/match', matchRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found!'});
    });
};

module.exports = constructorMethod;