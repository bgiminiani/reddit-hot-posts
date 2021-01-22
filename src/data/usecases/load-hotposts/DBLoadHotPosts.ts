import { IHotPost } from '../../../domain/models/IHotPost'
import { ILoadHotPostsParam, ILoadHotPosts } from '../../../domain/usecases/load-hotposts'
import { ILoadPostsRepository } from './protocols/ILoadPostsRepository'

export class DBLoadHotPosts implements ILoadHotPosts {
  constructor (private readonly loadPostsRepository: ILoadPostsRepository) {}

  async load (hotPostsParam: ILoadHotPostsParam): Promise<IHotPost[]> {
    const hotPosts = await this.loadPostsRepository.load(hotPostsParam)
    return await new Promise(resolve => resolve(hotPosts))
  }
}
