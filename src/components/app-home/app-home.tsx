import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  render() {
    return (
      <Host>
        <h3>Manual</h3>
        <p>
          O manual pode ser acessado neste <a href="https://docs.google.com/document/d/1M_eK21grBoxN4A99VNgBBrAJE_eE1RU1nw9V67GBqQc/edit?usp=sharing" target="_blank">link</a>.
        </p>
      </Host>
    );
  }
}
