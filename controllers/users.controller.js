const bcrypt = require("bcrypt");
const { fetchUser, fetchUserByUsername } = require("../models/users.model");

async function getUser(req, res, next) {
  try {
    const userDetails = req.body;
    const username = userDetails.username;
    const password = userDetails.password;

    const userObj = await fetchUser(username, password);

    res.status(200).send({ user: userObj });
  } catch {
    next(err);
  }
}

const signIn = async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await fetchUserByUsername(username);
    console.log(user)

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
        (console.log("invalid password"))
      return res
        .status(401)
        .json({ message: "Invalid credentials" });
    }

    res.json({ user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUser, signIn };
