import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastService } from './service/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: 'toast.component.html',
    styleUrls: ['toast.component.scss']
})

export class ToastComponent implements OnInit {

    public showToast: boolean;

    @ViewChild('list', {static: false}) list: ElementRef<HTMLDivElement>;

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        this.toastService.changes.subscribe(e => {
            this.showToast = e.length > 0;
            setTimeout(() => {
                this.updateHeight();
            }, 0);
        });
    }

    get allToasts() {
        return this.toastService.toasts;
    }

    updateHeight() {
        if (!this.allToasts.length) {
            try {
                this.list.nativeElement.style.minHeight = `78px`;
            } catch (err) {}
            return;
        }
        let height = 0;
        this.allToasts.forEach(e => {
            height += e.height;
        });
        this.list.nativeElement.style.minHeight = `${height + (10 * this.allToasts.length)}px`;
    }
}
