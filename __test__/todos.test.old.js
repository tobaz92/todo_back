const request = require('supertest')
const { app } = require('../src/app')
const { userEditor } = require('./globalVars')

describe('Todo Lifecycle', () => {
  let todoId = ''
  let tokenUser = ''

  // Test Login
  test('should log in', async () => {
    const response = await request(app).post('/login').send(userEditor)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    tokenUser = response.body.token
  })

  // Test Create New Todo
  test('create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        title: 'todo test',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('userId')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('isArchive')
    expect(response.body).toHaveProperty('isDeleted')
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('createdAt')
    todoId = response.body._id
  })

  // Tests for Updating Todo
  test('update todo - change title', async () => {
    const updatedTodoData = {
      title: 'TODO test updated',
    }
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedTodoData)

    expect(response.status).toBe(200)
  })

  test('update todo - change description', async () => {
    const updatedTodoData = {
      description: 'description updated',
    }
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedTodoData)

    expect(response.status).toBe(200)
  })

  // Update Todo to Completed
  test('update todo - mark as completed', async () => {
    const updatedTodoData = {
      isCompleted: true,
    }
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedTodoData)

    expect(response.status).toBe(200)
  })

  // Update Todo to Archived
  test('update todo - mark as archived', async () => {
    const updatedTodoData = {
      isArchive: true,
    }
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedTodoData)

    expect(response.status).toBe(200)
  })

  // Update Todo to Deleted
  test('update todo - mark as deleted', async () => {
    const updatedTodoData = {
      isDeleted: true,
    }
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(updatedTodoData)

    expect(response.status).toBe(200)
  })

  // Get Todo Marked as Deleted
  test('get todo marked as deleted', async () => {
    const response = await request(app)
      .get(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)

    expect(response.status).toBe(200)
  })

  // Delete Todo
  test('delete todo', async () => {
    const response = await request(app)
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Todo deleted successfully' })
  })

  // Get Deleted Todo
  test('get deleted todo', async () => {
    const response = await request(app)
      .get(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${tokenUser}`)

    expect(response.status).toBe(404)
  })
})
