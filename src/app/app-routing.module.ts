import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEntryComponent } from './pages/form-entry/form-entry.component';
import { FormViewComponent } from './pages/form-view/form-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form-entry'
  },
  {
    path: 'form-entry',
    component: FormEntryComponent
  },
  {
    path: 'form-entry/:id',
    component: FormEntryComponent
  },
  {
    path: 'form-entry/view/:id/:recordId',
    component: FormViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
