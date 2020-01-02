import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleViewComponent } from './view/sample-view/sample-view.component'
import { TestViewComponent } from './view/test-view/test-view.component'
import { UploadViewComponent } from './view/upload-view/upload-view.component'

const routes: Routes = [
  { path: 'sample', component: SampleViewComponent },
  { path: 'test', component: TestViewComponent },
  { path: 'upload', component: UploadViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
