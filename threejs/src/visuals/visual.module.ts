import { NgModule } from '@angular/core';

//import { SampleComponent } from './sample/sample.component';
//import { ThreeComponent } from './sample/three.component';
//import { BoxComponent } from './sample/box.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { WindowSizeService } from './services/window-size';

@NgModule({
  declarations: [
    SandboxComponent,
//    SampleComponent,
//    ThreeComponent,
//    BoxComponent
  ],
  imports: [
  ],
  exports: [
    SandboxComponent,
//    SampleComponent,
//    ThreeComponent,
//    BoxComponent
  ],
  providers: [ WindowSizeService ],
  bootstrap: []
})
export class VisualModule { }
