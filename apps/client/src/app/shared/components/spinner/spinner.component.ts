import { Component, Input } from '@angular/core';

@Component({
  selector: 'qa-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() public active: boolean;
}
