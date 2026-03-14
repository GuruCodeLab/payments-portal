import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/payments-list/payments-list.component').then(
        (m) => m.PaymentsListComponent
      ),
  },
  { path: '**', redirectTo: '' },
];

