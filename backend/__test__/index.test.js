const app = require('../app')
const request = require('supertest')


describe('retrieve all data', () => {
    test('returns status code 200 if all tasks are retrieved', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200); 
    });
});


describe('create new task', () => {
    test('returns status code 201 if a task was created', async () => {
        const res = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using notion",
            "status": "planned"
        })

        expect(res.statusCode).toBe(201);
    })
})

describe('update existing task', () => {
    test('returns status code 200 if a task was updated', async () => {
        const res = await request(app).put('/tasks/:id').send({
            "description": "create documentation using anything other than notion",
        })

        expect(res.statusCode).toBe(200);
    })
})



