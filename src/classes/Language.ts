export class Linguagem {
    terminal: string;
    valorMin: number;
    rotulo: string;
    contagemTerminais: Array<number>; //uma lista com o total de terminais de um mesmo tipo para cada amostra (quantos 'a' aparecem na primeira amostra, e assim por diante)
    terminalDependentes: Array<Linguagem>;
    valorDependencia: Map<Linguagem, number>;

    constructor (){
        this.rotulo = ' ';
        this.contagemTerminais = new Array<number>();
        this.terminalDependentes = new Array<Linguagem>();
        this.valorDependencia = new Map<Linguagem, number>();
    }
}