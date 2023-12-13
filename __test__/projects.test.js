const request = require('supertest')
const { app } = require('../src/app')
const { userEditor } = require('./globalVars')

describe('Projects', () => {
  let projectId = ''
  let tokenUser = ''
  // Get all projects
  test('should get all projects', async () => {
    const response = await request(app).get('/projects')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
  })

  // LOGIN
  test('should login', async () => {
    const response = await request(app).post('/login').send(userEditor)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    tokenUser = response.body.token
  })

  // CREATE
  test('create new project', async () => {
    const response = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        title: 'PROJET test',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('userId')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('order')
    expect(response.body).toHaveProperty('isArchive')
    expect(response.body).toHaveProperty('isDeleted')
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('createdAt')
    projectId = response.body._id
  })

  // UPDATE
  //   test('update project change title', async () => {
  //     const updatedProjectData = {
  //       title: 'PROJET test updated',
  //     }
  //     const response = await request(app)
  //       .put(`/projects/${projectId}`)
  //       .set('Authorization', `Bearer ${tokenUser}`)
  //       .send(updatedProjectData)

  //     expect(response.status).toBe(200)
  //   })

  // UPDATE — project to archived
  //   test('update project to archived', async () => {
  //     const updatedProjectData = {
  //       title: 'PROJET test updated',
  //     }
  //     const response = await request(app)
  //       .put(`/projects/${projectId}`)
  //       .set('Authorization', `Bearer ${tokenUser}`)
  //       .send(updatedProjectData)

  //     expect(response.status).toBe(200)
  //   })

  // DELETE — project
  test('delete project', async () => {
    console.log(projectId)
    const response = await request(app)
      .delete(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Project deleted successfully' })
  })
})
