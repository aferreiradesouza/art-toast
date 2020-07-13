import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ConfigToast, TypesToast, ArtToastService, Toast } from '../art-toast.service';

@Component({
    selector: 'art-toast-item',
    templateUrl: 'art-toast-item.component.html',
    styleUrls: ['art-toast-item.component.scss', '../style/animate.component.css', '../font/font.scss']
})

export class ArtToastItemComponent implements OnInit {

    public timeout: any;
    public timeStart: number;
    public timePause: number;

    @Input() title: string;
    @Input() message: string;
    @Input() id: number;
    @Input() config: ConfigToast;
    @Input() type: TypesToast;
    @Input() index: number;
    @Input() toastItem: Toast;
    @Input() addTransitionExit: boolean;

    @ViewChild('progressBar', { static: false }) progressBar: ElementRef<HTMLDivElement>;
    @ViewChild('toast', { static: false }) toast: ElementRef<HTMLDivElement>;
    @ViewChild('content', { static: false }) content: ElementRef<HTMLDivElement>;

    constructor(private toastService: ArtToastService) { }

    ngOnInit() {
        setTimeout(() => {
            this.start();
        }, 0);
    }

    start() {
        this.getCustomTheme();
        this.toastService.setSize(this.id, this.toast.nativeElement.offsetHeight);
        this.content.nativeElement.style.height = `${this.toast.nativeElement.offsetHeight}px`;
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
        if (!this.config.timer || this.addTransitionExit || !this.config.stopTimerOnHover) {
            return;
        }
        clearTimeout(this.timeout);
        this.timePause = new Date().getTime();
        this.progressBar.nativeElement.style.width = `${this.progressBar.nativeElement.offsetWidth}px`;
    }

    mouseLeave(event: MouseEvent) {
        if (!this.config.timer || this.addTransitionExit || !this.config.stopTimerOnHover) {
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

    getCustomTheme() {
        if (!this.toastService.customTheme) {
            return null;
        }
        this.toast.nativeElement.style.backgroundColor = this.toastService.customTheme[this.type].backgroundColor;
        this.toast.nativeElement.style.color = this.toastService.customTheme[this.type].color;
    }
}
