import {GrammarV2} from './GrammarV2';

export class OperatorPrecedenceParser {
    public leading: Map<string, Array<string>>;
    public trailing: Map<string, Array<string>>;

    public firstSet: string;

    public FirstStep (grammar: GrammarV2){
        this.leading = new Map<string, Array<string>>();
        this.trailing = new Map<string, Array<string>>();

        for (let key of grammar.naoTerminais) {
            let leadings = [];
            let trailings = [];
            this.firstStepRecursionLeading(key, grammar, leadings); //Populate leading array;
            this.firstStepRecursionLeadingReverse(key, grammar, trailings); //Populate trailing array;
            this.leading.set(key, leadings);
            this.trailing.set(key, trailings);
        }
    }

    private firstStepRecursionLeading(key: string, grammar: GrammarV2, arrayLeading: Array<string>) {
        let prod = grammar.producao.get(key)        
        for (let P of prod){
            let t = this.findFirstT(grammar.terminais, P)
            if (t != ""){                
                arrayLeading.push(t);
            }
            else {
                this.firstStepRecursionLeading(P[0], grammar, arrayLeading);
            }
        }        
    }

    private firstStepRecursionLeadingReverse(key: string, grammar: GrammarV2, arrayTrailings: Array<string>) {
        let prod = grammar.producao.get(key)        
        for (let P of prod){
            let t = this.findFirstTReverse(grammar.terminais, P)
            if (t != ""){                
                arrayTrailings.push(t);
            }
            else {
                this.firstStepRecursionLeadingReverse(P[0], grammar, arrayTrailings);
            }
        }  
    }

    private findFirstTReverse(arrayT: Array<string>, production: Array<string>): string { //leading()
        for (let x=production.length-1; x>-1; x--) {
            if (arrayT.some( T => { return production[x] === T; })) {
                return production[x];
            }
        }
        return ""; //Nothig found
    }

    private findFirstT(arrayT: Array<string>, production: Array<string>): string { //leading()
        for (let x=0; x<production.length; x++) {
            if (arrayT.some( T => { return production[x] === T; })) {
                return production[x];
            }
        }
        return ""; //Nothig found
    }



}
