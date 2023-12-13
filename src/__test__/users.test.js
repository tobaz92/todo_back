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
  let totpCode = ''
  const userData = {
    username: 'usertest',
    email: 'usertest@usertest.com',
    password: 'usertest',
  }

  // CREATE
  it('should handle create user', async () => {
    const response = await request(server).post('/signin').send(userData)
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toHaveProperty('userId')
    userCreateUserId = response.body.userId
  })

  // 2FA GENERATE SECRET
  it('should generate 2FA secret key', async () => {
    const response = await request(server)
      .post('/2fa/generate-secret-key')
      .send({
        userId: userCreateUserId,
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('totpCode')
    expect(response.body).toHaveProperty('imageUrl')

    expect(response.body.message).toBe('Secret key generated successfully')

    const base64Regex = /^data:image\/\w+;base64,[\s\S]+$/
    expect(base64Regex.test(response.body.imageUrl)).toBe(true)

    const totpCodeRegex = /^\d{6}$/
    expect(totpCodeRegex.test(response.body.totpCode)).toBe(true)
    totpCode = response.body.totpCode
  })

  it('should enabled 2FA user', async () => {
    const response = await request(server).post('/2fa/enable-2fa').send({
      userId: userCreateUserId,
      totp: totpCode,
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('2FA enabled successfully')
  })

  // LOGIN
  it('should login', async () => {
    const response = await request(server).post('/login').send(userData)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    tokenUser = response.body.token
  })

  // UPDATE
  it('should update user', async () => {
    const updatedUserData = {
      username: 'usertestUpdated',
      email: 'usertestUpdated@usertestUpdated.com',
      password: 'usertestUpdated',
    }

    const response = await request(server)
      .put(`/users/${userCreateUserId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedUserData)

    expect(response.status).toBe(200)
  })

  // UPDATE - Change role to admin if user is not admin
  it('should update user role to admin if user is not admin', async () => {
    const updatedUserData = {
      role: 'admin',
    }
    const response = await request(server)
      .put(`/users/${userCreateUserId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedUserData)

    expect(response.status).toBe(403)
    expect(response.body).toEqual({ error: 'Permission denied' })
  })

  // DELETE — USER MODE TODO:A faire !
  //   it('should handle deleted user user', async () => {
  //     const response = await request(server)
  //       .set('Authorization', `Bearer ${tokenUser}`)
  //       .delete(`/users/${userCreateUserId}`)

  //     expect(response.status).toBe(200)
  //     expect(response.body).toEqual({ message: 'User deleted successfully' })
  //   })

  // DELETE — DEV MODE
  it('should handle deleted dev user', async () => {
    const response = await request(server).delete(
      `/users/dev/${userCreateUserId}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'User deleted successfully' })
  })
})
