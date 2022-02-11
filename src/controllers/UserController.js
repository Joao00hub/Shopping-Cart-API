const User = require('../models/Users');

module.exports = {
    async storeUser(req, res) {
        const { name, email } = req.body;

        const user = await User.create({ name, email });

        return res.json(user);
    }
};