import {Linguagem} from './Language';

export class Grammar {
    terminais: Array<string>;
    naoTerminais: Array<string>;
    inicioProd: string;
    producao: Map<string, string>;   
    abcdario: Array<string>;

    constructor(grammar: string) {
        this.abcdario = this.genCharArray('A', 'Z');
        this.producao = new Map<string, string>();

        let auxGrammar = grammar;

        auxGrammar = auxGrammar.replace(/ /g, "");
        auxGrammar = auxGrammar.replace(/\s\s/g, "\n");
        auxGrammar = auxGrammar.replace(/\s$/g, "");

        let auxLinha = auxGrammar.split(/\s/);        

        let aux = auxLinha[0].replace(/\w=|[(]|[)]/g, "");

        let aux2: string[] = aux.split(",");
        this.inicioProd = aux2[aux2.length - 1];

        aux = aux.replace(/\},\w.*/g, "}");
        aux = aux.replace(/\},\{/g, "}\n{");
        aux = aux.replace(/\{/g, "");
        aux = aux.replace(/\}/g, "");

        let variaveisDaProducao = aux.split("\n");

        this.naoTerminais = variaveisDaProducao[0].split(",");

        this.terminais = variaveisDaProducao[1].split(",");
        
        auxLinha.forEach( (s) => {
            if (s.includes("->")){
                let temp = s.split("->");
                this.producao.set(temp[0], temp[1]);
            }            

        });
        //this.producao = prodBuilder;

        this.removerABC(null, this.naoTerminais);
    }

    nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    genCharArray(charA: string, charZ: string) {
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }

    IdentificaSentencaMinima(amostras: string[]): string {

        let sentencaMinima = amostras[0];

        amostras.forEach( s => {
            if (s.length < sentencaMinima.length){
                sentencaMinima = s;
            }
        });

        console.log("A sentenca minima encontrda foi:" + sentencaMinima);

        return sentencaMinima;
    }

    gerarSentencas(precisao: number): string[] {

        let quantidadeDeAmostras = precisao;

        //let opcoes = this.producao[this.inicioProd].split("\|");
        let opcoes = this.producao.get(this.inicioProd).split("\|");

        let sentencas = new Array<string>();

        //LocalTime tempoLimite = LocalTime.now().plusSeconds(36);
        let tempoLimite = new Date(Date.now() + 36000).getTime();

        for (let x = 0; x < quantidadeDeAmostras; x++) {
            if (Date.now() > tempoLimite) {
                console.log("Tempo limite do programa atingido");
                break;
            }

            let sentenca: string = opcoes[Math.floor(Math.random() * (opcoes.length - 0)) + 0];

            let incompleto = false;
            let terminar = false;

            while (!terminar) {
                terminar = true;
                let tempoLimiteAmostra = new Date(Date.now() + 12000).getTime();

                for (let s = 0; s < this.naoTerminais.length; s++) {
                    let nt = this.naoTerminais[s];
                    if (sentenca.includes(nt)) {
                        terminar = false;
                        //let aux = this.producao[nt].split("\|");
                        let aux = this.producao.get(nt).split("\|");
                        sentenca = sentenca.replace(nt, aux[Math.floor(Math.random() * (aux.length - 0)) + 0]);
                        break;
                    }
                    if (Date.now() > tempoLimiteAmostra) {
                        console.log("Demorou demais para gerar uma amostra");
                        terminar = true;
                        incompleto = true;
                        break;
                    }
                }
            }

            if (!incompleto) {
                sentenca = sentenca.replace("&", "");
                if (!sentencas.includes(sentenca)) { //Este teste é para n gerar sentencas repetidas
                    sentencas.push(sentenca);
                } else {
                    x--;
                }
            } else {
                x--;
            }
        }

        return sentencas;
    }

    gerarLinguagem(amostras: Array<string>): string {

        let listaLinguagens = new Array<Linguagem>();
        let lingua = null;

        this.terminais.forEach( t => {
            lingua = new Linguagem();
            lingua.terminal = t;
            listaLinguagens.push(lingua);            
        });

        //Nesta parte eu faço uma contagem de terminais e coloco em uma lista para fazer uma amostragem
        //Aproveito para popular os objetos Linguagem para cada um dos terminais
        for (let t of amostras) {
            let amostra = t;

            for (let s of this.terminais) {

                for (let l of listaLinguagens) {
                    if (l.terminal === s) {
                        lingua = l;
                        break;
                    }
                }
                let conta = 0;
                if (amostra.includes(s)) {
                    while (amostra.includes(s)) {
                        amostra = amostra.replace(s, "");
                        conta++;
                    }
                    lingua.contagemTerminais.push(conta);
                } else {
                    lingua.contagemTerminais.push(conta);
                }

            }
        }

        //Este for inicialmente servia para extrair algumas informaçoes da contagem de terminais encontrado a cima.
        //Ele é basicamente usado para enconrar o valor minimo que um terminal aparece em uma sentença
        for (let l of listaLinguagens) {
            let Max = 0;
            let Min = 0;
            let total = 0;
            let media = 0;
            let checado = false;
            for (let i of l.contagemTerminais) {
                if (!checado) {
                    Min = i;
                    checado = true;
                }

                if (Max < i) {
                    Max = i;
                }

                if (Min > i) {
                    Min = i;
                }
                total = total + i;
            }
            media = total / l.contagemTerminais.length;

            console.log("O termina " + l.terminal + " tem o valor max/min/total/media: " + Max + " " + Min + " " + total + " " + media);
            l.valorMin = Min;
        }

        //A partir daqui é a parte de verificar a relação entre os terminais
        //Serve para verificar se um terminal depende de outro para gerar os valores de n,m,... da linguagem
        let atribuicao = this.nextChar('m');
        for (let x = 0; x < listaLinguagens.length; x++) {
            let lx = listaLinguagens[x];

            for (let y = x + 1; y < listaLinguagens.length; y++) {
                let ly = listaLinguagens[y];

                let dependentes = false;
                let inverso = false;
                let valorTeste = lx.contagemTerminais[0] - ly.contagemTerminais[0];

                if (valorTeste < 0) {
                    inverso = true;
                    valorTeste = ly.contagemTerminais[0] - lx.contagemTerminais[0];
                }

                for (let z = 1; z < listaLinguagens[x].contagemTerminais.length; z++) {
                    if (!inverso) {
                        if ((lx.contagemTerminais[z] - ly.contagemTerminais[z]) == valorTeste) {
                            dependentes = true;
                        } else {
                            dependentes = false;
                            break;
                        }
                    } else {
                        if ((ly.contagemTerminais[z] - lx.contagemTerminais[z]) == valorTeste) {
                            dependentes = true;
                        } else {
                            dependentes = false;
                            break;
                        }
                    }
                }

                if (dependentes) {
                    lx.terminalDependentes.push(ly);
                    lx.valorDependencia.set(ly, valorTeste);
                    if (ly.rotulo === ' ') {
                        ly.rotulo = atribuicao;
                    }
                }
            }

            if (lx.rotulo === ' ') {
                lx.rotulo = atribuicao;
                atribuicao = this.nextChar(atribuicao);
            }
        }

        //Este final serve para construir a string final da linguagem.
        let terminalzinhos = "";
        let rotulozinhos = "";
        for (let l of listaLinguagens) {
            console.log("--------------------------");
            console.log("O terminal " + l.terminal + " depende de:");

            let aux = l.rotulo;
            for (let l2 of listaLinguagens) {
                if (l2.terminalDependentes.includes(l)) {
                    aux = aux + "-" + l2.valorDependencia.get(l);
                    break;
                }
            }

            terminalzinhos = terminalzinhos + l.terminal + "(" + aux + ") ";

            //if (!rotulozinhos.contains(String.valueOf(l.rotulo))){
            //    rotulozinhos = rotulozinhos + String.valueOf(l.rotulo) + ">=" + l.valorMin + " ";
            //}
            for (let l2 of l.terminalDependentes) {
                console.log(l2.terminal);
                console.log("O valor de dependendia é -" + l.valorDependencia.get(l2));

            }
            console.log("O rotulo deste terminal é " + l.rotulo);
            console.log("E o valor minimo deste terminal é: " + l.valorMin);
            console.log("--------------------------");

        }

        let m = new Map<string, number>();
        for (let l of listaLinguagens) {
            if (m.get(l.rotulo) == null) {
                m.set(l.rotulo, l.valorMin);
            } else if (m.get(l.rotulo) < l.valorMin) {
                m.set(l.rotulo, l.valorMin);
            }
        }

        m.forEach ( (value, key) => {
            rotulozinhos = rotulozinhos + key + ">=" + value + " ";            
        });

        let resultadoFinal = "Linguagem: L(G)={ " + terminalzinhos + " | " + rotulozinhos + "}";
        console.log(resultadoFinal);

        return resultadoFinal;
    }

    encontrarValorMinimo(lista: Array<number>) {
        let Max = 0;
        let Min = 0;
        let total = 0;
        let media = 0;
        let checado = false;

        for (let i of lista) {
            if (!checado) {
                Min = i;
                checado = true;
            }

            if (Max < i) {
                Max = i;
            }

            if (Min > i) {
                Min = i;
            }
            total = total + i;
        }

        media = total / lista.length;

        console.log("O termina tem o valor max/min/total/media: " + Max + " " + Min + " " + total + " " + media);

        return Min;
    }

    removerABC(simbRemover: string, simbRemoverLista: Array<string>): void{
        if(simbRemover === null){            
            for (let i = 0; i < this.abcdario.length; i++) {
                for (let j = 0; j < simbRemoverLista.length; j++) {
                    if(this.abcdario[i] === simbRemoverLista[j]){
                        const index = this.abcdario.indexOf(this.abcdario[i]);
                        this.abcdario.splice(index, 1);
                    }
                }
            }
            
        }else{
            for (let i = 0; i < this.abcdario.length; i++) {
                if(this.abcdario[i] === simbRemover){
                    const index = this.abcdario.indexOf(this.abcdario[i]);
                    this.abcdario.splice(index, 1);
                }
            }
        }
    }

    //função para achar se a sentença é um não terminal
    //ENTRADA: letra a ser verificada (string)
    //SAIDA: true ou false (boolean)
    isNT(producao: string){

        for(let x = 0; x < this.naoTerminais.length; x++){
            if(producao === this.naoTerminais[x]){
                return true;
            }
        }

        return false;

    }

    //função para achar se a senteça é um terminal
    //ENTRADA: letra a ser verificada (string)
    //SAIDA: true ou false (boolean)
    isT(producao: string){

        for(let x = 0; x < this.terminais.length; x++){
            if(producao === this.terminais[x]){
                return true;
            }
        }

        return false;

    }


}