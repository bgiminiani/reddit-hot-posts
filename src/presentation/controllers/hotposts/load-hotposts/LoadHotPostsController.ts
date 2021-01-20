import { IHttpRequest, IHttpResponse, IController, IDateValidator, IOrderValidator } from '../../../protocols'
import { MissingParamError, InvalidParamError } from '../../../errors'
import { badRequest, serverError } from '../../../helpers/HttpHelper'
import { ILoadHotPosts } from '../../../../domain/usecases/load-hotposts'

export class LoadHotPostsController implements IController {
  constructor (
    private readonly dateValidator: IDateValidator,
    private readonly orderValidator: IOrderValidator,
    private readonly loadHotPosts: ILoadHotPosts
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredParams = ['initialDate', 'finalDate', 'orderBy']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      const { initialDate, finalDate, orderBy } = httpRequest.body

      const initialDateIsValid = this.dateValidator.isValid(initialDate)
      if (!initialDateIsValid) {
        return badRequest(new InvalidParamError('initialDate'))
      }

      const finalDateIsValid = this.dateValidator.isValid(finalDate)
      if (!finalDateIsValid) {
        return badRequest(new InvalidParamError('finalDate'))
      }

      const orderValidator = this.orderValidator.isValid(orderBy)
      if (!orderValidator) {
        return badRequest(new InvalidParamError('orderBy'))
      }

      const hotPosts = await this.loadHotPosts.load({
        initialDate: 'valid_initial_date',
        finalDate: 'valid_final_date',
        orderBy: 'valid_order'
      })

      return {
        statusCode: 200,
        body: hotPosts
      }
    } catch (error) {
      return serverError()
    }
  }
}
