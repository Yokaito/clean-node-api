export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest<T = any> = {
  body?: T
  headers?: any
}
