const request = require('supertest')
const { app } = require('../src/app')
const { userEditor } = require('./globalVars')

describe('Project Lifecycle', () => {
  let projectId = ''
  let tokenUser = ''

  // Test Login
  test('should log in', async () => {
    const response = await request(app).post('/login').send(userEditor)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    tokenUser = response.body.token
  })

  // Test Get All Projects (initially empty)
  test('should get all projects initially', async () => {
    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toHaveProperty('project')
    expect(response.body.project).toBeInstanceOf(Array)
    expect(response.body.project.length).toEqual(0)
  })

  // Test Create New Project
  test('create new project', async () => {
    const response = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        title: 'PROJECT test',
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

  // Test Update Project - Change Title
  test('update project - change title', async () => {
    const updatedProjectData = {
      title: 'PROJECT test updated',
    }
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedProjectData)

    expect(response.status).toBe(200)
  })

  // Test Update Project - Mark as Archived
  test('update project - mark as archived', async () => {
    const updatedProjectData = {
      isArchive: true,
    }
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedProjectData)

    expect(response.status).toBe(200)
  })

  // Test Update Project - Mark as Deleted
  test('update project - mark as deleted', async () => {
    const updatedProjectData = {
      isDeleted: true,
    }
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedProjectData)

    expect(response.status).toBe(200)
  })

  // Test Update Project - Change Order
  test('update project - change order', async () => {
    const updatedProjectData = {
      order: 6,
    }
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedProjectData)

    expect(response.status).toBe(200)
  })

  // Test Get All Projects After Create
  test('should get all projects after create', async () => {
    const response = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toHaveProperty('project')
    expect(response.body.project).toBeInstanceOf(Array)
    expect(response.body.project.length).toBeGreaterThan(0)
  })

  // Test Delete Project
  test('delete project', async () => {
    const response = await request(app)
      .delete(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Project deleted successfully' })
  })
})
