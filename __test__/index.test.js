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

describe('API Routes — DEV', (done) => {
  test('should get all users — DEV', async () => {
    const response = await request(app).get('/users/dev')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('should get all todos — DEV', async () => {
    const response = await request(app).get('/todos/dev')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toBeInstanceOf(Array)
  })

  test('should get all projects — DEV', async () => {
    const response = await request(app).get('/projects/dev')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toBeInstanceOf(Array)
  })

  test('should get all 2fa logs', async () => {
    const response = await request(app).get('/2fa')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })
})
