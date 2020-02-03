import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { TypesToast, ConfigToast, ToastService } from '../service/toast.service';

@Component({
    selector: 'app-toast-item',
    templateUrl: 'toastItem.component.html',
    styleUrls: ['toastItem.component.scss']
})

export class ToastItemComponent implements OnInit {

    public timeout: any;
    public timeStart: number;
    public timePause: number;

    @Input() title: string;
    @Input() message: string;
    @Input() id: number;
    @Input() config: ConfigToast;
    @Input() type: TypesToast;
    @Input() index: number;
    @Input() addTransitionExit: boolean;

    @ViewChild('progressBar', { static: false }) progressBar: ElementRef<HTMLDivElement>;
    @ViewChild('toast', { static: false }) toast: ElementRef<HTMLDivElement>;

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        setTimeout(() => {
            this.start();
        }, 0);
    }

    start() {
        this.toastService.setSize(this.id, this.toast.nativeElement.offsetHeight);
        if (this.config.timer === 0 || !this.config.timer) {
            return;
        }
        this.timeStart = new Date().getTime();
        const seconds = ((this.config.timer % 60000) / 1000).toFixed(2);
        this.progressBar.nativeElement.style.transition = `${seconds}s all linear`;
        this.progressBar.nativeElement.style.width = '100%';
        this.timeout = setTimeout(() => {
            this.closeToast(this.id);
        }, this.config.timer);
    }

    closeToast(id: number): void {
        this.toastService.removeToast(id);
    }

    clickRemoveToast(buttonClose: boolean = false) {
        if (this.config.showButtonClose && buttonClose) {
            clearTimeout(this.timeout);
            this.closeToast(this.id);
        } else if (!this.config.showButtonClose && !buttonClose) {
            clearTimeout(this.timeout);
            this.closeToast(this.id);
        }
    }

    getTopPosition() {
        if (this.toastService.toasts.length === 1) {
            return `${(this.index * 68) + this.index * 10}px`;
        } else {
            let sum = 0;
            for (let i = 0; i < this.index; i++) {
                sum += this.toastService.toasts[i].height;
            }
            return `${sum + this.index * 10}px`;
        }
    }

    onClick() {
        this.config.button.fn();
    }

    addTransitionEnter() {
        return this.toastService.toasts.length === 1;
    }

    getIcon() {
        if (this.config.customIcon) {
            return this.config.customIcon;
        }
        return this.toastService.getIcon(this.type);
    }

    mouseEnter(event: MouseEvent) {
        if (!this.config.timer || this.addTransitionExit) {
            return;
        }
        clearTimeout(this.timeout);
        this.timePause = new Date().getTime();
        this.progressBar.nativeElement.style.width = `${this.progressBar.nativeElement.offsetWidth}px`;
    }

    mouseLeave(event: MouseEvent) {
        if (!this.config.timer || this.addTransitionExit) {
            return;
        }
        this.resumeTimeOut();
    }

    resumeTimeOut(): void {
        this.config.timer = this.config.timer - (this.timePause - this.timeStart);
        const seconds = ((this.config.timer % 60000) / 1000).toFixed(2);
        this.progressBar.nativeElement.style.transition = `${seconds}s all linear`;
        this.progressBar.nativeElement.style.width = '100%';
        this.timeStart = new Date().getTime();
        this.timeout = setTimeout(() => {
            this.closeToast(this.id);
        }, this.config.timer);
    }
}
