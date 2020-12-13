import {PreditiveTable} from './PreditiveTable'
import {Grammar} from './Grammar'

export class RecognitionTable {    
    stackPile: Array<string>; //Pilha
    inputPile: Array<string>; //Entrada
    grammar: Grammar;
    symbols: Array<string>;
    tableRows: Array<Array<string>>;
    
    constructor (){      
        this.tableRows = new Array<Array<string>>();
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
        
        let arrTmp = Array<string>();
        arrTmp.push(this.stackPile.join(''));
        arrTmp.push(this.inputPile.join(''));
        this.tableRows.push(arrTmp);

        while(true) {
            if (!this.executeTask(preditiveTable)){
                if (this.stackPile.length === 0 || this.inputPile.length ===0){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    private executeTask(preditiveTable: PreditiveTable): boolean { 
        if (this.stackPile.length === 0 || this.inputPile.length ===0) {
            return false;//End
        }
        else if (this.stackPile[this.stackPile.length-1] === this.inputPile[0]){
            this.stackPile.pop();
            this.inputPile.shift();
            let arrTmp = Array<string>();
            arrTmp.push(this.stackPile.join(''));
            arrTmp.push(this.inputPile.join(''));
            arrTmp.push("");
            this.tableRows.push(arrTmp);
            return true;
        }               
        let output = preditiveTable.table.get(this.stackPile[this.stackPile.length-1]).get(this.inputPile[0]);
        if (output){
            let tempRes = this.stackPile[this.stackPile.length-1] + " -> " + output;
            this.stackPile.pop();
            if (output !== "&"){
                this.setStrackPileReverse(output);
            }
            let arrTmp = Array<string>();
            arrTmp.push(this.stackPile.join(''));
            arrTmp.push(this.inputPile.join(''));
            arrTmp.push(tempRes);
            this.tableRows.push(arrTmp);
        } else {
            let arrTmp = Array<string>();
            arrTmp.push(`O não Terminal ${this.stackPile[this.stackPile.length-1]} não possui valor corespondente na tabela preditiva para o valor ${this.inputPile[0]}.`);
            this.tableRows.push(arrTmp);
            return false;//If it landed here something wrong happend
        }
        return true;
    }

    private setStrackPileReverse(input: string){
        while (input !== ""){
            this.symbols.forEach(simb => {
                if (input.endsWith(simb)){                    
                    input = input.substring(0, input.lastIndexOf(simb));
                    this.stackPile.push(simb);
                }
            });           
        } 
    }

    private setStackPile(input: string){        
        while (input !== ""){
            this.grammar.terminais.forEach(nt => {
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