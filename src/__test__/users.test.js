const request = require('supertest')
const { server, closeServer } = require('../index.js')

describe('Authentication', () => {
  beforeEach(async () => {
    if (!server.address()) {
      await new Promise((resolve) => {
        server.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`)
          resolve()
        })
      })
    }
  })

  afterAll(() => {
    closeServer(false)
  })

  it('should authenticate a user and return a token', async () => {
    const response = await request(server).post('/login').send({
      email: 'admin@admin.com',
      password: 'admin',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should handle incorrect credentials', async () => {
    const response = await request(server).post('/login').send({
      email: 'incorrect@example.com',
      password: 'incorrectPassword',
    })
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ error: 'Incorrect password' })
  })
})

describe('User Management', () => {
  let userCreateUserId = ''
  let tokenUser = ''
  const userData = {
    username: 'usertest',
    email: 'usertest@usertest.com',
    password: 'usertest',
  }

  it('should handle create user', async () => {
    const response = await request(server).post('/signin').send(userData)
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toHaveProperty('userId')
    userCreateUserId = response.body.userId // Stocker l'ID pour une utilisation ultérieure
  })

  // activation 2FA user
  // TODO: In progres !

  //   // login
  //   it('should authenticate a user and return a token', async () => {
  //     const response = await request(server).post('/login').send(userData)
  //     tokenUser = response.body.token
  //     expect(response.status).toBe(200)
  //     expect(response.body).toHaveProperty('token')
  //   })

  //   const updatedUserData = {
  //     username: 'usertestUpdated',
  //     email: 'usertestUpdated@usertestUpdated.com',
  //     password: 'usertestUpdated',
  //   }

  //   it('should handle update user', async () => {
  //     const response = await request(server)
  //       .put(`/users/${userCreateUserId}`)
  //       .send(updatedUserData)

  //     expect(response.status).toBe(200)
  //     expect(response.body).toEqual({
  //       message: 'Utilisateur mis à jour avec succès',
  //       username: updatedUserData.username,
  //       email: updatedUserData.email,
  //     })
  //   })

  it('should handle deleted dev user', async () => {
    const response = await request(server).delete(
      `/users/dev/${userCreateUserId}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'User deleted successfully' })
  })
})
