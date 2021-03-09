var jwt = require("jsonwebtoken")

var secret = "ak9ou@huif2çsjk4lqiajf$@lsd0"

module.exports = (req, res, next) => {
  const authToken = req.headers['authorization']

  if (authToken != undefined) {
    const bearer = authToken.split(' ')
    var token = bearer[1]

    try {
      var decoded = jwt.verify(token, secret)
      if (decoded.role == 1) {
        next()
      } else {
        res.status(403)
        res.send("Você não tem permissão para isso.")
        return
      }
    } catch (error) {
      res.status(403)
      res.send("Você não está autenticado.")
      return
    }

  } else {
    res.status(404)
    res.send("Você não está autenticado.")
    return
  }
}