import {PreditiveTable} from './PreditiveTable'
import {Grammar} from './Grammar'

export class RecognitionTable {    
    stackPile: Array<string>; //Pilha
    inputPile: Array<string>; //Entrada
    grammar: Grammar;
    symbols: Array<string>;
    
    constructor (){      
    }

    public reconize(input: string, preditiveTable: PreditiveTable, grammar: Grammar ) {        
        this.stackPile = new Array();
        this.stackPile.push("$");        
        this.stackPile.push(grammar.inicioProd);

        this.grammar = grammar;
        this.setUpSymbols();

        this.inputPile = new Array();
        this.setStackPile(input);    
        this.inputPile.push("$");     

        while(true) {
            if (!this.executeTask(preditiveTable)){
                
            }
        }        

    }    

    private executeTask(preditiveTable: PreditiveTable): boolean {
        if (this.stackPile[this.stackPile.length] === this.inputPile[0]){
            this.stackPile.pop();
            this.inputPile.pop();
            return true;
        }
        if (this.setStackPile.length === 0 || this.inputPile.length ===0) {
            return false;//End
        }        
        let output = preditiveTable.table.get(this.stackPile[this.stackPile.length-1]).get(this.inputPile[0]);
        if (output){
            this.stackPile.pop();
            this.setStrackPileReverse(output);
        } else {
            return false;
        }
        return true;
    }

    private setStrackPileReverse(input: string){

        input = input.split("").reverse().join("");

        while (input !== ""){
            this.symbols.forEach(simb => {
                if (input.endsWith(simb)){                    
                    input = input.substring(0, input.lastIndexOf(simb));
                    this.inputPile.push(simb);
                }
            });           
        } 
    }

    private setStackPile(input: string){        
        while (input !== ""){
            this.grammar.naoTerminais.forEach(nt => {
                if (input.startsWith(nt)){
                    this.inputPile.push(nt);
                    input = input.replace(nt, "");
                }
            });           
        }             
    }

    private setUpSymbols() {
        this.symbols = new Array<string>();
        this.symbols = this.symbols.concat(this.grammar.naoTerminais);
        this.symbols = this.symbols.concat(this.grammar.terminais);
    }
}