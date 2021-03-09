var knex = require("../database/connection")
var bcrypt = require("bcrypt")
var PassowordToken = require("./PassowordToken")

class User {

  async findAll() {
    try {
      var result = await knex.select("id, name, email, role").table("users")

      return result
    } catch (error) {
      console.log(eror)
      return []
    }
  }

  async findById(id) {
    try {
      var result = await knex.select("id, name, email, role").where({ id: id }).table("users")

      if (result > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async findByEmail(email) {
    try {
      var result = await knex.select("id", "name", "email", "password", "role").where({ email: email }).table("users")

      if (result > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async new(name, email, password) {
    try {
      var hash = await bcrypt.hash(password, 12)

      await knex.insert({ name, email, password: hash, role: 0 }).table("users")
    } catch (error) {
      console.log(error)
    }
  }

  async findEmail(email) {
    try {
      var result = await knex.select("*").from("users").where({ emai: email })

      result.length > 0 ? true : false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async update(id, name, emal, role) {

    var user = await this.findById(id)

    if (user != undefined) {

      var editUser = {}

      if (email != undefined) {
        if (email != user.email) {
          var result = await this.findEmail(email)
            (!result) ? editUser.email = email : { status: false, error: "O e-mail já está cadastrado." }
        }
      }

      if (name != undefined) { editUser.name = name }

      if (role != undefined) { editUser.role = role }

      try {
        await knex.update(editUser).where({ id: id }).table("users")
        return { status: true }
      } catch (error) {
        return { status: false, error: error }
      }

    } else {
      return { status: false, error: "O usuário não existe." }
    }
  }

  async delete(id) {
    var user = await this.findById(id)

    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users")
        return { status: true }
      } catch (error) {
        return { status: false, error: error }
      }
    } else {
      return { status: false, error: "O usuário não existe, portanto não pode ser deletado." }
    }
  }

  async changePassword(newPassword, id, token) {
    var hash = await bcrypt.hash(newPassword, 12)

    await knex.update({ password: hash }).where({ id: id }).table("users")
    await PassowordToken.setUsed(token)
  }

  



}

module.exports = new User()