import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { ClipboardModule } from 'ngx-clipboard';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

 
import { SampleViewComponent } from '../view/sample-view/sample-view.component';
import { TestViewComponent, Dex2HexPipe, HexByteComponent, HexViewComponent } from '../view/test-view/test-view.component';
import { UploadViewComponent } from '../view/upload-view/upload-view.component';
import { ResizeViewComponent, CounterComponent,CounterHostDirective, CounterContainerComponent, CellComponent } from './resize-view/resize-view.component';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ThreeViewComponent } from './three-view/three-view.component';
import { DataViewComponent } from './data-view/data-view.component';

export function getHighlightLanguages() {
  return {
    cpp: () => import('highlight.js/lib/languages/cpp')
  };

}

@NgModule({
  declarations: [SampleViewComponent, TestViewComponent, Dex2HexPipe, HexByteComponent, HexViewComponent, UploadViewComponent, ResizeViewComponent,CounterComponent,CounterHostDirective, CounterContainerComponent, CellComponent, ThreeViewComponent, DataViewComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ClipboardModule,
    HighlightModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    FileUploadModule,
    ScrollPanelModule,
    CheckboxModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages()
      }

    }
  ],
  exports: [SampleViewComponent, TestViewComponent, UploadViewComponent, ResizeViewComponent,CounterHostDirective, CellComponent, ThreeViewComponent],
  entryComponents: [CounterComponent ]
})
export class ViewModule { }