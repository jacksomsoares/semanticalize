import { Component, h, State, Host } from '@stencil/core';

@Component({
    tag: 'analise-precedencia-operadores',
    shadow: false,
})
export class AnalisePrecedenciaOperadores {
    @State() textArea = 
        "G = ({ E, T, F}, { /, id, (, ) }, P, E )\n" +
        "p=\n" +
        "E -> E / T | T\n" +
        "T -> T & F | F\n" +
        "F -> (E) | id";

    render() {
        return (
            <Host>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <h3>Manipulador de Gramatica</h3>
                            <label>Insira a Gramatica:</label>
                            <textarea rows={7} class="form-control txt-grammar" value={this.textArea} onInput={(e) => this.textArea = (e.target as HTMLTextAreaElement).value}></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h3>Manual</h3>
                        <p>
                            O manual pode ser acessado neste <a href="https://docs.google.com/document/d/1M_eK21grBoxN4A99VNgBBrAJE_eE1RU1nw9V67GBqQc/edit?usp=sharing">link</a>.
                    </p>
                    </div>
                </div>
                <hr />

                <h4>Geração dos primeiros e últimos relacionados aos não terminais</h4>
                <app-apopasso1 grammar={this.textArea}></app-apopasso1>
                <hr />

                <h4>Menor e Maior precedência</h4>
                <app-apopasso2 grammar={this.textArea}></app-apopasso2>
                <hr />

                <h4>Reconhecimento de entrada</h4>
                <app-apopasso3 grammar={this.textArea}></app-apopasso3>
            </Host>
        );
    }
}
