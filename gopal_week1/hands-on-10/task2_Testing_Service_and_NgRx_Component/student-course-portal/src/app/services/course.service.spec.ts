/*
 * Task 2 — Unit Tests for CourseService
 * =======================================
 * Steps 106–108
 *
 * Key testing tools:
 *   HttpClientTestingModule   — replaces real HttpClient with a mock backend
 *   HttpTestingController     — lets us intercept, inspect, and flush HTTP requests
 *   httpMock.expectOne(url)   — asserts exactly one request was made to the given URL
 *   req.flush(data)           — simulates a successful HTTP response
 *   req.flush(null, { status: 500, statusText: 'Server Error' })
 *                             — simulates an error response
 *   httpMock.verify()         — asserts no unsatisfied requests remain after the test
 *
 * WHY verify():
 *   It catches tests that accidentally make extra HTTP calls beyond what is expected.
 *   Without verify() a test could "pass" while silently leaking HTTP calls.
 */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService, COURSES_URL } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  // ── Shared mock data ──────────────────────────────────────────────────────
  const mockCourses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Reactive Programming',    code: 'RXJ202', credits: 4, gradeStatus: 'pending' },
  ];

  // ── Step 106: TestBed configuration ──────────────────────────────────────
  /*
   * HttpClientTestingModule swaps HttpClient with a test double.
   * Every http.get() / http.post() call is captured by HttpTestingController
   * instead of actually hitting the network.
   *
   * inject() pulls the service and controller from the test DI container.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });

    service  = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // ── afterEach: verify no outstanding HTTP requests ────────────────────────
  /*
   * httpMock.verify() is called AFTER every test.
   * If the test forgot to flush a pending request this throws, making the test fail.
   */
  afterEach(() => {
    httpMock.verify();
  });

  // ── Step 102 (service equivalent): creation test ─────────────────────────
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── Step 107: getCourses() success path ──────────────────────────────────
  /*
   * Flow:
   *   1. Subscribe to getCourses() — the Observable is cold; nothing fires yet
   *   2. expectOne() intercepts the pending GET request and returns a TestRequest
   *   3. flush() provides the simulated response body → the Observable emits
   *   4. The subscription callback runs and our expect() assertions execute
   *   5. verify() (in afterEach) confirms no other requests were made
   */
  it('should GET courses from the correct URL', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Introduction to Angular');
      expect(courses[1].code).toBe('RXJ202');
    });

    // Step 107: Assert exactly one request to COURSES_URL
    const req = httpMock.expectOne(COURSES_URL);
    expect(req.request.method).toBe('GET');

    // Flush simulates the server responding with mockCourses
    req.flush(mockCourses);
  });

  it('should return all courses with correct structure', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
    });

    httpMock.expectOne(COURSES_URL).flush(mockCourses);
  });

  // ── Step 108: error handling ──────────────────────────────────────────────
  /*
   * flush() can simulate HTTP errors via the { status, statusText } options.
   * The service's catchError handler converts this to a thrown Error observable.
   * We assert the subscriber's error callback receives the expected message.
   */
  it('should emit an error when the server returns 500', () => {
    let capturedError: Error | undefined;

    service.getCourses().subscribe({
      next: () => fail('Expected an error, not courses'),
      error: (err: Error) => {
        capturedError = err;
      },
    });

    // Simulate a 500 Internal Server Error response
    httpMock.expectOne(COURSES_URL).flush(
      { message: 'Internal Server Error' },
      { status: 500, statusText: 'Server Error' }
    );

    expect(capturedError).toBeDefined();
    expect(capturedError?.message).toContain('Server error 500');
  });

  it('should emit an error when the server returns 404', () => {
    let errorEmitted = false;

    service.getCourses().subscribe({
      next: () => fail('Expected an error'),
      error: (err: Error) => {
        errorEmitted = true;
        expect(err.message).toContain('Server error 404');
      },
    });

    httpMock.expectOne(COURSES_URL).flush(
      { message: 'Not Found' },
      { status: 404, statusText: 'Not Found' }
    );

    expect(errorEmitted).toBeTrue();
  });

  // ── verify() is called in afterEach for ALL tests ────────────────────────
  // A test that makes an extra HTTP call NOT covered by expectOne() will be
  // caught by the afterEach verify() call — no extra test needed for that.
});
