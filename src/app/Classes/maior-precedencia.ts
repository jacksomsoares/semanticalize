import { GrammarV2 } from './GrammarV2';
import { OperatorPrecedenceParser } from './operator-precedence-parser';

export class MaiorPrecedencia {

    public listaNTT: string[];

    public findNTT(grammar: GrammarV2) {
        this.listaNTT = [];

        let keys: any;
        keys = grammar.producao.keys();

        for (let x = 0; x < grammar.producao.size; x++) { //percore todas as sentenças da gramatica

            let key = keys.next().value;
            let letras: string[];
            let producoes: string[];
            let isNT: boolean = false;

            producoes = grammar.producao.get(key).toString().split("\|");

            for (let y = 0; y < producoes.length; y++) { //percorre as produções da gramatica

                letras = producoes.toString().split(",");
                for (let t = 0; t < letras.length; t++) {
                    if (grammar.isNT(letras[t])) {
                        isNT = true;
                        t++;
                    }

                    if (grammar.isT(letras[t]) && isNT) {
                        this.listaNTT.push(letras[t - 1] + letras[t]);
                        isNT = false;
                    }


                }

            }


        }

        console.log(this.listaNTT);
        return this.listaNTT;

    }

    public getMaiorPrecedencia(gramm) {
        let listaNTT = [];
        let grammar = new GrammarV2(gramm);
        let stepOne = new OperatorPrecedenceParser();
        const maiorprecedencia = new Map<String, Array<string>>();
        listaNTT = this.findNTT(grammar);
        stepOne.FirstStep(grammar);
        for (let x = 0; x < listaNTT.length; x++) {
            let precedencia = listaNTT[x].toString().split("");
            let precedence_aux = listaNTT[x];

            let temp3 = new Array<string>();
            let letra = stepOne.trailing.get(precedencia[0]).toString();

            const array = letra.split(',');
            for (let y = 0; y < array.length; y++) {
                const string_aux = array[y] + ' > ' + precedencia[1];
                temp3.push(string_aux);
            }
            maiorprecedencia.set(precedence_aux, temp3);

        }
        return maiorprecedencia;
    }

    public getTableRowMaiorMarcador(gramm) {
        let listaNTT = [];
        let grammar = new GrammarV2(gramm);
        let stepOne = new OperatorPrecedenceParser();
        const tableRowMaiorMarcador = new Array<Array<string>>();
        listaNTT = this.findNTT(grammar);
        stepOne.FirstStep(grammar);
        for (let x = 0; x < listaNTT.length; x++) {
            let precedencia = listaNTT[x].toString().split("");
            let letra = stepOne.trailing.get(precedencia[0]).toString();
            const array = letra.split(',');
            for (let y = 0; y < array.length; y++) {
                if (x === 0) { // save precedencia marcador maior
                    const str = new Array<string>();
                    str.push(array[y] + ' > ' + '$');
                    tableRowMaiorMarcador.push(str);
                }
            }
        }
        return tableRowMaiorMarcador;
    }

}
