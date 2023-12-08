const request = require('supertest')
const app = require('../index.js')

//TODO: TEST IN PROGRESS

describe('Todo Routes', () => {
  it('should get all todos for dev', async () => {
    const response = await request(app).get('/todos/dev')

    expect(response.status).toBe(200)

    // Vérifier le format JSON de la réponse
    expect(response.headers['content-type']).toMatch(/application\/json/)

    // Vérifier que la réponse contient une liste de todos
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)

    // Vérifier que chaque todo a un champ 'title'
    const firstTodo = response.body[0]
    expect(firstTodo).toHaveProperty('title')
    expect(firstTodo).toHaveProperty('description')
    expect(firstTodo).toHaveProperty('userId')
    expect(firstTodo).toHaveProperty('isCompleted')
    expect(firstTodo).toHaveProperty('isArchive')
    expect(firstTodo).toHaveProperty('date')
  })

  //   it('should get user todos', async () => {
  //     // Implémentez ce test en fonction de vos besoins
  //   })

  //   it('should get one todo', async () => {
  //     // Implémentez ce test en fonction de vos besoins
  //   })

  //   it('should add a todo', async () => {
  //     // Implémentez ce test en fonction de vos besoins
  //   })

  //   it('should update a todo', async () => {
  //     // Implémentez ce test en fonction de vos besoins
  //   })

  //   it('should delete a todo', async () => {
  //     // Implémentez ce test en fonction de vos besoins
  //   })
})
// Fin des tests Jest
afterAll((done) => {
  // Fermez le serveur Express après les tests
  app.close(() => {
    done()
  })
})
