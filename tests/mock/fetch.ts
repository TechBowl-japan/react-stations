export const imageUrl = 'https://avatars.githubusercontent.com/u/298748'
export const mockServerResponse = {
  message: imageUrl,
  status: 'success',
}
export const mockResponse: Response = {
  headers: {} as any,
  ok: true,
  redirected: false,
  status: 200,
  statusText: 'OK',
  trailer: {} as any,
  type: 'default',
  body: null,
  url: '',
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
    return Promise.resolve(JSON.parse(JSON.stringify(mockServerResponse)))
  },
  text() {
    return Promise.resolve(JSON.stringify(mockServerResponse))
  },
  clone() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
}
