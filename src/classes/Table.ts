import { MenorPrecedencia } from './menor-precedencia';
import { MaiorPrecedencia } from './maior-precedencia';
import { GrammarV2 } from './GrammarV2';

export class Table {

    constructor() {

    }

    public getHeaderTable(grammar) {
        const tableHead = new Array<string>();
        for (let x = 0; x < grammar.terminais.length; x++) {
            const element = grammar.terminais[x];
            tableHead.push(element);
        }
        tableHead.push('$');
        return tableHead;
    }

    public getArray(menorprecedencia: any, maiorprecedencia: any, tableRowMenorMarcador: any, tableRowMaiorMarcador: any) {
        const aux = [];
        // menor precedencia
        menorprecedencia.forEach((value) => {
            for (let x = 0; x < value.length; x++) {
                aux.push(value[x]);
            }
        });
        // maior precedencia
        maiorprecedencia.forEach((value) => {
            for (let x = 0; x < value.length; x++) {
                aux.push(value[x]);
            }
        });
        // marcador menor
        for (let x = 0; x < tableRowMenorMarcador.length; x++) {
            const element = tableRowMenorMarcador[x];
            aux.push(element.toString());
        }
        // marcador maior
        for (let y = 0; y < tableRowMaiorMarcador.length; y++) {
            const element = tableRowMaiorMarcador[y];
            aux.push(element.toString());
        }
        return aux;
    }

    public getMapTable(gramm) {
        const grammar = new GrammarV2(gramm);
        const stepTwo = new MenorPrecedencia();
        const stepTree = new MaiorPrecedencia();
        const menorprecedencia = stepTwo.getMenorPrecedencia(gramm);
        const maiorprecedencia = stepTree.getMaiorPrecedencia(gramm);
        const tableRowMenorMarcador = stepTwo.getTableRowMenorMarcador(gramm);
        const tableRowMaiorMarcador = stepTree.getTableRowMaiorMarcador(gramm);
        const array_aux = this.getArray(menorprecedencia, maiorprecedencia, tableRowMenorMarcador, tableRowMaiorMarcador);
        const tableHead = this.getHeaderTable(grammar);
        const tableMap = new Map<string, Map<string, string>>();
        const q = new Map<string, string>();

        for (let i = 0; i < tableHead.length; i++) {
            const i_item = tableHead[i];
            for (let j = 0; j < tableHead.length; j++) {
                const j_item = tableHead[j];
                // let achou = false;
                for (let index = 0; index < array_aux.length; index++) {
                    const aux_element = array_aux[index];
                    const aux1 = i_item + ' < ' + j_item;
                    const aux2 = i_item + ' > ' + j_item;
                    if (aux_element === aux1) {
                        //  tableLine.push('<');
                        q.set(j_item, '<');
                        array_aux.splice(index, 1);
                        index = array_aux.length - 1;
                    } else if (aux_element === aux2) {
                        //  tableLine.push('>');
                        q.set(j_item, '>');
                        array_aux.splice(index, 1);
                        index = array_aux.length - 1;
                        // achou = true;
                    }
                }
                tableMap.set(i_item, q);
            }
        }

        return tableMap;
    }

    public getRowTable(gramm) {
        const grammar = new GrammarV2(gramm);
        const stepTwo = new MenorPrecedencia();
        const stepTree = new MaiorPrecedencia();
        const menorprecedencia = stepTwo.getMenorPrecedencia(gramm);
        const maiorprecedencia = stepTree.getMaiorPrecedencia(gramm);
        const tableRowMenorMarcador = stepTwo.getTableRowMenorMarcador(gramm);
        const tableRowMaiorMarcador = stepTree.getTableRowMaiorMarcador(gramm);
        const array_aux = this.getArray(menorprecedencia, maiorprecedencia, tableRowMenorMarcador, tableRowMaiorMarcador);
        const tableHead = this.getHeaderTable(grammar);
        const tableRow = new Array<Array<string>>();

        for (let i = 0; i < tableHead.length; i++) {
            const tableLine = [];
            const i_item = tableHead[i];
            tableLine.push(i_item);
            for (let j = 0; j < tableHead.length; j++) {
                const j_item = tableHead[j];
                let achou = false;
                for (let index = 0; index < array_aux.length; index++) {
                    const aux_element = array_aux[index];
                    const aux1 = i_item + ' < ' + j_item;
                    const aux2 = i_item + ' > ' + j_item;
                    if (aux_element === aux1) {
                        tableLine.push('<');
                        array_aux.splice(index, 1);
                        index = array_aux.length - 1;
                        achou = true;
                    } else if (aux_element === aux2) {
                        tableLine.push('>');
                        array_aux.splice(index, 1);
                        index = array_aux.length - 1;
                        achou = true;
                    }
                }
                if (!achou) {
                    tableLine.push('');
                }
            }
            tableRow.push(tableLine);
        }
        return tableRow;
    }
}