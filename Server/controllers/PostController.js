const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

exports.uploadImage = upload.single('image');

exports.createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required', success: false });
        }

        const post = await Post.create({ title, content, image });

        return res.status(201).json({
            message: 'Post created successfully',
            success: true,
            post,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({
            message: 'Posts fetched successfully',
            success: true,
            posts,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        return res.status(200).json({
            message: 'Post fetched successfully',
            success: true,
            post,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const updateData = { title, content };
        if (image) {
            updateData.image = image;
        }

        const post = await Post.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        return res.status(200).json({
            message: 'Post updated successfully',
            success: true,
            post,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        return res.status(200).json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};
