import { IHttpRequest, IHttpResponse, IController, IDateValidator, IOrderValidator } from './protocols'
import { MissingParamError, InvalidParamError } from '../../../errors'
import { badRequest, serverError } from '../../../helpers/HttpHelper'

export class LoadHotPostsController implements IController {
  constructor (
    private readonly dateValidator: IDateValidator,
    private readonly orderValidator: IOrderValidator) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredParams = ['initialDate', 'finalDate', 'order']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      const { initialDate, finalDate, order } = httpRequest.body

      const initialDateIsValid = this.dateValidator.isValid(initialDate)
      if (!initialDateIsValid) {
        return badRequest(new InvalidParamError('initialDate'))
      }

      const finalDateIsValid = this.dateValidator.isValid(finalDate)
      if (!finalDateIsValid) {
        return badRequest(new InvalidParamError('finalDate'))
      }

      const orderValidator = this.orderValidator.isValid('order1')
      if (!orderValidator) {
        return badRequest(new InvalidParamError('order'))
      }
    } catch (error) {
      return serverError()
    }
  }
}