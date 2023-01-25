const { Router } = require('express')

const router = Router();    

router.get('/', (req, res) => {
    res.render('index', {name: 'Leo', style: 'index.css'})
})  

module.exports = router;