import MockDate from 'mockdate'
import { DBLoadHotPosts } from './DBLoadHotPosts'
import { IHotPostsParam } from '../../../domain/usecases/load-hotposts'
import { IHotPost } from '../../../domain/models/IHotPost'
import { ILoadPostsRepository } from './protocols/ILoadPostsRepository'

const makeLoadHotPostsRepositoryStub = (): ILoadPostsRepository => {
  class LoadHotPostsRepositoryStub {
    async load (hotPostsParam: IHotPostsParam): Promise<IHotPost[]> {
      const fakeHotPosts = [
        {
          id: '39bf55ee-e55c-40e1-9539-d57d2bf53eed',
          postTitle: 'Welcome to /r/artificial!',
          authorName: 't2_3dncp',
          authorFullName: 'CyberByte',
          creationDate: new Date(),
          numberOfUps: 130,
          numberOfComments: 16
        },
        {
          id: '3007c85a-d708-43ca-ba5d-8738052ccbd1',
          postTitle: 'Google AI Introduces ToTTo: A Controlled Table-to-Text Generation Dataset Using Novel Annotation Process',
          authorName: 't2_2wsvqwhg',
          authorFullName: 'ai-lover',
          creationDate: new Date(),
          numberOfUps: 23,
          numberOfComments: 1
        }
      ]
      return await new Promise(resolve => resolve(fakeHotPosts))
    }
  }
  return new LoadHotPostsRepositoryStub()
}

interface ISut {
  loadHotPostsRepositoryStub: ILoadPostsRepository
  sut: DBLoadHotPosts
}

const makeSut = (): ISut => {
  const loadHotPostsRepositoryStub = makeLoadHotPostsRepositoryStub()
  const sut = new DBLoadHotPosts(loadHotPostsRepositoryStub)
  return {
    loadHotPostsRepositoryStub,
    sut
  }
}

describe('DBLoadHotPosts Usecaes', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadHotPostsRepository with correct values', async () => {
    const { sut, loadHotPostsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadHotPostsRepositoryStub, 'load')
    const hotPostsParams = {
      initialDate: 'valid_initial_date',
      finalDate: 'valid_final_date',
      orderBy: 'valid_order_by'
    }
    await sut.load(hotPostsParams)
    expect(loadSpy).toHaveBeenCalledWith(hotPostsParams)
  })

  it('Should throws error if LoadHotPostsRepository throws Error', async () => {
    const { sut, loadHotPostsRepositoryStub } = makeSut()
    jest.spyOn(loadHotPostsRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const hotPostsParams = {
      initialDate: 'any_initial_date',
      finalDate: 'any_final_date',
      orderBy: 'any_order_by'
    }
    const hotPostsPromises = sut.load(hotPostsParams)
    await expect(hotPostsPromises).rejects.toThrow()
  })

  it('Should return hot posts on success', async () => {
    const { sut } = makeSut()
    const hotPostsParams = {
      initialDate: 'valid_initial_date',
      finalDate: 'valid_final_date',
      orderBy: 'valid_order_by'
    }
    const hotPosts = await sut.load(hotPostsParams)
    expect(hotPosts).toEqual([
      {
        id: '39bf55ee-e55c-40e1-9539-d57d2bf53eed',
        postTitle: 'Welcome to /r/artificial!',
        authorName: 't2_3dncp',
        authorFullName: 'CyberByte',
        creationDate: new Date(),
        numberOfUps: 130,
        numberOfComments: 16
      },
      {
        id: '3007c85a-d708-43ca-ba5d-8738052ccbd1',
        postTitle: 'Google AI Introduces ToTTo: A Controlled Table-to-Text Generation Dataset Using Novel Annotation Process',
        authorName: 't2_2wsvqwhg',
        authorFullName: 'ai-lover',
        creationDate: new Date(),
        numberOfUps: 23,
        numberOfComments: 1
      }
    ])
  })
})
