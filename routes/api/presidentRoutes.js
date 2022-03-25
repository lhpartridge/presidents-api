const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
 
fetch('https://api.sampleapis.com/presidents/presidents')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })
 
//all presidents
//localhost:3000/presidents
//copy/paste URL from api.sampleapis.com
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/presidents/presidents'
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/presidents', {
                title: 'All presidents',
                name: 'Presidents List',
                body: 'all',
                data
            })
        })
})
 
//single-president
//localhost:3000/presidents/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/presidents/presidents/${id}`
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-president', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    body: 'single',
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})
 


 
module.exports = router