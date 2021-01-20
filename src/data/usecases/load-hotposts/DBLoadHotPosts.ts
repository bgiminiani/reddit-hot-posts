import { IHotPost } from '../../../domain/models/IHotPost'
import { IHotPostsParam, ILoadHotPosts } from '../../../domain/usecases/load-hotposts'
import { ILoadPostsRepository } from './protocols/ILoadPostsRepository'

export class DBLoadHotPosts implements ILoadHotPosts {
  constructor (private readonly loadPostsRepository: ILoadPostsRepository) {}

  async load (hotPostsParam: IHotPostsParam): Promise<IHotPost[]> {
    const hotPosts = this.loadPostsRepository.load(hotPostsParam)
    return await new Promise(resolve => resolve(hotPosts))
  }
}
