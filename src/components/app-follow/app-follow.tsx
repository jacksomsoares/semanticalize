import { Component, h, Host, Prop } from '@stencil/core';
import { Grammar } from '../../classes/Grammar';
import { Follow } from '../../classes/Follow';

@Component({
  tag: 'app-follow',
  // styleUrl: 'analise-preditiva.css',
  shadow: false,
})
export class AppFollow {
  @Prop() grammar: string;

  grammarGerada: Grammar;
  followText!: HTMLTextAreaElement;
  follow: Follow;

  doFollow(){
    this.grammarGerada = new Grammar(this.grammar);
    this.follow = new Follow(this.grammarGerada);

    this.followText.value = this.follow.exibirFollows();
  }

  render() {
    return (
        <Host>
            <button class="btn btn-outline-dark" onClick={() => this.doFollow()}>Do Follow!</button>
            <div class="form-group">
                <label htmlFor="input-follow">FOLLOW:</label>
                <textarea class="form-control" ref={(el) => this.followText = el} rows={5} id="input-follow"></textarea>
            </div>
        </Host>
    );
  }
}
