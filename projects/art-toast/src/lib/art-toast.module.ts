import { NgModule } from '@angular/core';
import { ArtToastComponent } from './art-toast.component';
import { CommonModule } from '@angular/common';
import { ArtToastItemComponent } from './toastItem/art-toast-item.component';
import { ArtToastService } from './art-toast.service';



@NgModule({
  imports: [
      CommonModule
  ],
  declarations: [ArtToastComponent, ArtToastItemComponent],
  exports: [ArtToastComponent, ArtToastItemComponent],
  providers: [ArtToastService],
})
export class ArtToastModule { }
