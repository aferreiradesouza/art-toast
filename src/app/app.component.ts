import { Component } from '@angular/core';
import { ToastService } from './toast/service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toast-module';
  public showToast: boolean;
  constructor(private toastService: ToastService) {
    this.toastService.changes.subscribe(e => {
      this.showToast = e.length > 0;
    });
  }

  click() {
    this.toastService.success('teste', 'teste');
  }
}
