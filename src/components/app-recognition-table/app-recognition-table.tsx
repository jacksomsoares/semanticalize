import { Component, h, Host, Prop, State } from '@stencil/core';

import { Grammar } from '../../classes/Grammar';
import { RecognitionTable } from '../../classes/RecognitionTable';
import { First } from '../../classes/First';
import { Follow } from '../../classes/Follow';
import { PreditiveTable } from '../../classes/PreditiveTable';

@Component({
  tag: 'app-recognition-table',
  // styleUrl: 'analise-preditiva.css',
  shadow: false,
})
export class AppRecognitionTable {
  @Prop() grammar: string;
  
  @State() inputRecog = "i+i*i";
  @State() tableRow: Array<Array<string>>;
  private preditiveTable = new PreditiveTable();

  constructor() {
      this.tableRow = [[]]
  }

  reconize() {
    let grammar = new Grammar(this.grammar);
    this.preditiveTable = new PreditiveTable();
    const first = new First(grammar);
    const follow = new Follow(grammar);
    //this.preditiveTable.mockData();
    this.preditiveTable.generate(grammar, first, follow);
    let rcTable = new RecognitionTable();
    rcTable.reconize(this.inputRecog, this.preditiveTable, grammar);
    this.tableRow = rcTable.tableRows;
  }

  render() {
    return (
        <Host>
            <h3>Tabela de Reconhecimento</h3>

            <div class="form-inline mb-2">
                <div class="form-group">
                    <label htmlFor="inputRecognition">Entrada:</label>
                </div>
                <div class="form-group mx-2">
                    <input id="inputRecognition" class="form-control" type="text" onInput={(ev) => this.inputRecog = (ev.target as HTMLInputElement).value  } value={this.inputRecog} />
                </div>
                <button class="btn btn-light" onClick={() => this.reconize()}>Reconhecer</button>
            </div>

            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Pilha</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Saida</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.tableRow.map((row) => {
                            return (
                                <tr>
                                    {
                                        row.map((item) => {
                                            return (
                                                <td>{item}</td>
                                            );
                                        })
                                    }
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
