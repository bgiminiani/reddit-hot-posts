import { ILoadHotPostsParam } from '../../../../domain/usecases/load-hotposts'
import { IHotPost } from '../../../../domain/models/IHotPost'

export interface ILoadPostsRepository {
  load: (hotPostsParams: ILoadHotPostsParam) => Promise<IHotPost[]>
}
