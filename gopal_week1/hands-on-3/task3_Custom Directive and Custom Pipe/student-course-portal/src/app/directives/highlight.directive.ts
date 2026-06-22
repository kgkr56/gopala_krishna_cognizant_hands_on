import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Step 33 & 37: HighlightDirective — Attribute Directive
 *
 * Adds a configurable background colour to the host element on mouseenter
 * and removes it on mouseleave.
 *
 * Usage (default yellow):
 *   <app-course-card appHighlight ...></app-course-card>
 *
 * Usage (custom colour — Step 37):
 *   <app-course-card appHighlight="lightblue" ...></app-course-card>
 *
 * WHY @HostListener:
 * @HostListener binds to DOM events on the directive's host element without
 * requiring manual addEventListener / removeEventListener calls.
 * Angular automatically cleans up the listener when the directive is destroyed,
 * preventing memory leaks.
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  /**
   * Step 37: The caller can pass a custom colour as the directive's input.
   * Defaults to 'yellow' when the attribute is used without a value:
   *   <div appHighlight>           → yellow highlight
   *   <div appHighlight="lightblue"> → blue highlight
   */
  @Input() appHighlight: string = 'yellow';

  // Store the original background colour so we can restore it on mouseleave.
  private originalBackground = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /** Step 33: Add background highlight when the mouse enters the host element. */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Save the current background before overriding it.
    this.originalBackground =
      this.el.nativeElement.style.backgroundColor || '';
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.appHighlight
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'background-color 0.2s ease'
    );
  }

  /** Step 33: Remove the highlight when the mouse leaves the host element. */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.originalBackground
    );
  }
}
