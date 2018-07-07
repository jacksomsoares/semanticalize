export class GrammarV2 {
    public terminais: Array<string>;
    public naoTerminais: Array<string>;
    public arrayNTandT: Array<string>;
    public inicioProd: string;
    public producao: Map<string, Array<Array<string>>>;
    /*This production have the following structure:
        Key -> value[
                pipe1[ nt, T, nt, T, ...], //Not specific in this order 
                pipe2[ nt, T, nt, T, ...], //Not specific in this order
                pipe3[...],
            ]
    */
    constructor(grammar: string){
        this.producao = new Map<string, Array<Array<string>>>();
        let auxGrammar = grammar;

        auxGrammar = auxGrammar.replace(/ /g, "");
        auxGrammar = auxGrammar.replace(/\s\s/g, "\n");
        auxGrammar = auxGrammar.replace(/\s$/g, "");

        let auxLinha = auxGrammar.split(/\s/);   
        
        let aux = auxLinha[0].replace(/\w=[(]|[)]$/g, "");

        let aux2: string[] = aux.split(",");
        this.inicioProd = aux2[aux2.length - 1];

        aux = aux.replace(/\},\w.*/g, "}");
        aux = aux.replace(/\},\{/g, "}\n{");
        aux = aux.replace(/\{/g, "");
        aux = aux.replace(/\}/g, "");

        let variaveisDaProducao = aux.split("\n");

        this.naoTerminais = variaveisDaProducao[0].split(",");
        this.terminais = variaveisDaProducao[1].split(",");
        this.terminais.push("&");
        this.arrayNTandT = this.naoTerminais.concat(this.terminais);

        auxLinha.forEach( (s) => {
            if (s.includes("->")){
                let temp = s.split("->");
                let key = temp[0];
                let value = [];
                let production = temp[1].split("\|");                
                production.map( p => {
                    let pipe = [];
                    let pTemp = p;
                    while (pTemp !== ""){
                        let char = this.getValidProductionChar(pTemp);
                        if (char !== "") {
                            pipe.push(char);
                            pTemp = pTemp.replace(char, "");
                        }
                        else {
                            break;
                        }
                    }
                    value.push(pipe);
                });
                this.producao.set(key, value);
            }
        });

    }

    private getValidProductionChar(strToCheck: string): string {
        let str = strToCheck;

        while(true) {
            if (this.arrayNTandT.some(p => { return p === str; })) {
                return str;
            }            
            else {
                str = str.slice(0, str.length-1);
                if (str === "") {
                    return "";
                }
            }            
        }        
    }

    public isNT(strToCheck: string): boolean {
        return this.naoTerminais.some( NT => {
            return NT === strToCheck;          
        });
    }

    public isT(strToCheck: string): boolean {
        return this.terminais.some( NT => {
            return NT === strToCheck;          
        });
    }
}