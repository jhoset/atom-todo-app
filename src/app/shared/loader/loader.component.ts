import {Component, input} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressBar
  ],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  loading = input<boolean>();
}
