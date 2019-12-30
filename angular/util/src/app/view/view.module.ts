import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';

import { SampleViewComponent } from '../view/sample-view/sample-view.component';
import { TestViewComponent, Dex2HexPipe, HexByteComponent, HexViewComponent } from '../view/test-view/test-view.component';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [SampleViewComponent, TestViewComponent, Dex2HexPipe, HexByteComponent, HexViewComponent],
  imports: [
    FormsModule,
    CommonModule,
    ClipboardModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    CheckboxModule
  ],
  exports: [SampleViewComponent, TestViewComponent]
})
export class ViewModule { }