import {GrammarV2} from './GrammarV2';

export class MaiorPrecedencia {

    public listaNTT: string[];

    public findNTT(grammar: GrammarV2){
        this.listaNTT = [];

        let keys: any;
        keys = grammar.producao.keys();

        for(let x = 0; x < grammar.producao.size; x++){ //percore todas as sentenças da gramatica
            
            let key = keys.next().value;
            let letras: string[];
            let producoes: string[];
            let isNT: boolean = false;
        
        producoes = grammar.producao.get(key).toString().split("\|");

        for(let y = 0; y < producoes.length; y++){ //percorre as produções da gramatica
            
            letras = producoes.toString().split(",");
            for(let t = 0; t < letras.length; t++){
                if(grammar.isNT(letras[t])){
                    isNT = true;
                    t++;
                }

                if(grammar.isT(letras[t]) && isNT){
                    this.listaNTT.push(letras[t-1]+letras[t]);
                    isNT = false;
                }


            }

        }
            

        }

        console.log(this.listaNTT);

    }

}
