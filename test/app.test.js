const request = require("supertest");
const app = require('../app');

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the notes path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/notes');
    expect(response.statusCode).toBe(200);
  })
})

describe('Test note api route', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.statusCode).toBe(200);
  })
  // test('It should response the POST method', async () => {
  //   const data = {
  //     title: 'Title',
  //     text: 'text'
  //   }
  //   JSON.stringify(data)
  //   await request(app)
  //     .post('/api/notes')
  //     .send(data)
  //     .expect(200)
  //     .then(res => {
  //       expect(res.statusCode).toBe(200);
  //       expect(res.body.title).toBe(data.title)
  //       expect(res.body.text).toBe(data.text)
  //     })
  // })
})