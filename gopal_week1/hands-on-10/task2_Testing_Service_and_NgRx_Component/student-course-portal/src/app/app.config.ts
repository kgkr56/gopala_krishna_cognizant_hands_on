import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({}),
    provideState('course', courseReducer),
    provideState('enrollment', enrollmentReducer),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
