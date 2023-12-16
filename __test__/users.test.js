const request = require('supertest')
const { app } = require('../src/app')
const { userAdmin, userTest } = require('./globalVars')

describe('Authentication', () => {
  let projectId = ''
  let tokenUser = ''
  test('should handle incorrect credentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'incorrect@example.com',
      password: 'incorrectPassword',
    })
    expect(response.status).toBe(401)
  })

  //   test('should authenticate a user and return a token', async () => {
  //     const response = await request(app).post('/login').send({
  //       email: userAdmin.email,
  //       password: userAdmin.password,
  //     })
  //     expect(response.status).toBe(200)
  //     expect(response.body).toHaveProperty('token')
  //     tokenUser = response.body.token
  //   })

  //TODO: Fix this test
  //   test('should logout a user', async () => {
  //     const response = await request(app)
  //       .post('/users/logout')
  //       .set('Authorization', `Bearer ${tokenUser}`)

  //     expect(response.status).toBe(200)
  //     expect(response.body).toHaveProperty('token')
  //   })
})

// describe('User Management', () => {
//   let userCreateUserId = ''
//   let tokenUser = ''
//   let totpCode = ''

//   // CREATE
//   test('should handle create user', async () => {
//     const response = await request(app).post('/register').send(userTest)
//     expect(response.status).toBe(200)
//     expect(response.headers['content-type']).toMatch(/application\/json/)
//     expect(response.body).toHaveProperty('userId')
//     userCreateUserId = response.body.userId
//   })

//   // 2FA GENERATE SECRET
//   test('should generate 2FA secret key', async () => {
//     const response = await request(app).post('/2fa/generate-secret-key').send({
//       userId: userCreateUserId,
//     })

//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('message')
//     expect(response.body).toHaveProperty('totpCode')
//     expect(response.body).toHaveProperty('imageUrl')

//     expect(response.body.message).toBe('Secret key generated successfully')

//     const base64Regex = /^data:image\/\w+;base64,[\s\S]+$/
//     expect(base64Regex.test(response.body.imageUrl)).toBe(true)

//     const totpCodeRegex = /^\d{6}$/
//     expect(totpCodeRegex.test(response.body.totpCode)).toBe(true)
//     totpCode = response.body.totpCode
//   })

//   // 2FA ENABLE
//   test('should enabled 2FA user', async () => {
//     const response = await request(app).post('/2fa/enable-2fa').send({
//       userId: userCreateUserId,
//       totp: totpCode,
//     })

//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe('2FA enabled successfully')
//   })

//   // LOGIN
//   test('should login', async () => {
//     const response = await request(app).post('/login').send(userTest)

//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('token')
//     tokenUser = response.body.token
//   })

//   // UPDATE
//   test('should update user', async () => {
//     const updatedUserData = {
//       username: 'usertestUpdated',
//       email: 'usertestUpdated@usertestUpdated.com',
//       password: 'usertestUpdated',
//     }

//     const response = await request(app)
//       .put(`/users/${userCreateUserId}`)
//       .set('Authorization', `Bearer ${tokenUser}`)
//       .send(updatedUserData)

//     expect(response.status).toBe(200)
//   })

//   // UPDATE - Change role to admin if user is not admin
//   test('should update user role to admin if user is not admin', async () => {
//     const updatedUserData = {
//       role: 'admin',
//     }
//     const response = await request(app)
//       .put(`/users/${userCreateUserId}`)
//       .set('Authorization', `Bearer ${tokenUser}`)
//       .send(updatedUserData)

//     expect(response.status).toBe(403)
//     expect(response.body).toEqual({ error: 'Permission denied' })
//   })

//   // DELETE — USER MODE
//   test('should handle deleted user user', async () => {
//     const response = await request(app)
//       .delete(`/users/${userCreateUserId}`)
//       .set('Authorization', `Bearer ${tokenUser}`)
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual({ message: 'User deleted successfully' })
//   })

//   // DELETE — DEV MODE
//   //   test('should handle deleted dev user', async () => {
//   //     const response = await request(app).delete(`/users/dev/${userCreateUserId}`)
//   //     expect(response.status).toBe(200)
//   //     expect(response.body).toEqual({ message: 'User deleted successfully' })
//   //   })
// })
