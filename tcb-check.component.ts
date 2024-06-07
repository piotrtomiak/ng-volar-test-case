import { Component } from '@angular/core';

@Component({
  selector: 'app-tcb-check',
  standalone: true,
  imports: [],
  templateUrl: "./tcb-check.component.html",
  styles: ""
})
export class TcbCheckComponent {
  title = 'My Awesome Signal Store';
  ddsdfeh: string;
  ddsdfffeh: string;

  checkType(arg: number): string {
    return arg.toString()
  }
}
