import { IHotPost } from '../../models/IHotPost'

export interface ILoadHotPostsParam {
  initialDate: string
  finalDate: string
  orderBy: string
}

export interface ILoadHotPosts {
  load: ({ initialDate, finalDate, orderBy }: ILoadHotPostsParam) => Promise<IHotPost[]>
}
