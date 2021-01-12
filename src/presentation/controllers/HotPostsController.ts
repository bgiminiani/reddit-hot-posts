import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'

export class HotPostsController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredParams = ['initialDate', 'finalDate']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }
  }
}
