/*
 * Task 2 — Unit Tests for CourseListComponent (NgRx MockStore)
 * =============================================================
 * Steps 109–110
 *
 * Key testing tools:
 *   provideMockStore({ initialState }) — replaces the real NgRx store with a
 *                                        controllable mock that does NOT run
 *                                        real reducers or Effects.
 *
 *   MockStore                         — lets the test:
 *                                         • pre-load state via initialState
 *                                         • change state mid-test with setState()
 *                                         • spy on dispatched actions with dispatchSpy
 *
 *   store.setState(newState)          — Step 110: replaces the entire state tree
 *                                        and fires all active selectors.
 *
 * WHY MockStore instead of the real Store:
 *   - No Effects fire → no HTTP calls in tests
 *   - State is fully deterministic — you control exactly what selectors return
 *   - Tests run synchronously (no async delay from Effects)
 *
 * AppState shape expected by MockStore:
 *   { course: CourseState, enrollment: EnrollmentState }
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';

describe('CourseList (MockStore)', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  // ── Shared mock data ──────────────────────────────────────────────────────
  const mockCourses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'ANG101', credits: 3, gradeStatus: 'passed'  },
    { id: 2, name: 'Reactive Programming',    code: 'RXJ202', credits: 4, gradeStatus: 'pending' },
    { id: 3, name: 'TypeScript Fundamentals', code: 'TS301',  credits: 3, gradeStatus: 'passed'  },
  ];

  // ── Step 109: TestBed + provideMockStore ──────────────────────────────────
  /*
   * provideMockStore({ initialState }) populates the mock store with the given
   * state tree.  Selectors (selectAllCourses, selectCoursesLoading, etc.) read
   * from this state — exactly as they would from the real store.
   *
   * We provide the full AppState shape so every createFeatureSelector() call
   * resolves correctly without throwing "feature state not found".
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList], // standalone component
      providers: [
        provideMockStore({
          initialState: {
            course: {
              courses: mockCourses,
              loading: false,
              error: null,
            },
            enrollment: {
              enrolledCourseIds: [],
            },
          },
        }),
      ],
    }).compileComponents();

    store   = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Reset store overrides between tests to prevent selector memo contamination
    store.resetSelectors();
  });

  // ── Step 102 equivalent: creation ────────────────────────────────────────
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // ── Step 109: initial state renders correct course cards ─────────────────
  /*
   * fixture.detectChanges() triggers ngOnInit (dispatches loadCourses) and runs
   * the async pipe against the MockStore observables.
   * The MockStore returns mockCourses immediately (no async delay).
   *
   * We then query the rendered DOM for h3 elements inside course cards and
   * assert the rendered text matches the mock data.
   */
  it('should render course cards for each course in the initial state', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(3);
  });

  it('should dispatch loadCourses() on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges(); // triggers ngOnInit

    expect(dispatchSpy).toHaveBeenCalledWith(loadCourses());
  });

  it('should NOT show the loading indicator when loading is false', () => {
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('.loading-msg'));
    expect(loadingEl).toBeNull();
  });

  // ── Step 110: setState() — simulate loading state ─────────────────────────
  /*
   * store.setState() replaces the entire state tree at any point in the test.
   * NgRx selectors re-evaluate immediately and the async pipe triggers CD.
   * We call fixture.detectChanges() to flush the CD cycle, then assert the
   * loading indicator is now visible.
   *
   * This is MockStore's most powerful feature:
   *   change state → detect changes → assert DOM — all in a few lines, no HTTP.
   */
  it('should display the loading indicator when loading is true', () => {
    fixture.detectChanges(); // initial render

    // Step 110: Simulate a loading state mid-test
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null,
      },
      enrollment: {
        enrolledCourseIds: [],
      },
    });

    fixture.detectChanges(); // flush the new state into the DOM

    const loadingEl = fixture.debugElement.query(By.css('.loading-msg'));
    expect(loadingEl).not.toBeNull();
    expect(loadingEl.nativeElement.textContent).toContain('Loading');
  });

  it('should hide the course grid while loading', () => {
    fixture.detectChanges();

    store.setState({
      course: { courses: mockCourses, loading: true, error: null },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();

    // course-grid has *ngIf="!(loading$ | async)" — should be absent
    const grid = fixture.debugElement.query(By.css('.course-grid'));
    expect(grid).toBeNull();
  });

  it('should show the error banner when error is set', () => {
    fixture.detectChanges();

    store.setState({
      course: { courses: [], loading: false, error: 'Failed to fetch courses' },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();

    const errorBanner = fixture.debugElement.query(By.css('.error-banner'));
    expect(errorBanner).not.toBeNull();
    expect(errorBanner.nativeElement.textContent).toContain('Failed to fetch courses');
  });

  // ── Bonus: empty state ────────────────────────────────────────────────────
  it('should show the empty message when courses array is empty', () => {
    store.setState({
      course: { courses: [], loading: false, error: null },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();

    const emptyMsg = fixture.debugElement.query(By.css('.empty-msg'));
    expect(emptyMsg).not.toBeNull();
  });

  it('should mark cards as enrolled when enrolledCourseIds includes the course id', () => {
    store.setState({
      course:     { courses: mockCourses, loading: false, error: null },
      enrollment: { enrolledCourseIds: [1] },       // course 1 enrolled
    });
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    // First card (id=1) receives [isEnrolled]="true" — the host element gets .enrolled class
    expect(cards.length).toBe(3);
  });
});
