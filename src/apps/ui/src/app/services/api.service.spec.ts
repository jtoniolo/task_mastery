import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request', () => {
    const dummyData = { message: 'Hello API' };

    service.get('/api/data').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should make a POST request', () => {
    const dummyData = { message: 'Hello API' };
    const postData = { name: 'John' };

    service.post('/api/data', postData).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
    req.flush(dummyData);
  });

  it('should make a PUT request', () => {
    const dummyData = { message: 'Hello API' };
    const putData = { name: 'John' };

    service.put('/api/data', putData).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(putData);
    req.flush(dummyData);
  });

  it('should make a DELETE request', () => {
    const dummyData = { message: 'Hello API' };

    service.delete('/api/data').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyData);
  });
});
