const userService = require('../services/user.services')

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.json(user)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}