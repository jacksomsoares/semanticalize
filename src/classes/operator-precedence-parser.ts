import {GrammarV2} from './GrammarV2';
// import { ValueTransformer } from '../../../node_modules/@angular/compiler/src/util';

export class OperatorPrecedenceParser {
    public grammar: GrammarV2;
    public leading: Map<string, Array<string>>; //First
    public trailing: Map<string, Array<string>>; //Last

    constructor () {

    }

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

    private findFirstTReverse(arrayT: Array<string>, production: Array<string>): string { //trailing()
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

    public RecognitionTable (): {success: boolean, log: Array<Array<string>>} {
        let resultLog = {success: false, log: Array<Array<string>>()};
        let table = new Map<string, Map<string, string>>();
        let q;
        q = new Map<string, string>();
        table.set("id", q.set("v", ">"));
        table.set("id", q.set("^", ">"));
        table.set("id", q.set(")", ">"));
        table.set("id", q.set("$", ">"));
        q = new Map<string, string>();
        table.set("v", q.set("id", "<"));
        table.set("v", q.set("v", ">"));
        table.set("v", q.set("^", "<"));
        table.set("v", q.set("(", "<"));
        table.set("v", q.set(")", ">"));
        table.set("v", q.set("$", ">"));
        q = new Map<string, string>();
        table.set("^", q.set("id", "<"));
        table.set("^", q.set("v", ">"));
        table.set("^", q.set("^", ">"));
        table.set("^", q.set("(", "<"));
        table.set("^", q.set(")", ">"));
        table.set("^", q.set("$", ">"));
        q = new Map<string, string>();
        table.set("(", q.set("id", "<"));
        table.set("(", q.set("v", "<"));
        table.set("(", q.set("^", "<"));
        table.set("(", q.set("(", "<"));
        table.set("(", q.set(")", "="));
        q = new Map<string, string>();
        table.set(")", q.set("v", ">"));
        table.set(")", q.set("^", ">"));
        table.set(")", q.set(")", ">"));
        table.set(")", q.set("$", ">"));
        q = new Map<string, string>();
        table.set("$", q.set("id", "<"));
        table.set("$", q.set("v", "<"));
        table.set("$", q.set("^", "<"));
        table.set("$", q.set("(", "<"));
        table.set("$", q.set("$", "aceita"));


        let input = [] //"id&id/id";
        input.push("id");
        input.push("v");
        input.push("id");
        input.push("^");
        input.push("id");
        input.push("$");

        
        let stack = [];
        stack.push("$");
        
        const stopCondition = "$" + this.grammar.inicioProd;
        while(true) {
            if (stack.toString().replace(/,/g, "") === stopCondition && input[0] === "$") { //"$" === "$"
                resultLog.success = true;
                resultLog.log.push([stack.toString().replace(/,/g, " "), "", input[0], "", "Aceitar"]);
                break; //Aceita a cadeia de entrada
            }
            else {
                let valueToAdd;
                let handle = [];
                let lastTerminalHandle = input[0];
                while(this.isTerminal(stack[stack.length-1]) === false){
                    valueToAdd = stack[stack.length-1];
                    // let test = stack.pop();
                    handle.unshift(valueToAdd);
                    lastTerminalHandle = this.isTerminal(handle[0])? handle[0] : lastTerminalHandle;
                }                
                let a = stack[stack.length-1];
                let b = input[0];                
                if (table.get(a).get(b) === "<" || table.get(a).get(b) === "=") { //a < b || a == b
                    stack.push(input.shift());
                    resultLog.log.push([stack.toString().replace(/,/g, " "), table.get(a).get(b), input.toString().replace(/,/g, " "), handle.toString().replace(/,/g, " "), "Empilhar"]);
                }
                else {
                    if (table.get(a).get(b) === ">") { // a > b
                        do {
                            valueToAdd = stack[stack.length-1];
                            stack.pop();
                            handle.unshift(valueToAdd); //Desempilhar
                            lastTerminalHandle = this.isTerminal(handle[0])? handle[0] : lastTerminalHandle;
                            //a = this.getTopTerminal(stack);
                            while(this.isTerminal(stack[stack.length-1]) === false){
                                valueToAdd = stack[stack.length-1];
                                stack.pop();
                                handle.unshift(valueToAdd);
                                lastTerminalHandle = this.isTerminal(handle[0])? handle[0] : lastTerminalHandle;
                            }
                            a = stack[stack.length-1];
                        } while(!(table.get(a).get(lastTerminalHandle) === "<"));
                        stack.push(this.getNTcorrelated(handle.toString().replace(/,/g, "")));
                        resultLog.log.push([stack.toString().replace(/,/g, " "), ">", input.toString().replace(/,/g, " "), handle.toString().replace(/,/g, " "), "Reduzir por "+ stack[stack.length-1]+ " -> "+handle.toString().replace(/,/g, " ")]);
                        handle = [];
                        //stack.push(input.shift());
                        if (input[0] !== "$"){
                            stack.push(input[0]);
                            input.shift();
                        }
                    }
                    else {
                        throw console.error("Error found"); //Falha ao reconhecer
                    }
                }
            }
        }

        return resultLog;
    }

    private getNTcorrelated(t: string): string {
        let nt = "";
        this.grammar.producao.forEach( (value, key) => {
            value.forEach( (v) => {
                let aux = v.toString().replace(/\,/g, "");
                if (aux === t) {
                    nt = key;
                }
            });
        });
        return nt;
    }

    /* private getTopTerminal(arrayStack: Array<string>): string {
        if (arrayStack[arrayStack.length-1] === "$"){
            return arrayStack[arrayStack.length-1];
        }
        let x;
        for (let index = arrayStack.length-1; index > -1; index--) {
            x = arrayStack[index];
            if (this.grammar.terminais.some( t => {return t === x} )) {
                return x;
            }
        }

        return ""; //Not found
    } */

    private isTerminal(x): boolean {
        if (x === "$"){
            return true;
        }
        return this.grammar.terminais.some( t => {return t === x} );
    }



}
