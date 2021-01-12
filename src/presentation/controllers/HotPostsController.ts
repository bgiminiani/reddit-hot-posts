import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest, serverError } from '../helpers/HttpHelper'
import { IController } from '../protocols/IController'
import { IDateValidator } from '../protocols/IDateValidator'
import { InvalidParamError } from '../errors/InvalidParamError'

export class HotPostsController implements IController {
  constructor (private readonly dateValidator: IDateValidator) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredParams = ['initialDate', 'finalDate', 'order']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      const { initialDate, finalDate } = httpRequest.body
      const dateIsValid = this.dateValidator.isValid(initialDate)
      if (!dateIsValid) {
        return badRequest(new InvalidParamError('initialDate'))
      }
      if (!finalDate) {
        return badRequest(new InvalidParamError('finalDate'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
