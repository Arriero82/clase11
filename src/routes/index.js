const index = require('../controller/index.controller')

const routes = (app) => {
    app.use('/', index)
}

module.exports = routes    