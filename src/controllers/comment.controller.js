const Comment = require('../models/comment.model');

// instruction
// clone the repository
// run `git remote remove origin`
// then you can add your remote repository 

class CommentController {
    static create = async (req, res) => {
        try {
            const { content } = req.body;

            const comment = await Comment.create({
                content
            });

            res.status(201).json(comment)
        } catch(error) {
            res.status(500).json('Server error')
        }
    }

    static getAll = async (req, res) => {
        try {
            // const query = req.query;
            // console.log(query)
            const comment = await Comment.find();

            res.status(200).json(comment)
        } catch (error) {
            res.status(500).json('Server error') 
        }
    }

    // getOne
    static getOne = async (req, res) => {
        try {
            const { id } = req.params;

            const comment = await Comment.findOne({ _id: id });

            res.status(200).json(comment)
        } catch (error) {
            res.status(500).json('Server error')
        }
    }

    // update
    static update = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json('Comment not found')
            }

            const comment = await Comment.findOne({ _id: id });
            const updatedComment = Object.assign(comment, req.body);

            updatedComment.save();

            res.status(200).json(updatedComment);

        } catch (error) {
            res.status(500).json('Server error')
        }
    }

    // delete
    static delete = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json('Invalid request')
            }

            const comment = await Comment.findByIdAndDelete({ _id: id });

            if (!comment) {
                return res.status(404).json('Comment not found')
            }

            res.status(200).json('Success')

        } catch (error) {
            res.status(500).json('Server error')
        }
    }
}

module.exports = CommentController;