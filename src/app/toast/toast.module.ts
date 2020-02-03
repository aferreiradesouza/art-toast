import { NgModule } from '@angular/core';

import { ToastComponent } from './toast.component';
import { CommonModule } from '@angular/common';
import { ToastService } from './service/toast.service';
import { ToastItemComponent } from './toastItem/toastItem.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ToastComponent, ToastItemComponent],
    exports: [ToastComponent, ToastItemComponent],
    providers: [ToastService],
})
export class ToastModule { }
