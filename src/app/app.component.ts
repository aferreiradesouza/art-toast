import { Component } from '@angular/core';
import { ArtToastService } from 'projects/art-toast/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toast-module';
  public showToast: boolean;
  constructor(private artToastService: ArtToastService) { }

  click() {
    this.artToastService.success('😃 BOOOA!', 'Deu tudo certo!', {
      showButtonClose: true,
      timer: 5000
    });
  }
}
