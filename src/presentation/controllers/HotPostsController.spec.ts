import { HotPostsController } from './HotPostsController'

describe('HotPostsController', () => {
  it('Should return status code 400 if initial date is not provided', () => {
    const sut = new HotPostsController()
    const httpRequest = {
      body: {
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
