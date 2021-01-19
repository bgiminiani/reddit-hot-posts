import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
