const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/PostController');

// Route to create a new post
router.post('/createPosts', createPost);

// Route to get all posts
router.get('/getAllPosts', getAllPosts);

// Route to get a post by ID
router.get('/getPostById/:id', getPostById);

// Route to update a post by ID
router.put('/updatePost/:id', updatePost);

// Route to delete a post by ID
router.delete('/deletePost/:id', deletePost);

module.exports = router;
