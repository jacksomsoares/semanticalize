import { Component, h, Host, Prop } from '@stencil/core';
import { Grammar } from '../../classes/Grammar';
import { First } from '../../classes/First';

@Component({
  tag: 'app-first',
  // styleUrl: 'analise-preditiva.css',
  shadow: false,
})
export class AppFirst {
  @Prop() grammar: string;

  firstText!: HTMLTextAreaElement;
  grammarGerada: Grammar;
  first: First;

  doFirst() {
    this.grammarGerada = new Grammar(this.grammar);
    this.first = new First(this.grammarGerada);

    this.firstText.value = this.first.exibirFirsts();
  }

  render() {
    return (
        <Host>
            <button class="btn btn-outline-dark" onClick={() => this.doFirst()}>First</button>
            <div class="form-group">
                <label htmlFor="input-first">FIRST:</label>
                <textarea class="form-control" ref={(el) => this.firstText = el} rows={5} id="input-first"></textarea>
            </div>
        </Host>
    );
  }
}
