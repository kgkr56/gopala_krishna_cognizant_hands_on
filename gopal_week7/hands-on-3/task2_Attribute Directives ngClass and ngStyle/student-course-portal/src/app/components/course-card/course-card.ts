import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course: Course = {
    id: 0,
    name: '',
    code: '',
    credits: 0,
    enrolled: false,
    gradeStatus: 'pending',
  };

  @Output() enrollRequested = new EventEmitter<number>();

  // Step 31: Tracks whether the card is expanded via the "Show Details" toggle.
  isExpanded = false;

  /**
   * Step 32: Getter that returns the ngClass object binding.
   *
   * WHY GETTERS KEEP TEMPLATES CLEAN:
   * Moving conditional class logic into a getter removes complexity from the
   * template, making it declarative and easy to read.  The getter is also
   * a single source of truth — if class conditions change, only the TS file
   * needs to be updated.  Angular evaluates the getter lazily, so there is no
   * performance difference compared to an inline object literal in the template.
   */
  get cardClasses(): Record<string, boolean> {
    return {
      // Step 29: 'card--enrolled' highlights courses the student has enrolled in.
      'card--enrolled': this.course.enrolled,
      // Step 29: 'card--full' flags high-credit courses (credits >= 4).
      'card--full': this.course.credits >= 4,
      // Step 31: 'expanded' increases card height to reveal extra details.
      'expanded': this.isExpanded,
    };
  }

  /**
   * Step 30: Returns a dynamic inline style object based on gradeStatus.
   * Used with [ngStyle] to set the card's left border colour.
   *
   * NOTE: Prefer [ngClass] over [ngStyle] for most styling — classes keep
   * styles in CSS files.  [ngStyle] is appropriate here because the colour
   * value is truly dynamic and cannot be expressed as a static class.
   */
  get borderStyle(): Record<string, string> {
    const colourMap: Record<string, string> = {
      passed:  '#2e7d32',  // green
      failed:  '#c62828',  // red
      pending: '#9e9e9e',  // grey
    };
    const colour = colourMap[this.course.gradeStatus] ?? '#9e9e9e';
    return { 'border-left': `4px solid ${colour}` };
  }

  /** Step 31: Toggle expanded state on button click. */
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
