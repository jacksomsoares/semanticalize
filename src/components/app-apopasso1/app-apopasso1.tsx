import { Component, h, Prop, State, Host } from '@stencil/core';

import { GrammarV2 } from '../../classes/GrammarV2';
import { OperatorPrecedenceParser } from '../../classes/operator-precedence-parser';

@Component({
  tag: 'app-apopasso1',
  shadow: false,
})
export class ApoPasso1 {
    @Prop() grammar: string;
    @State() tableRow = Array<{NT: string, first: string, last: string}>();
  
    doStepOne() {
      let grammar = new GrammarV2(this.grammar);
      let stepOne = new OperatorPrecedenceParser();
      stepOne.grammar = grammar;
  
      stepOne.FirstStep(grammar);

      let tempTableRow = []
      
      for(let nt of grammar.naoTerminais) {
        let obj = {NT: "", first: "", last: ""};
        obj.NT = nt;
        obj.first = stepOne.leading.get(nt).toString();
        obj.last = stepOne.trailing.get(nt).toString();
        tempTableRow.push(obj);
      }

      this.tableRow = tempTableRow;
      
      // stepOne.RecognitionTable();
    }

  render() {
    return (
        <Host>
            <button class="btn btn-outline-dark" onClick={() => this.doStepOne()}>Passo 1</button>
            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Primeiros</th>
                        <th>Ultimos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.tableRow.map((row) => {
                            return (
                                <tr>
                                    <td>{row.NT}</td>
                                    <td>{row.first}</td>
                                    <td>{row.last}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </Host>
    );
  }
}
