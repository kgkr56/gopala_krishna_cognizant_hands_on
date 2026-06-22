import { Pipe, PipeTransform } from '@angular/core';

/**
 * Step 35: CreditLabelPipe — Custom Pure Pipe
 *
 * Transforms a raw credits number into a human-readable string.
 *
 *   1       → '1 Credit'
 *   2+      → '2 Credits', '3 Credits', etc.
 *   null    → 'No Credits'
 *   0 / NaN → 'No Credits'
 *
 * Usage in template (Step 36):
 *   {{ course.credits | creditLabel }}
 *
 * WHY pure: true (default):
 * A pure pipe only re-runs when Angular detects a change to the input
 * reference (e.g. a new number).  If the input does not change,
 * Angular reuses the cached result — making pure pipes very efficient.
 * Set pure: false only when the pipe needs to react to mutable object
 * mutations; this forces the pipe to run on every change-detection cycle
 * and should be used sparingly because it can impact performance.
 */
@Pipe({
  name: 'creditLabel',
  standalone: true,
  pure: true, // default — only re-runs when input reference changes
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    // Edge cases: null, undefined, 0, or NaN → 'No Credits'
    if (credits === null || credits === undefined || credits <= 0 || isNaN(credits)) {
      return 'No Credits';
    }
    // '1 Credit' vs '2 Credits', '3 Credits', etc.
    return credits === 1 ? '1 Credit' : `${credits} Credits`;
  }
}
