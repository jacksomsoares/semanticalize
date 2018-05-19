export class Grammar {
    terminais: Array<String>;
    naoTerminais: Array<String>;
    inicioProd: String;
    producao: Object;

    constructor(grammar: String) {

        let auxGrammar = grammar;

        

        auxGrammar = auxGrammar.replace(/ /g, "");
        auxGrammar = auxGrammar.replace(/\s\s/g, "\n");
        auxGrammar = auxGrammar.replace(/\s$/g, "");

        let auxLinha = auxGrammar.split(/\s/);        

        let aux = '';
        aux = auxLinha[0].replace(/\w=|[(]|[)]/g, "");

        

        let aux2: String[] = aux.split(",");
        this.inicioProd = aux2[aux2.length - 1];
        
        let prodBuilder: any = {};
        auxLinha.forEach( (s) => {
            if (s.includes("->")){
                let temp = s.split("->");              
                let a = temp[0];
                prodBuilder[a] = temp[1];
            }            
        });
        this.producao = prodBuilder;
    }
}