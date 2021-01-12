import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'
import { IController } from '../protocols/IController'

export class HotPostsController implements IController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredParams = ['initialDate', 'finalDate', 'order']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }
  }
}
