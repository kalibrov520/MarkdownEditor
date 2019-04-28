const express = require('express')
const router = express.Router()
const Post = require('../models/post-model')

router.post('/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    console.log(post);
    post.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                success: true,
                message: `Post with ID_${data._id} saved successfully!`
            })
        }
    })
})

router.get('/posts', (req, res) => {
    Post.find({}, 'title description', (err, posts) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({
                posts: posts
            })
        }
    }).sort({
        _id: -1
    })
})

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', (err, post) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(post)
        }
    })
})

router.put('/posts/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', (err, post) => {
        if (err) {
            console.log(err)
        } else {
            if (req.body.title) {
                post.title = req.body.title
            }
            if (req.body.description) {
                post.description = req.body.description
            }
            post.save(err => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})

router.delete('/posts/:id', (req, res) => {
    Post.remove({
        _id: req.params.id
    }, err => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

module.exports = router