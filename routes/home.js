const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index', {
        title: "Vidlee",
        heading: "Welcome to Vidlee",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt temporibus ex numquam voluptatem quas quibusdam in necessitatibus, expedita deserunt suscipit architecto impedit culpa repellendus voluptas possimus delectus aliquid tempore officia."
    })
})

module.exports = router