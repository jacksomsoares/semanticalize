import { Component, h, State, Host } from '@stencil/core';

@Component({
  tag: 'analise-preditiva',
  styleUrl: 'analise-preditiva.css',
  shadow: false,
})
export class AnalisePreditiva {
  @State() textArea = "G = ({ E, D, T, G, F}, { i, +, *, (, ) }, P, E )\n" +
                      "P=\n" +
                      "E -> TD\n" +
                      "D -> +TD|&\n" +
                      "T -> FG\n" +
                      "G -> *FG|&\n" +
                      "F -> (E)|i";

  render() {
    return (
      <Host>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
                <h3>Manipulador de Gramatica</h3>
                <label>Insira a Gramatica:</label>
                <textarea rows={7} onInput={ (e) => this.textArea = (e.target as HTMLTextAreaElement).value } value={this.textArea} class="form-control" placeholder="Digite a gramatia aqui."></textarea>
            </div>
          </div>
          <div class="col-md-6">
              <h3>Manual</h3>
              <p>
                  O manual pode ser acessado neste <a target="_blank" href="https://docs.google.com/document/d/1M_eK21grBoxN4A99VNgBBrAJE_eE1RU1nw9V67GBqQc/edit?usp=sharing">link</a>.
              </p>
          </div>
        </div>
        <hr />
        <h3>First e Follow</h3>
        <div class="row">
          <div class="col-md-6">
            <app-first grammar={this.textArea}></app-first>
          </div>
          <div class="col-md-6">
            <app-follow grammar={this.textArea}></app-follow>
          </div>
        </div>
        <app-prediction-table grammarInput={this.textArea}></app-prediction-table>
        <app-recognition-table grammar={this.textArea}></app-recognition-table>
      </Host>
    );
  }
}
