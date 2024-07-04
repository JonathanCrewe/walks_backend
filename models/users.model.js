const db = require("../db/connection")

async function fetchUser(username, password) {
    let userQueryStr = `SELECT * 
                        FROM users 
                        WHERE username = $1 
                        AND password = $2;`

    const fetchUsersResult = await db.query(userQueryStr, [username, password])

    return fetchUsersResult.rows[0]
}

module.exports = {fetchUser}