import { GrammarV2 } from './GrammarV2';
import { OperatorPrecedenceParser } from './operator-precedence-parser';

export class MenorPrecedencia {

    public listaTNT: string[];

    public findTNT(grammar: GrammarV2) {
         this.listaTNT = [];

        let keys: any;
        keys = grammar.producao.keys();

        for (let x = 0; x < grammar.producao.size; x++) { //percore todas as sentenças da gramatica

            let key = keys.next().value;
            let letras: string[];
            let firsts: string = "";
            let producoes: string[];
            let isT: boolean = false;

            producoes = grammar.producao.get(key).toString().split("\|");

            for (let y = 0; y < producoes.length; y++) { //percorre as produções da gramatica

                letras = producoes.toString().split(",");
                for (let t = 0; t < letras.length; t++) {
                    if (grammar.isT(letras[t])) {
                        isT = true;
                        t++;
                    }

                    if (grammar.isNT(letras[t]) && isT) {
                        this.listaTNT.push(letras[t - 1] + letras[t]);
                        isT = false;
                    }


                }

            }


        }
        console.log(this.listaTNT);
        return this.listaTNT;

    }

    public getMenorPrecedencia(gramm) {
        let listaTNT = [];
        let grammar = new GrammarV2(gramm);
        let stepOne = new OperatorPrecedenceParser();
        const menorprecedencia = new Map<String, Array<string>>();
        listaTNT = this.findTNT(grammar);
        stepOne.FirstStep(grammar);
        for (let x = 0; x < listaTNT.length; x++) {
            let precedencia = listaTNT[x].toString().split("");
            let precedence_aux = listaTNT[x];
            let temp3 = new Array<string>();
            let letra = stepOne.leading.get(precedencia[1]).toString();

            const array = letra.split(',');
            for (let y = 0; y < array.length; y++) {
                const string_aux = precedencia[0].toString() + ' < ' + array[y];
                temp3.push(string_aux);
            }
            menorprecedencia.set(precedence_aux, temp3);

        }
        return menorprecedencia;
    }

    public getTableRowMenorMarcador(gramm) {
        let listaTNT = [];
        let grammar = new GrammarV2(gramm);
        let stepOne = new OperatorPrecedenceParser();
        const tableRowMenorMarcador = new Array<Array<string>>();
        listaTNT = this.findTNT(grammar);
        stepOne.FirstStep(grammar);
        for (let x = 0; x < listaTNT.length; x++) {
            let precedencia = listaTNT[x].toString().split("");
            let letra = stepOne.leading.get(precedencia[1]).toString();
            const array = letra.split(',');
            for (let y = 0; y < array.length; y++) {
                if (x === listaTNT.length - 1) { //save precedencia marcador menor
                    const str = new Array<string>();
                    str.push('$' + ' < ' + array[y]);
                    tableRowMenorMarcador.push(str);
                }
            }

        }
        return tableRowMenorMarcador;
    }

}
