const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: {},
            required: true,
            min: 200,
            max: 2000000
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        postedBy: {
            type: ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('PostModel', PostSchema);
