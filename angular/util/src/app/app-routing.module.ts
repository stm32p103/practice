import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleViewComponent } from './view/sample-view/sample-view.component'
import { TestViewComponent } from './view/test-view/test-view.component'
import { UploadViewComponent } from './view/upload-view/upload-view.component'
import { ResizeViewComponent } from './view/resize-view/resize-view.component'
import { ThreeViewComponent } from './view/three-view/three-view.component'
import { DataViewComponent } from './view/data-view/data-view.component'

const routes: Routes = [
  { path: 'sample', component: SampleViewComponent },
  { path: 'test', component: TestViewComponent },
  { path: 'upload', component: UploadViewComponent },
  { path: 'resize', component: ResizeViewComponent },
  { path: 'three', component: ThreeViewComponent },
  { path: 'data', component: DataViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // enabled で有効化
    anchorScrolling: 'enabled', // enabled で有効化
    scrollOffset: [0, 50]
  } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }