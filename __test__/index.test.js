const request = require('supertest')
const { app } = require('../src/app')

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

describe('API Routes', (done) => {
  // test('should get all users', async () => {
  //   const response = await request(app).get('/users')
  //   expect(response.status).toBe(200)
  //   expect(response.headers['content-type']).toMatch(/application\/json/)
  //   expect(response.body).toBeInstanceOf(Array)
  //   expect(response.body.length).toBeGreaterThan(0)
  // })

  // test('should get all todos', async () => {
  //   const response = await request(app).get('/todos')
  //   expect(response.status).toBe(401)
  //   expect(response.headers['content-type']).toMatch(/application\/json/)
  //   expect(response.body).toEqual({ error: 'Missing authorization token' })
  // })

  // test('should get all projects', async () => {
  //   const response = await request(app).get('/projects/dev')
  //   expect(response.status).toBe(200)
  //   expect(response.headers['content-type']).toMatch(/application\/json/)
  //   expect(response.body).toBeInstanceOf(Array)
  //   expect(response.body.length).toBeGreaterThan(0)
  // })

  test('should get all 2fa logs', async () => {
    const response = await request(app).get('/2fa')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toEqual({ message: '2FA router' })
  })
})
