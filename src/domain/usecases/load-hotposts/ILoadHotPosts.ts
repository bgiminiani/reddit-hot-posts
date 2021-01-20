import { IHotPost } from '../../models/IHotPost'

export interface IHotPostsParam {
  initialDate: string
  finalDate: string
  orderBy: string
}

export interface ILoadHotPosts {
  load: (hotPostsParam: IHotPostsParam) => Promise<IHotPost[]>
}
