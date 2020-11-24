export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest<Body = unknown> {
  body?: Body
}
