import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { httpInterceptor } from './http.interceptor';

describe('hTTPInterceptorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => httpInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization and Accept headers to the request', done => {
    const testApiKey = 'TEST_API_KEY';
    environment.apiKey = testApiKey;

    const mockRequest = new HttpRequest('GET', '/test');

    const mockNext: HttpHandlerFn = req => {
      expect(req.headers.get('Authorization')).toBe(`Bearer ${testApiKey}`);
      expect(req.headers.get('Accept')).toBe('application/json');
      done();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    };

    httpInterceptor(mockRequest, mockNext);
  });

  it('should preserve other headers already on the request', done => {
    const testApiKey = 'TEST_API_KEY';
    environment.apiKey = testApiKey;

    const originalHeaders = new HttpHeaders({ 'X-Custom-Header': 'value' });
    const mockRequest = new HttpRequest('GET', '/test', {
      headers: originalHeaders,
    });

    const mockNext: HttpHandlerFn = req => {
      expect(req.headers.get('Authorization')).toBe(`Bearer ${testApiKey}`);
      expect(req.headers.get('Accept')).toBe('application/json');
      expect(req.headers.get('X-Custom-Header')).toBe('value');
      done();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    };

    httpInterceptor(mockRequest, mockNext);
  });
});
