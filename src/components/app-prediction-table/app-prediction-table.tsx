import { Component, h, Host, Prop, State } from '@stencil/core';

import { Grammar } from '../../classes/Grammar';
import { PreditiveTable } from '../../classes/PreditiveTable';
import { First } from '../../classes/First';
import { Follow } from '../../classes/Follow';

@Component({
  tag: 'app-prediction-table',
  // styleUrl: 'analise-preditiva.css',
  shadow: false,
})
export class AppPredictionTable {
  @Prop() grammarInput: string;
  public grammar: Grammar;
  public preditiveTable: PreditiveTable;
  @State() tableHead: Array<string>;
  @State() tableRow: Array<Array<string>>;

  constructor() {
    this.tableHead = [];
    this.tableRow = [];
  }

  buildTable(){
    this.tableHead = [];
    this.grammar = new Grammar(this.grammarInput);
    this.preditiveTable = new PreditiveTable();
    const first = new First(this.grammar);
    const follow = new Follow(this.grammar);
    
    //this.preditiveTable.mockData();
    this.preditiveTable.generate(this.grammar, first, follow);

    this.grammar.terminais.forEach(element => {
      this.tableHead.push(element);
    });
    this.tableHead.push("$");
    this.tableRow = [];

    this.preditiveTable.table.forEach( (value, key) => {
      let tableLine = [];
      tableLine.push(key); //add NT para exibir na linha da tabela
      for (let col=0; col<this.tableHead.length; col++){
        if ( typeof value.get(this.tableHead[col]) !== undefined ) {
          tableLine.push(value.get(this.tableHead[col]));
        }
        else {
          tableLine.push("");
        }
      }
      this.tableRow.push(tableLine);
    })
  }

  render() {
    return (
        <Host>
            <h3>Tabela de Predição</h3>
            <button class="btn btn-light mb-1 float-right" onClick={() => this.buildTable()}>Construir tabela</button>

            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"></th>
                        {this.tableHead.map((nt) => {
                            return (
                                <th scope="col">
                                    {nt}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.tableRow.map((row, index) => {
                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                {row.map((item) => {
                                    return (
                                      <td>{item}</td>
                                    );
                                })}
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
