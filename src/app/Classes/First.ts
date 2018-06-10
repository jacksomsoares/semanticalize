import { Grammar } from "./Grammar";

export class First {

    first: Map<string, string>;

    //Monta o objeto com as sentenças e os firsts;
    constructor(grammar: Grammar){

        this.first = new Map<string,string>();
        let keys: any;
        keys = grammar.producao.keys();

        for(let x = 0; x < grammar.producao.size; x++){ //percore todas as sentenças da gramatica
            
            let key = keys.next().value;
            this.first.set(key,this.findFirst(grammar,key).substring(1)); //substring para tirar a vírgula do começo

        }
        
    }

    //função que encontra o first da sentença
    //ENTRADA: gramatica (Grammar), sentença para encontrar o first (string)
    //SAIDA: todos os firsts da sentença separados por vírgula (string)
    findFirst(grammar: Grammar, sentencaFirst: string){

        let letra: string;
        let firsts: string = "";
        let producoes: string[];

        producoes = grammar.producao.get(sentencaFirst).split("\|");

        for(let y = 0; y < producoes.length; y++){ //percorre as produções da gramatica
            letra = producoes[y].split("")[0];
            if(letra == "&"){ //testa se é vazio
                firsts += "," + letra;
            }else
            if(grammar.isT(letra)){ //testa se o primeiro elemento é um terminal
                firsts += "," + letra;
            }else{ //caso a primeira letra não for um terminal ou vazio, reutiliza a função para procurar novamento o first
                firsts = this.findFirst(grammar,letra);
            }
        }

        return firsts;

    }

    //Função responsável por formatar os dados para exibir na tela
    //SAIDA: firts formatados (string)
    exibirFirsts(){

        let firstText: string = ""; 
        let key: string;
        let keys = this.first.keys();

        for(let x = 0; x < this.first.size; x++){
            
            key = keys.next().value;
            firstText += "FIRST("+key+") = {"+this.first.get(key)+"}\n"

        }

        return firstText;

    }

}
