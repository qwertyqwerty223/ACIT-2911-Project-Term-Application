const app = require('../app')
const request = require('supertest')


describe('Get all task', ()=>{
    test('Returns statusCode of 200 if all tasks were retrieved', async () => {
        const newTaskRes = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned",
            "user": "Toby",
            "tokenId": "234"
        });

        const tokenId = newTaskRes.body.tokenId

        expect(tokenId).toBeDefined();

        const res = await request(app).get(`/tasks/${tokenId}`);

        expect(res.statusCode).toBe(200);

        
    });
    test('Returns status code of 404 if the requested endpoint is not found', async ()=>{
        const tokenId = '1234'
        const res = await request(app).get(`/task/${tokenId}`);

        expect(res.statusCode).toBe(404);
    })
})




describe('create new task', () => {
    test('returns status code 201 if a task was created', async () => {
        const res = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned",
            "user": "Toby",
            "tokenId": "234"
        })
        expect(res.statusCode).toBe(201);
    })

    test('returns status code 404 if an incorrect endpoint was hit', async () => {
        const res = await request(app).post('/task/create-task').send({
            "description": "create documentation using something",
            "status": "planned",
            "user": "Toby",
            "tokenId": "234"
        })
        expect(res.statusCode).toBe(404);
    })
})

describe('get one existing task', () => {
    test('returns status code 200 if the requested task is retrieved', async () => {

        const newTask = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned",
            "user": "Toby",
            "tokenId": "234"
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
            "status": "planned",
            "user": "Toby",
            "tokenId": "234"
        })
        
        const taskId = newTask.body._id

        const res = await request(app).patch(`/tasks/${taskId}`).send({
            description: 'create documentation using anything other than notion',
        });
        expect(res.statusCode).toBe(200);
    });
});

describe('delete existing task', () => {
    test('returns status code 200 if a task was deleted', async () => {

        const newTask = await request(app).post('/tasks/create-task').send({
            "description": "create documentation using something",
            "status": "planned",
            "user": "Toby",
            "tokenId": "234"
        })
        
        const taskId = newTask.body._id

        const res = await request(app).delete(`/tasks/${taskId}`)

        expect(res.statusCode).toBe(200);
    });
})

// //-------------Testing Events end points--------------------
describe('get all events', ()=>{
    test('returns status code of 200 if all events were retrieved', async () => {
        const newEventRes = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
            "tokenId": "234"
        });

        const tokenId = newEventRes.body.tokenId

        expect(tokenId).toBeDefined();

        const res = await request(app).get(`/events/${tokenId}`);

        expect(res.statusCode).toBe(200);
    });
})


describe('create new event', () => {
    test('returns status code 201 if a event was created', async () => {
        const res = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
            "tokenId": "234"
        })
        expect(res.statusCode).toBe(201);
    })
})

describe('get one existing event', () => {
    test('returns status code 200 if the requested event is retrieved', async () => {

        const newEvent = await request(app).post('/events/create-event').send({
            "title": "Lorem ipsum",
            "description": "Stand up meeting",
            "tokenId": "234"
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
            "tokenId": "234"
        })
        
        const eventId = newEvent.body._id

        const res = await request(app).patch(`/events/${eventId}`).send({
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
            "tokenId": "234"
        })
        
        const eventId = newEvent.body._id

        const res = await request(app).delete(`/events/${eventId}`)

        expect(res.statusCode).toBe(200);
    });
})

// -----------------------Testing Projects end points-------------------------
// describe('get all projects', ()=>{
//     test('returns status code 200, if all projects are retrieved', async () => {
//         const res = await request(app).get(`/projects`);
//         expect(res.statusCode).toBe(200);
//     });
// })


