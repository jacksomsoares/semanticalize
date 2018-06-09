export class PreditiveTable {    

    table: Map<string, Map<string, string>>;
    table2: Array<Array<string>>;
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

    constructor (){
        this.table = new Map<string, Map<string, string>>();
        this.table2 = new Array();
    }
}