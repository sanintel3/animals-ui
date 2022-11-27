import request from 'supertest'
import app from '../../src/app'

const animalPayload = { name: 'Test animal', description: 'Test description', colour: 'Orange',type: 'BIRD' }

describe('/', function () {

  it('animals list page', function () {
    return request(app)
      .get('/animals')
      .expect(200)
      .then(data => {
        expect(data.text).toContain('Add an Animal')
        expect(data.text).toContain('Search')
        expect(data.text).toContain('Animals')
        expect(data.text).toContain('Name')
        expect(data.text).toContain('Description')
        expect(data.text).toContain('Colour')
        expect(data.text).toContain('Type')
        
        //verify available actions
        expect(data.text).toContain('View')
        expect(data.text).toContain('Update')
        expect(data.text).toContain('Delete')
      })
  })

  it('view animal page', function () {
    return request(app)
      .get('/animals/123')
      .expect(200)
      .then(data => {
        expect(data.text).toContain('Animal')
        expect(data.text).toContain('Type')
        expect(data.text).toContain('Colour')
      })
  })

  it('add animal page', function () {
    return request(app)
      .get('/animals/add')
      .expect(200)
      .then(data => {
        expect(data.text).toContain('Add an Animal')
        expect(data.text).toContain('Type')
        expect(data.text).toContain('Colour')
      })
  })

  it('submit add animal should redirect to animals list page', function () {
    return request(app)
      .post('/animals')
      .expect(302)
      .send(animalPayload)
      
    })

  it('update animal page', function () {
    return request(app)
      .get('/animals/update/abc')
      .expect(200)
      .then(data => {
        expect(data.text).toContain('Update an Animal')
        expect(data.text).toContain('Type')
        expect(data.text).toContain('Colour')
      })
  })

  it('submit update animal should redirect to animals list page', function () {
    return request(app)
      .post('/animals/update/123')
      .expect(302)
      .send(animalPayload)
  })

  it('submit search', function () {
    return request(app)
      .get('/animals/search?terms=abc')
      .expect(200)
  })
})
