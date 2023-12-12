const request = require('supertest')
const { server, closeServer } = require('../index.js')

describe('Authentication', () => {
  afterAll(() => {
    closeServer(false)
  })
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
