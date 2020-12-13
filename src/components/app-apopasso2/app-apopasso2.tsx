import { Component, h, Prop, State, Host } from '@stencil/core';

import { GrammarV2 } from '../../classes/GrammarV2';
import { Table } from '../../classes/Table';
import { MaiorPrecedencia } from '../../classes/maior-precedencia';
import { MenorPrecedencia } from '../../classes/menor-precedencia';

@Component({
    tag: 'app-apopasso2',
    shadow: false,
})
export class ApoPasso2 {
    @Prop() grammar: string;
    @State() tableHeaderP2: string[];
    @State() tableHeaderP3: string[];
    @State() tableHead: Array<string>;
    @State() tableRowP2: Array<Array<string>>;
    @State() tableRowP3: Array<Array<string>>;
    @State() tableRowMaiorMarcador: Array<Array<string>>;
    @State() tableRowMenorMarcador: Array<Array<string>>;
    @State() tableRow: Array<Array<string>>;
    menorprecedencia: Map<String, Array<string>>;
    maiorprecedencia: Map<String, Array<string>>;

    constructor() {
        this.tableRowMaiorMarcador = [];
        this.tableRowMenorMarcador = [];
        this.tableHead = [];
        this.tableRow = [];
    }

    doLoad() {
        this.doStepTwo();
        this.doStepTree();
        this.doCreateTable();
    }

    doCreateTable() {
        const tb = new Table();
        const grammar = new GrammarV2(this.grammar);
        // let stepTwo = new MenorPrecedencia();
        // let stepOne = new OperatorPrecedenceParser();
        // let stepTree = new MaiorPrecedencia();
        // stepOne.FirstStep(grammar);

        this.tableHead = tb.getHeaderTable(grammar);
        // let table = new Map<string, Map<string, string>>();
        //table = tb.getMapTable(this.grammar);
        this.tableRow = tb.getRowTable(this.grammar);
        // table = tb.getMapTable(this.grammar);
    }

    doStepTwo() {

        let grammar = new GrammarV2(this.grammar);
        let stepTwo = new MenorPrecedencia();
        stepTwo.findTNT(grammar);

        this.tableHeaderP2 = stepTwo.listaTNT;
        let TempTableRowP2 = [];
        this.tableRowMenorMarcador = [];

        this.menorprecedencia = stepTwo.getMenorPrecedencia(this.grammar);
        this.tableRowMenorMarcador = stepTwo.getTableRowMenorMarcador(this.grammar);

        for (let x = 0; x < this.tableHeaderP2.length; x++) {
            let precedencia = this.tableHeaderP2[x];
            let tablerow = [];
            this.menorprecedencia.forEach((value, key) => {
                if (precedencia === key) {
                    for (let x = 0; x < value.length; x++) {
                        tablerow.push(value[x]);
                    }
                }
            });
            TempTableRowP2.push(tablerow);
        }

        this.tableRowP2 = TempTableRowP2;

    }

    doStepTree() {

        let grammar = new GrammarV2(this.grammar);
        let stepTree = new MaiorPrecedencia();
        stepTree.findNTT(grammar);
        this.tableHeaderP3 = stepTree.listaNTT;
        let TempTableRowP3 = [];
        this.tableRowMaiorMarcador = [];

        this.maiorprecedencia = stepTree.getMaiorPrecedencia(this.grammar);
        this.tableRowMaiorMarcador = stepTree.getTableRowMaiorMarcador(this.grammar);

        for (let x = 0; x < this.tableHeaderP3.length; x++) {
            let precedencia = this.tableHeaderP3[x];
            let tablerow = [];
            this.maiorprecedencia.forEach((value, key) => {
                if (precedencia === key) {
                    for (let x = 0; x < value.length; x++) {
                        tablerow.push(value[x]);
                    }
                }
            });
            TempTableRowP3.push(tablerow);
        }

        this.tableRowP3 = TempTableRowP3;
    }

    render() {
        return (
            <Host>
                <button class="btn btn-outline-dark" onClick={() => this.doLoad()}>Passo 2</button>
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            {
                                this.tableHeaderP2?.map((header) => {
                                    return <th scope="col">{header}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.tableRowP2?.map((row) => {
                                return (
                                    <td>
                                        {
                                            row.map((item) => {
                                                return (
                                                    <tr>{item}</tr>
                                                )
                                            })
                                        }
                                    </td>
                                )
                            })
                        }
                    </tbody>
                </table>

                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            {
                                this.tableHeaderP3?.map((header) => {
                                    return <th scope="col">{header}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableRowP3?.map((row) => {
                            return (
                                <td>
                                    {row.map((item) => {
                                        return <tr>{item}</tr>
                                    })}
                                </td>
                            )
                        })}
                    </tbody>
                </table>

                {
                    this.tableRowMaiorMarcador.length > 0 ? <h4>Precedência do marcador</h4> : null
                }

                <div class="row">
                    <div class="col-6">
                        <table class="table table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    {
                                        this.tableRowMaiorMarcador.length > 0 ? <th scope="col">Maior Marcador</th> : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.tableRowMaiorMarcador?.map((row) => {
                                        return (
                                            <tr>
                                                {
                                                    row.map(item => {
                                                        return (
                                                            <td>{item}</td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div class="col-6">
                        <table class="table table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    {
                                        this.tableRowMenorMarcador.length > 0 ? <th scope="col">Menor Marcador</th> : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.tableRowMenorMarcador?.map(row => {
                                        return (
                                            <tr>
                                                {
                                                    row.map(item => {
                                                        return <td>{item}</td>
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    this.tableHead.length > 0 ? <h4>Tabela</h4> : null
                }

                {
                    this.tableHead.length > 0 ?
                        <table class="table table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th></th>
                                    {
                                        this.tableHead?.map(nt => {
                                            return <th scope="col">{nt}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.tableRow?.map((row, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                {
                                                    row.map(item => {
                                                        return <td>{item}</td>
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        null
                }
            </Host>
        );
    }
}
