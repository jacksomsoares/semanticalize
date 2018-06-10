import { First } from "./First";
import { Grammar } from "./Grammar";

export class PreditiveTable {

    table: Map<string, Map<string, string>>;
    /*
    The structure looks like this:
        Map< NTerminal Map<terminal, value >>
        Map< E , Map< id, E -> TE >>

        Using this structure we cant simply acess data like
        Map.get(Nterminal).get(Terminal) \\Will return the exacly value of that combination of NT/T
        Map.get(E).get(id) \\will return E -> TE

        TO set data we can simply use like this:
        Map.set(NT).set(t, value)
    
    */

    constructor() {
        this.table = new Map<string, Map<string, string>>();
    }

    mockData() {
        let tempMap = new Map<string, string>();
        tempMap.set('(', "TE'");
        tempMap.set('id', "TE'");
        this.table.set('E', tempMap);

        tempMap = new Map<string, string>();
        tempMap.set('+', "+TE'");
        tempMap.set(')', "&");
        tempMap.set('$', "&");
        this.table.set("E'", tempMap);

        tempMap = new Map<string, string>();
        tempMap.set('id', "FT'");
        tempMap.set('(', "FT'");
        this.table.set("T", tempMap);

        tempMap = new Map<string, string>();
        tempMap.set('+', "&");
        tempMap.set('*', "*FT'");
        tempMap.set(')', "&");
        tempMap.set('$', "&");
        this.table.set("T'", tempMap);

        tempMap = new Map<string, string>();
        tempMap.set('id', "id");
        tempMap.set('(', "(E)");
        this.table.set("F", tempMap);
    }

    generate(grammar: Grammar) {
        let FIRSTMAP = new Map<string, string>();
        FIRSTMAP.set("E", "(,id");
        FIRSTMAP.set("T", "(,id");
        FIRSTMAP.set("F", "(,id");
        FIRSTMAP.set("T'", "*,&");
        FIRSTMAP.set("E'", "+,&");

        let FOLLOWMAP = new Map<string, string>();
        FOLLOWMAP.set("E", "),$");
        FOLLOWMAP.set("E'", "),$");
        FOLLOWMAP.set("T", "+,),$");
        FOLLOWMAP.set("T'", "+,),$");
        FOLLOWMAP.set("F", "+,*,),$");

        let producoes: any;
        producoes = grammar.producao;

        producoes.forEach((value1, key1) => {
            let tempMap = new Map<string, string>();
            let producao: string;
            let nt: string;

            producao = value1;
            nt = key1;

            if (producao.indexOf("&") > 1) { // verifica se existe sentença vazia(&) na producao
                let prod = producao.split("|");
                for (let index = 0; index < prod.length; index++) {
                    const element = prod[index];
                    if (element === "&") {
                        FOLLOWMAP.forEach((val, key) => {
                            if (nt === key) {
                                for (let index = 0; index < val.length; index++) {
                                    tempMap.set(val[index], "&");
                                }
                                return false;
                            }
                        });
                    } else {
                        FIRSTMAP.forEach((value2, key2) => {
                            if (key1 === key2) {
                                let array = value2.split(",");
                                for (let index = 0; index < array.length; index++) {
                                    tempMap.set(array[index], producao.split("|")[0]);
                                }
                                return false;
                            }
                        });
                    }
                }
            } else {
                FIRSTMAP.forEach((value2, key2) => {
                    if (key1 === key2) {
                        let array = value2.split(",");
                        for (let index = 0; index < array.length; index++) {
                            const element = array[index];
                            tempMap.set(element, producao);
                        }
                        return false;
                    }
                });
            }
            this.table.set(nt, tempMap);
        });
    }
}