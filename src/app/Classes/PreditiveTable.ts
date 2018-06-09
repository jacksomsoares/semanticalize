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
        tempMap.set('id', "TE'");
        tempMap.set('(', "TE'");
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
}