/*
 * Task 1 — Unit Tests for CourseCardComponent
 * =============================================
 * Steps 101–105
 *
 * Key testing tools used here:
 *   TestBed            — Angular's unit-test DI container / component factory
 *   ComponentFixture   — wrapper around the component instance + DOM
 *   By.css()           — queries the component's rendered DOM (scoped, not document-wide)
 *   fixture.detectChanges() — triggers Angular change detection after property changes
 *   spyOn()            — Jasmine spy: intercepts a method call and records arguments
 *
 * Run:  ng test
 * Coverage: ng test --code-coverage
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  // ── Shared mock data ──────────────────────────────────────────────────────
  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  // ── Step 101: TestBed configuration ──────────────────────────────────────
  /*
   * configureTestingModule sets up a mini Angular module for this test suite.
   * For STANDALONE components, pass the component in the imports array
   * (not declarations — standalone components are self-contained modules).
   *
   * createComponent() renders the component in an isolated test host.
   * componentInstance gives direct access to the class properties and methods.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component → import it, don't declare it
      imports: [CourseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  // ── Step 102: Creation test ───────────────────────────────────────────────
  /*
   * The most basic smoke test — verifies the component class was instantiated.
   * This will fail if the constructor throws, required DI tokens are missing,
   * or the template has a compile-time error.
   */
  it('should create the component', () => {
    component.course = mockCourse; // satisfy the required @Input
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // ── Step 103: @Input rendering ────────────────────────────────────────────
  /*
   * Sets the @Input course, calls detectChanges() to trigger the initial
   * data-binding pass, then queries the rendered DOM with By.css().
   *
   * WHY By.css() over document.querySelector:
   *   By.css() searches ONLY within this component's host element —
   *   it cannot accidentally find elements from other components
   *   that might be present in the same Karma browser tab.
   */
  it('should display the course name in an h3 element', () => {
    component.course = mockCourse;
    fixture.detectChanges(); // trigger interpolation {{ course.name }}

    const h3: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toBe('Data Structures');
  });

  it('should display the course code', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const codeText = paragraphs.map((p) => p.nativeElement.textContent).join(' ');
    expect(codeText).toContain('CS101');
  });

  it('should show "Enroll" button when isEnrolled is false', () => {
    component.course = mockCourse;
    component.isEnrolled = false;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btn.textContent?.trim()).toBe('Enroll');
  });

  it('should show "Unenroll" button when isEnrolled is true', () => {
    component.course = mockCourse;
    component.isEnrolled = true;
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btn.textContent?.trim()).toBe('Unenroll');
  });

  // ── Step 104: @Output — enrollRequested EventEmitter ─────────────────────
  /*
   * spyOn replaces enrollRequested.emit with a Jasmine spy function.
   * The spy records every call and its arguments but does NOT invoke the real
   * EventEmitter — the parent subscription never receives the event in unit tests.
   *
   * After clicking the button, we assert:
   *   1. The emit method was called (toHaveBeenCalled)
   *   2. It was called with the course's id (toHaveBeenCalledWith)
   */
  it('should emit enrollRequested with course.id when Enroll button is clicked', () => {
    component.course = mockCourse;
    component.isEnrolled = false;
    fixture.detectChanges();

    // Spy AFTER detectChanges so the component is fully initialised
    spyOn(component.enrollRequested, 'emit');

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should emit enrollRequested even when already enrolled (unenroll path)', () => {
    component.course = mockCourse;
    component.isEnrolled = true;
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    // The component always emits the id — the parent decides the action
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // ── Step 105: ngOnChanges — console.log spy ───────────────────────────────
  /*
   * ngOnChanges is an Angular lifecycle hook — called by the framework whenever
   * a bound @Input changes.  To test it in isolation we:
   *   1. Spy on console.log BEFORE calling ngOnChanges manually
   *   2. Call component.ngOnChanges() with a hand-crafted SimpleChanges object
   *   3. Assert the expected log message was produced
   *
   * WHY call ngOnChanges manually:
   *   We want to test the method itself, not rely on the framework to trigger it.
   *   Direct calls give fine-grained control over the SimpleChanges payload.
   */
  it('should log the new course name when ngOnChanges is called with a course change', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true),
    });

    expect(console.log).toHaveBeenCalledWith(
      'CourseCard: course changed to "Data Structures"'
    );
  });

  it('should NOT log when ngOnChanges is called without a course change', () => {
    spyOn(console, 'log');

    // Simulate a change to a different input (e.g., isEnrolled)
    component.ngOnChanges({
      isEnrolled: new SimpleChange(false, true, false),
    });

    expect(console.log).not.toHaveBeenCalled();
  });

  // ── Step 103 (extra): badge class reflects gradeStatus ───────────────────
  it('should apply the correct badge class for gradeStatus "passed"', () => {
    component.course = mockCourse; // gradeStatus: 'passed'
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge.nativeElement.classList).toContain('badge-passed');
  });

  it('should apply badge-failed class for a failed course', () => {
    component.course = { ...mockCourse, gradeStatus: 'failed' };
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge.nativeElement.classList).toContain('badge-failed');
  });
});
