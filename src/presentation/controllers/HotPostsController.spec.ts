import { HotPostsController } from './HotPostsController'
import { MissingParamError } from '../errors/MissingParamError'

const makeSut = (): HotPostsController => {
  return new HotPostsController()
}

describe('HotPostsController', () => {
  it('Should return status code 400 if initial date is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('initialDate'))
  })

  it('Should return status code 400 if final date is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('finalDate'))
  })

  it('Should return status code 400 if order is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        finalDate: 'final_date'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('order'))
  })
})
