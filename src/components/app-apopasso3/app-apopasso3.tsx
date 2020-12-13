import { Component, h, Prop, State, Host } from '@stencil/core';

import { GrammarV2 } from '../../classes/GrammarV2';
import { OperatorPrecedenceParser } from '../../classes/operator-precedence-parser';

@Component({
    tag: 'app-apopasso3',
    shadow: false,
})
export class ApoPasso3 {
    @Prop() grammar: string;
    @State() inputRecog = "id&id/id";
    public tableRow = Array<{ stack: string, relation: string, input: string, handle: string, action: string }>();

    recognize() {
        let grammar = new GrammarV2(this.grammar);
        let stepOne = new OperatorPrecedenceParser();
        stepOne.grammar = grammar;

        let tableData = stepOne.RecognitionTable();
        for (let row of tableData.log) {
            let obj = { stack: "", relation: "", input: "", handle: "", action: "" };
            obj.stack = row[0];
            obj.relation = row[1];
            obj.input = row[2];
            obj.handle = row[3];
            obj.action = row[4];
            this.tableRow.push(obj);
        }
    }

    render() {
        return (
            <Host>
                <div class="form-inline">
                    <div class="form-group mb-2">  
                        <label htmlFor="inputRecognition">Entrada: </label>
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input id="inputRecognition" class="form-control" type="text" value={this.inputRecog} onInput={(e) => this.inputRecog = (e.target as HTMLInputElement).value } />
                    </div>
                    <button class="btn btn-light mb-2" onClick={() => this.recognize()} disabled>Reconhecer (Não está pronto ainda)</button>
                </div>
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center" scope="col">Passo</th>
                            <th class="text-center" scope="col">Pilha</th>
                            <th class="text-center" scope="col">Relação</th>
                            <th class="text-center" scope="col">Entrada</th>
                            <th class="text-center" scope="col">Handle</th>
                            <th class="text-center" scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableRow.map((row, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{row.stack}</td>
                                        <td class="text-center">{row.relation}</td>
                                        <td class="text-right">{row.input}</td>
                                        <td class="text-center">{row.handle}</td>
                                        <td>{row.action}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Host>
        );
    }
}
