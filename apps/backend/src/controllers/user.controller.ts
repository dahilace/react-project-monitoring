const userService = require('../services/user.service')

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}