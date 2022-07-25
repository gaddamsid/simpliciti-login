import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipeStub } from './TranslatePipeStub ';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from './TranslateServiceStub.class';
@NgModule({
    declarations: [
      TranslatePipeStub,
    ],
    exports: [
      TranslatePipeStub,
    ],
    providers: [
      { provide: TranslateService, useClass: TranslateServiceStub },
    ],
  })
export class TranslateStubsModule  { }
