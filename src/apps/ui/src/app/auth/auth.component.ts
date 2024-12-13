import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: ``,
  styles: ``,
})
export class AuthComponent implements OnInit {
  ngOnInit(): void {
    if (window.close) window.close();
  }
}
