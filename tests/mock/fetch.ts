export const imageUrl = 'https://avatars.githubusercontent.com/u/298748'

export type Breeds = Record<string, string[]>

export const breeds: Breeds = {
  katagiri: [],
  watarai: [],
  hotori: [],
  kotoyose: [],
  reizeiin: [],
  onabuta: [],
  tadasugawa: [],
  susuko: [],
  tachibana: ['asane', 'junnosuke'],
}

export const imageByBreeds: Record<
  string,
  string[] | Record<string, string[]>
> = {
  katagiri: [],
  watarai: [],
  hotori: [],
  kotoyose: [],
  reizeiin: [imageUrl],
  onabuta: [],
  tadasugawa: [],
  susuko: [],
  tachibana: {
    asane: [],
    junnosuke: [],
  },
}

const statusTextByCode: Record<number, string> = {
  200: 'OK',
  404: 'Not Found',
}

const mockResponse = (
  url: string,
  serverResponse: any,
  code?: number,
): Response => ({
  headers: {} as any,
  ok: true,
  redirected: false,
  status: code ?? 200,
  statusText: statusTextByCode[code ?? 200] ?? 'OK',
  trailer: {} as any,
  type: 'default',
  body: null,
  url,
  bodyUsed: false,
  arrayBuffer() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
  blob() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
  formData() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
  json() {
    return Promise.resolve(JSON.parse(JSON.stringify(serverResponse)))
  },
  text() {
    return Promise.resolve(JSON.stringify(serverResponse))
  },
  clone() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
} as Response)

const randomImageTest = /^(https?)?:\/\/dog.ceo\/api\/breeds\/image\/random\/?$/
const randomImageTestByBreed = /^(https?)?:\/\/dog.ceo\/api\/breed\/([A-Za-z]+)(\/([A-Za-z]+))?\/image\/random\/?$/
const breedsAllTest = /^(https?)?:\/\/dog.ceo\/api\/breeds\/list\/all\/?$/

// not used
const randomMultipleImageTest = /^(https?)?:\/\/dog.ceo\/api\/breeds\/image\/random\/([1-9]*[0-9])\/?$/
const breedImagesTest = /^(https?)?:\/\/dog.ceo\/api\/breed\/([A-Za-z]+)\/images\/?$/
const randomMultipleImageTestByBreed = /^(https?)?:\/\/dog.ceo\/api\/breed\/([A-Za-z]+)(\/([A-Za-z]+))?\/image\/random\/([1-9]*[0-9])\/?$/
const breedListTest = /^(https?)?:\/\/dog.ceo\/api\/breed\/([A-Za-z]+)\/list\/?$/

const pickOne = <T>(a: T[]): T | undefined => {
  if (a.length === 0) {
    return undefined
  }

  return a[Math.floor(a.length * Math.random())]
}

const unimplementedMockApiRouteHandler = () => {
  throw new Error('unhandled API route. Did you read the manual?')
}

const mockApiRoutes: {
  test: RegExp
  handle(url: string): { message: any; status: string; code?: number }
}[] = [
  {
    test: randomImageTest,
    handle(_: string) {
      return {
        message: imageUrl,
        status: 'success',
      }
    },
  },
  {
    test: breedsAllTest,
    handle(_: string) {
      return {
        message: breeds,
        status: 'success',
      }
    },
  },
  {
    test: randomImageTestByBreed,
    handle(url: string) {
      const [breed, _, subbreed] = url.match(randomImageTestByBreed)!.slice(3)

      const breedImages = imageByBreeds[breed]
      if (breedImages === undefined) {
        return {
          status: 'error',
          message: 'Breed not found (master breed does not exist)',
          code: 404,
        }
      }

      if (subbreed) {
        if (
          breedImages instanceof Array ||
          breedImages[subbreed] === undefined
        ) {
          return {
            status: 'error',
            message: 'Breed not found (sub breed does not exist)',
            code: 404,
          }
        }

        return {
          message: pickOne(breedImages[subbreed]),
          status: 'success',
        }
      }

      if (!(breedImages instanceof Array)) {
        return {
          message: pickOne(Object.values(breedImages).flat()),
          status: 'success',
        }
      }

      return {
        message: pickOne(breedImages),
        status: 'success',
      }
    },
  },
  {
    test: randomMultipleImageTest,
    handle: unimplementedMockApiRouteHandler,
  },
  {
    test: breedImagesTest,
    handle: unimplementedMockApiRouteHandler,
  },
  {
    test: randomMultipleImageTestByBreed,
    handle: unimplementedMockApiRouteHandler,
  },
  {
    test: breedListTest,
    handle: unimplementedMockApiRouteHandler,
  }
]

export const fetchMock: typeof window.fetch = (resource, ..._) => {
  const url = typeof resource === 'string' ? resource : resource.url
  const handler = mockApiRoutes.find(r => r.test.test(url))
  if (!handler) {
    throw new Error(`unhandled API route "${url}". Did you read the manual?`)
  }
  const res = handler!.handle(url)
  return Promise.resolve(mockResponse(url, res, res.code))
}
