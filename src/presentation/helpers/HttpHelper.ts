import { IHttpResponse } from '../protocols/IHttp'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})
