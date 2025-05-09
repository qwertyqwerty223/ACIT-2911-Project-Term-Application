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

describe('get one existing task', () => {
    test('returns status code 200 if a the requested task is retrieved', async () => {

        const newTask = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned"
        })
        
        const taskId = newTask.body._id

        const res = await request(app).get(`/tasks/${taskId}`)

        expect(res.statusCode).toBe(200);
    });
});

describe('update existing task', () => {
    test('returns status code 200 if a task was updated', async () => {

        const newTask = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned"
        })
        
        const taskId = newTask.body._id

        const res = await request(app).put(`/tasks/${taskId}`).send({
            description: 'create documentation using anything other than notion',
        });
        expect(res.statusCode).toBe(200);
    });
});

describe('delete existing task', () => {
    test('returns status code 200 if a task was updated', async () => {

        const newTask = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned"
        })
        
        const taskId = newTask.body._id

        const res = await request(app).delete(`/tasks/${taskId}`)

        expect(res.statusCode).toBe(200);
    });
})

//-------------Testing Events end points--------------------
describe('retrieve all data', () => {
    test('returns status code 200 if all events are retrieved', async () => {
        const res = await request(app).get('/events');
        expect(res.statusCode).toBe(200); 
    });
});

describe('create new event', () => {
    test('returns status code 201 if a event was created', async () => {
        const res = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
        })
        expect(res.statusCode).toBe(201);
    })
})

describe('get one existing event', () => {
    test('returns status code 200 if the requested event is retrieved', async () => {

        const newEvent = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
        })
        
        const eventId = newEvent.body._id

        const res = await request(app).get(`/events/${eventId}`)

        expect(res.statusCode).toBe(200);
    });
});

describe('update existing event', () => {
    test('returns status code 200 if an event was updated', async () => {

        const newEvent = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
        })
        
        const eventId = newEvent.body._id

        const res = await request(app).put(`/events/${eventId}`).send({
            description: 'attend presentation',
        });
        expect(res.statusCode).toBe(200);
    });
});

describe('delete existing event', () => {
    test('returns status code 200 if a event was deleted', async () => {

        const newEvent = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
        })
        
        const eventId = newEvent.body._id

        const res = await request(app).delete(`/events/${eventId}`)

        expect(res.statusCode).toBe(200);
    });
})