const authService = require('../services/auth.service')

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body
    const result = await authService.login(login, password)
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(401).json({ error: e.message })
  }
}