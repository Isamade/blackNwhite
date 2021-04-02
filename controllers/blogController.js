const PostModel = require("../models/PostModel");
const ImageModel = require("../models/ImageModel");
const fs = require('fs');
const path = require('path');

exports.getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id).select('-photo');
        return res.json(post);
    } catch {
        res.status(500).send('Server error');
    }
}

exports.listPosts = async (req, res) => {
    const page = parseInt(req.params.page) * 6;
    try {
        const posts = await PostModel.find().skip(page).limit(6).select('-photo');
        //const posts = await PostModel.find().select('-photo');
        res.json(posts);
    } catch {
        res.status(500).send('Server error');
    }
}

exports.listPhotos = async (req, res) => {
    const page = parseInt(req.params.page) * 6;
    try {
        const photos = await ImageModel.find().skip(page).limit(6).select('-picture');
        //const photos = await ImageModel.find().select('-picture');
        return res.json(photos);
    } catch {
        res.status(500).send('Server error');
    }
}

exports.listMyPosts = async (req, res) => {
    const page = parseInt(req.params.page) * 6;
    try {
        const posts = await PostModel.find({postedBy: req.user._id}).skip(page).limit(6).select('-photo');
        return res.json(posts);
    } catch {
        res.status(500).send('Server error');
    }
}

exports.listMyPhotos = async (req, res) => {
    const page = parseInt(req.params.page) * 6;
    try {
        const photos = await ImageModel.find({postedBy: req.user._id}).skip(page).limit(6).select('-picture');
        return res.json(photos);
    } catch {
        res.status(500).send('Server error');
    }
}

exports.addPost = async (req, res) => {
    //console.log('req', req);
    const { title, description, content } = JSON.parse(req.body.body);
    try {
        let post = await PostModel.findOne({ title });
        if (post) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Title already exists' }] });
        }
        const postedBy = req.user._id;
        const photo = {
            data: fs.readFileSync(path.resolve(__dirname, '../routes/uploads', 'pic')),
            contentType: `${req.file.mimetype}`
        }
        post = new PostModel({title, description, content, photo, postedBy});
        await post.save();
        return res.json({msg: "Post created"});
    } catch(error) {
        console.log('error', error);
        res.status(500).send('Server error');
    }
}

exports.addPhoto = async (req, res) => {
    const { heading } = JSON.parse(req.body.body);
    try {
        let photo = await ImageModel.findOne({ heading });
        if (photo) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Heading already exists' }] });
        }
        const postedBy = req.user._id;
        const picture = {
            data: fs.readFileSync(path.resolve(__dirname, '../routes/uploads', 'pic')),
            contentType: `${req.file.mimetype}`
        }
        photo = new ImageModel({heading, picture, postedBy});
        await photo.save();
        return res.json({msg: "Image was saved"});
    } catch (error) {
        console.log('error', error);
        res.status(500).send('Server error');
    }
}

exports.removePost = async (req, res) => {
    try {
        if(req.user.role === 3){
            await PostModel.findByIdAndDelete(req.params.id);            
            return res.json({msg: 'Post deleted'});
        }
        let post = await PostModel.findById(req.params.id);
        if (post.postedBy === req.user._id) {
            await PostModel.findByIdAndDelete(req.params.id);            
            return res.json({msg: 'Post deleted'});            
        }
        //const user = await user.findOne({ id }).select('-password');
        //return res.json({ msg: 'User deleted' });
    } catch {
        res.status(500).send('Server error');
    }
}

exports.removePhoto = async (req, res) => {
    try {
        if(req.user.role === 3){
            await ImageModel.findByIdAndDelete(req.params.id);            
            return res.json({msg: 'Image deleted'});
        }
        let photo = await ImageModel.findById(req.params.id);
        if (photo.postedBy === req.user._id) {
            await ImageModel.findByIdAndDelete(req.params.id);            
            return res.json({msg: 'Image deleted'});            
        }
        //const user = await user.findOne({ id }).select('-password');
        //return res.json({ msg: 'User deleted' });
    } catch {
        res.status(500).send('Server error');
    }
}

exports.searchBlog = async (req, res) => {
    try {
        if(req.query["searchString"]){
            let blog = {};
            blog.posts = await PostModel.find({
                title: {
                  $regex: new RegExp(req.query["searchString"]),
                  $options: 'i'
                }
            });
            blog.photos = await ImageModel.find({
                heading: {
                    $regex: new RegExp(req.query["searchString"]),
                    $options: 'i'
                }
            });
            return res.json(blog);
        }
    } catch {
        res.status(500).send('Server error');
    }
}

exports.updateBlog = async (req, res) => {
    const { id, title, content } = req.body;
    try {
        await PostModel.findByIdAndUpdate(id, {title, slug, content, postedBy});
        return res.json({msg: "Update successful"})
    } catch {
        res.status(500).send('Server error');
    }
}

exports.retrievePostImage = async (req, res) => {
    try {
        const post = await PostModel.find({_id: req.params.id});
        if(post.length !== 0){
          const location = path.resolve(__dirname, '../routes/uploads');
          fs.writeFileSync(`${location}/${req.params.id}.${post[0].photo.contentType.split('/')[1]}`, post[0].photo.data, function (err) {
            if (err) {
              return console.error(err);
            }
          })
          res.sendFile(`${location}/${req.params.id}.${post[0].photo.contentType.split('/')[1]}`);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.retrievePhotoImage = async (req, res) => {
    try {
        const photo = await ImageModel.find({_id: req.params.id});
        if(photo.length !== 0){
          const location = path.resolve(__dirname, '../routes/uploads');
          fs.writeFileSync(`${location}/${req.params.id}.${photo[0].picture.contentType.split('/')[1]}`, photo[0].picture.data, function (err) {
            if (err) {
              return console.error(err);
            }
          })
          res.sendFile(`${location}/${req.params.id}.${photo[0].picture.contentType.split('/')[1]}`);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}