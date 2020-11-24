export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest<Body = any> {
  body?: Body
}
