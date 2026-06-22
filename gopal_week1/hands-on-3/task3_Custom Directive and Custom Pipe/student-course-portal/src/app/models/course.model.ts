/**
 * Course model — defines the shape of a course object used across the portal.
 * gradeStatus is added in Hands-On 3 to support *ngSwitch badge rendering.
 */
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  enrolled: boolean;
  gradeStatus: 'passed' | 'failed' | 'pending';
}
