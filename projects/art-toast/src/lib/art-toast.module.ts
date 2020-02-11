import { NgModule, ModuleWithProviders } from '@angular/core';
import { ArtToastComponent } from './art-toast.component';
import { CommonModule } from '@angular/common';
import { ArtToastItemComponent } from './toastItem/art-toast-item.component';
import { ArtToastService } from './art-toast.service';

export interface CustomTheme {
  success: {
    backgroundColor: string;
    color: string;
  };
  danger: {
    backgroundColor: string;
    color: string;
  };
  info: {
    backgroundColor: string;
    color: string;
  };
  warning: {
    backgroundColor: string;
    color: string;
  };
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArtToastComponent, ArtToastItemComponent],
  exports: [ArtToastComponent, ArtToastItemComponent],
  providers: [ArtToastService],
})
export class ArtToastModule {
  static forRoot(config: CustomTheme): ModuleWithProviders {
    return {
      ngModule: ArtToastModule,
      providers: [ArtToastService, { provide: 'config', useValue: config }]
    };
  }
}
