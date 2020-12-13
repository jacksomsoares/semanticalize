import { Grammar } from "./Grammar";
import { First } from "./First";

export class Follow {
    follow: Map<string, string>;

    //Monta o objeto com as sentenças e os firsts;
    constructor(grammar: Grammar){
        this.follow = new Map<string,string>();
        let keys: any;
        keys = grammar.producao.keys();

        for(let x = 0; x < grammar.producao.size; x++){ //percore todas as sentenças da gramatica
            let key = keys.next().value;
            //setando os valores no follow. Foi utilizado replace, spli e join para formatar o valor;
            this.follow.set(key,this.findFollow(grammar,key).replace(/&/g,"").replace(/,/g,"").split("").join(","));
        }
    }

    findFollow(grammar: Grammar, sentenca: string){
        let keys = grammar.producao.keys();
        let key;
        let follows: string ="";
        let producaoIniciao: boolean = false;
        let proximaSentenca: string;
        let first = new First(grammar);
        let fezFollow: boolean = false;
        let producoes: string[];

        //teste pra ver se a senteça é o inicio, logo é preciso coloca o simbolo de inicio
        if(grammar.inicioProd == sentenca){
            follows += "$";
            producaoIniciao = true;
        }

        for(let x = 0; x < grammar.producao.size; x++){ //percore todas as sentenças da gramatica
            key = keys.next().value;
            fezFollow = false;

            producoes = grammar.producao.get(key).split("\|");

            for(let y = 0; y < producoes.length; y++){
                //pegar a proxima sentença
                proximaSentenca = producoes[y].charAt(producoes[y].indexOf(sentenca)+1);

                if(producoes[y].includes(sentenca)){
                    if(proximaSentenca == "\|" || proximaSentenca == ""){
                        if(sentenca != key){ //se os simbolos forem iguais o follow é ignorado
                            fezFollow = true;
                            follows += this.findFollow(grammar,key);
                        }
                    }else
                    if(grammar.isT(proximaSentenca)){//testa se a proxima sentença é um terminal
                        follows += proximaSentenca;
                    }else
                    {//simbolo é um NT
                        follows = first.findFirst(grammar,proximaSentenca);
                    }

                    if(grammar.producao.get(key).includes("&") && !fezFollow){
                        if(sentenca != key){ //se os simbolos forem iguais o follow é ignorado
                            fezFollow = true;
                            follows += this.findFollow(grammar,key);
                        }
                    }
                }
            }
        }
        if(producaoIniciao){
            producaoIniciao = false;
            return follows;
        }else{
            return follows;
        }
    }

    //Função responsável por formatar os dados para exibir na tela
    //SAIDA: follows formatados (string)
    exibirFollows(){
        let followText: string = "";
        let key: string;
        let keys = this.follow.keys();

        for(let x = 0; x < this.follow.size; x++){
            key = keys.next().value;
            followText += "FOLLOW("+key+") = {"+this.follow.get(key)+"}\n"
        }
        return followText;
    }
}
