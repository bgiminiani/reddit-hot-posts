import { IHotPostsParam } from '../../../../domain/usecases/load-hotposts'
import { IHotPost } from '../../../../domain/models/IHotPost'

export interface ILoadPostsRepository {
  load: (hotPostsParams: IHotPostsParam) => Promise<IHotPost[]>
}
