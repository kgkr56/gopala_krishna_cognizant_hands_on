import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  // Step 34: HighlightDirective imported so it can be used in this template.
  // Step 36: CreditLabelPipe imported so {{ course.credits | creditLabel }} works.
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
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

  /** Step 31: Controls the expanded / collapsed state of the card. */
  isExpanded = false;

  /**
   * Step 32: Getter for [ngClass] binding.
   *
   * WHY GETTERS KEEP TEMPLATES CLEAN:
   * Keeping conditional class logic in a getter removes complexity from the
   * template. The template stays declarative, and all class conditions live in
   * one typed, testable place. Angular evaluates the getter lazily with no
   * performance overhead compared to an inline object literal.
   */
  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.course.enrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded,
    };
  }

  /**
   * Step 30: Returns a dynamic inline style object for [ngStyle].
   * Sets the card's left-border colour based on gradeStatus.
   */
  get borderStyle(): Record<string, string> {
    const colourMap: Record<string, string> = {
      passed:  '#2e7d32',
      failed:  '#c62828',
      pending: '#9e9e9e',
    };
    return { 'border-left': `4px solid ${colourMap[this.course.gradeStatus] ?? '#9e9e9e'}` };
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
