import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from 'ngx-clipboard';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

 
import { SampleViewComponent } from '../view/sample-view/sample-view.component';
import { TestViewComponent, Dex2HexPipe, HexByteComponent, HexViewComponent } from '../view/test-view/test-view.component';
import { UploadViewComponent } from '../view/upload-view/upload-view.component';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

export function getHighlightLanguages() {
  return {
    cpp: () => import('highlight.js/lib/languages/cpp')
  };

}

@NgModule({
  declarations: [SampleViewComponent, TestViewComponent, Dex2HexPipe, HexByteComponent, HexViewComponent, UploadViewComponent],
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
  exports: [SampleViewComponent, TestViewComponent, UploadViewComponent]
})
export class ViewModule { }