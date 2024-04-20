import { RawHttpResponse } from '../src/declarations'
import { RawHttpResponseWrapper } from '../src/RawHttpResponseWrapper'

describe('RawHttpResponseWrapper', () => {
  let mockResponse: RawHttpResponse

  beforeEach(() => {
    // Mock the ServerResponse object
    mockResponse = {
      statusCode: 404,
      statusMessage: 'Not Found',
      body: 'Hello, world!',
      headers: { 'Content-Type': 'application/json' }
    }
  })

  it('should set status code and message when options are provided', () => {
    const wrapper = RawHttpResponseWrapper.create(mockResponse)

    const rawResponse = wrapper.respond()

    expect(rawResponse).toEqual(mockResponse)
    expect(rawResponse.statusCode).toBe(404)
    expect(rawResponse.statusMessage).toBe('Not Found')
  })

  it('should handle missing options gracefully', () => {
    const wrapper = RawHttpResponseWrapper.create({})

    const rawResponse = wrapper.respond()

    expect(rawResponse).not.toEqual(mockResponse)
    expect(rawResponse.statusCode).toBe(500)
    expect(rawResponse.body).toBeUndefined()
    expect(rawResponse.statusMessage).toBe('')
    expect(rawResponse.headers).toBeUndefined()
  })
})
