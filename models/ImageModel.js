const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ImageSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true,
            unique: true
        },
        picture: {
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

module.exports = mongoose.model('ImageModel', ImageSchema);