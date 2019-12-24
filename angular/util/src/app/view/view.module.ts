import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleViewComponent } from '../view/sample-view/sample-view.component';
import { TestViewComponent } from '../view/test-view/test-view.component';



@NgModule({
  declarations: [SampleViewComponent, TestViewComponent],
  imports: [
    CommonModule
  ],
  exports: [SampleViewComponent, TestViewComponent]
})
export class ViewModule { }
