import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export type TypesToast = 'success' | 'danger' | 'info' | 'warning';

export interface Toast {
    title: string;
    message: string;
    type: TypesToast;
    id: number;
    addTransitionExit: boolean;
    height: number;
    config: ConfigToast;
}

export interface ConfigToast {
    timer?: number;
    showButtonClose?: boolean;
    customIcon?: string;
    showIcon?: boolean;
    preventDuplicate?: boolean;
    stopTimerOnHover?: boolean;
    limit?: number;
    button?: {
        label: string;
        theme: 'primary' | 'light-primary' | 'secondary' | 'basic' | 'light-secondary' | 'success' | 'danger' | 'warning' | 'info';
        size: 'tiny' | 'small' | 'medium' | 'large';
        fn: () => void;
    };
}

interface CustomTheme {
    danger: {
        backgroundColor: string;
        color: string;
    };
    info: {
        backgroundColor: string;
        color: string;
    };
    success: {
        backgroundColor: string;
        color: string;
    };
    warning: {
        backgroundColor: string;
        color: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ArtToastService {
    private onSubject = new Subject<Toast[]>();
    public changes = this.onSubject.asObservable().pipe(share());

    // tslint:disable-next-line: variable-name
    private _toasts: Toast[] = null;
    private id = 0;
    public customTheme: CustomTheme = null;

    constructor(@Inject('config') private config: CustomTheme) {
        this.customTheme = this.config;
        this._toasts = [];
    }
    private addToast(item: Toast) {

        const prevenDuplicate = this.toasts.filter(e => e.config.preventDuplicate);
        const limit = this.toasts.filter(e => e.config.limit);

        if (prevenDuplicate.length > 0) {
            return;
        }
        this._toasts.unshift(item);
        this.onSubject.next(this.toasts);

        if (limit.length > 0) {
            this.fixLimit(limit[0].config.limit);
        }
    }

    get toasts(): Toast[] {
        return this._toasts;
    }

    public removeToast(id: number): void {
        this.addTransitionExit(id);
        setTimeout(() => {
            this._toasts = this._toasts.filter(e => e.id !== id);
            this.onSubject.next(this.toasts);
        }, 400);
    }

    public setSize(id: number, size: number): void {
        const index = this.toasts.map(e => e.id).indexOf(id);
        this.toasts[index].height = size;
    }

    public addTransitionExit(id: number): void {
        try {
            const index = this.toasts.map(e => e.id).indexOf(id);
            this.toasts[index].addTransitionExit = true;
        } catch (err) { }
    }

    public success(title: string, message: string, config?: ConfigToast): void {
        const newToast: Toast = this.createNewObjectToast(title, message, 'success', config);
        this.addToast(newToast);
    }

    public danger(title: string, message: string, config?: ConfigToast): void {
        const newToast: Toast = this.createNewObjectToast(title, message, 'danger', config);
        this.addToast(newToast);
    }

    public info(title: string, message: string, config?: ConfigToast): void {
        const newToast: Toast = this.createNewObjectToast(title, message, 'info', config);
        this.addToast(newToast);
    }

    public warning(title: string, message: string, config?: ConfigToast): void {
        const newToast: Toast = this.createNewObjectToast(title, message, 'warning', config);
        this.addToast(newToast);
    }

    private fixLimit(limit: number): void {
        if (this.toasts.length > limit) {
            this.removeToast(this.toasts[this.toasts.length - 1].id);
            setTimeout(() => {
                if (this.toasts.length > limit) {
                    this.fixLimit(limit);
                }
            }, 401);
        }
    }

    private createNewObjectToast(title: string, message: string, type: TypesToast, config: ConfigToast): Toast {
        return {
            title,
            message,
            type,
            id: this.id++,
            addTransitionExit: false,
            height: null,
            config: {
                timer: config ? config.timer : 0,
                showButtonClose: config ? !!config.showButtonClose : null,
                customIcon: config ? config.customIcon : null,
                showIcon: config ? config.showIcon === undefined || config.showIcon : true,
                preventDuplicate: config ? !!config.preventDuplicate : false,
                stopTimerOnHover: config && config.stopTimerOnHover !== undefined ? config.stopTimerOnHover : true,
                limit: config ? config.limit : null,
                button: config && config.button ? {
                    label: config.button.label,
                    theme: config.button.theme,
                    size: config.button.size,
                    fn: config.button.fn,
                } : null
            }
        };
    }

    public getIcon(type: TypesToast): string {
        switch (type) {
            case 'danger':
                return 'times-circle';
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check';
            case 'warning':
                return 'exclamation-triangle';
        }
    }
}
