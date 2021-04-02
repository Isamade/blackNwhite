const UserModel = require('../models/UserModel');

exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findOne({ id }).select('-password');
        return res.json(user);
    } catch {
        res.status(500).send('Server error');
    }
}

exports.getAvatar = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findOne({ id }).select('-password');
        return res.json(user);
    } catch {
        res.status(500).send('Server error');
    }
}


exports.deleteUser = async (req, res) => {
    try {
        if(req.user.role === 3){
            await UserModel.findByIdAndDelete(req.body.id);            
            return res.json({msg: 'User deleted'});
        }
        await UserModel.findByIdAndDelete(req.user._id);
        //const user = await user.findOne({ id }).select('-password');
        return res.json({ msg: 'User deleted' });
    } catch {
        res.status(500).send('Server error');
    }
}

exports.updateUser = async (req, res) => {
    const { name, email, password, bio } = req.body;
    try {
        if(password){
            req.user.name = name;
            req.user.email = email;
            req.user.password = password;
            req.user.bio = bio;
        } else {
            req.user.name = name;
            req.user.email = email;
            req.user.bio = bio;
        }
        await req.user.save();
        return res.json({ msg: 'User updated' });
    } catch {
        res.status(500).send('Server error');
    }
}

exports.updateAvatar = async (req, res) => {

}

exports.updateRole = async (req, res) => {
    const { id, value } = req.body;
    const role = (value === 2) ? 2 : 1;
    try {
        await UserModel.findByIdAndUpdate(id, { role }, {
            new: true,
            runValidators: true
        });
        return res.json({ msg: 'User updated' });
    } catch {
        res.status(500).send('Server error');
    }
}