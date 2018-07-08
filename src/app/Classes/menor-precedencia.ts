import {GrammarV2} from './GrammarV2';

export class MenorPrecedencia {

    public listaTNT: string[];

    public findTNT(grammar: GrammarV2){
        this.listaTNT = [];

        let keys: any;
        keys = grammar.producao.keys();

        for(let x = 0; x < grammar.producao.size; x++){ //percore todas as sentenças da gramatica
            
            let key = keys.next().value;
            let letras: string[];
            let firsts: string = "";
            let producoes: string[];
            let isT: boolean = false;
        
        producoes = grammar.producao.get(key).toString().split("\|");

        for(let y = 0; y < producoes.length; y++){ //percorre as produções da gramatica
            
            letras = producoes.toString().split(",");
            for(let t = 0; t < letras.length; t++){
                if(grammar.isT(letras[t])){
                    isT = true;
                    t++;
                }

                if(grammar.isNT(letras[t]) && isT){
                    this.listaTNT.push(letras[t-1]+letras[t]);
                    isT = false;
                }


            }

        }
            

        }

        console.log(this.listaTNT);

    }

}
