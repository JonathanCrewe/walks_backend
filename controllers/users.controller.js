const {fetchUser} = require('../models/users.model')

async function getUser(req, res, next) {
    try {
        const userDetails = req.body
        const username = userDetails.username
        const password = userDetails.password

        const userObj = await fetchUser(username, password)

        res.status(200).send({user: userObj})
    }
    catch {
        next(err)
    }
}


module.exports = {getUser}