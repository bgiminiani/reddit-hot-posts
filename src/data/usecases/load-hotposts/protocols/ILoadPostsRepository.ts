import { IHotPostsParam } from '../../../../domain/usecases/load-hotposts'
import { IHotPost } from '../../../../domain/models/IHotPost'

export interface ILoadPostsRepository {
  load: (hotPostsParam: IHotPostsParam) => Promise<IHotPost[]>
}