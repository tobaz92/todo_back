const request = require('supertest')
const { server, closeServer } = require('../index.js')

describe('API Routes', () => {
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

  it('should get all users', async () => {
    const response = await request(server).get('/users')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('should get all todos', async () => {
    const response = await request(server).get('/todos')
    expect(response.status).toBe(401)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toEqual({ error: 'Missing authorization token' })
  })

  it('should get all projects', async () => {
    const response = await request(server).get('/projects')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('should get all 2fa logs', async () => {
    const response = await request(server).get('/2fa')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toEqual({ message: '2FA router' })
  })
})
