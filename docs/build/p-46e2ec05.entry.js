import{r as t,h as e,H as l}from"./p-29e80129.js";class s{constructor(t){this.producao=new Map;let e=t;e=e.replace(/ /g,""),e=e.replace(/\s\s/g,"\n"),e=e.replace(/\s$/g,"");let l=e.split(/\s/),s=l[0].replace(/\w=[(]|[)]$/g,""),r=s.split(",");this.inicioProd=r[r.length-1],s=s.replace(/\},\w.*/g,"}"),s=s.replace(/\},\{/g,"}\n{"),s=s.replace(/\{/g,""),s=s.replace(/\}/g,"");let o=s.split("\n");this.naoTerminais=o[0].split(","),this.terminais=o[1].split(","),this.terminais.push("&"),this.arrayNTandT=this.naoTerminais.concat(this.terminais),l.forEach((t=>{if(t.includes("->")){let e=t.split("->"),l=e[0],s=[];e[1].split("|").map((t=>{let e=[],l=t;for(;""!==l;){let t=this.getValidProductionChar(l);if(""===t)break;e.push(t),l=l.replace(t,"")}s.push(e)})),this.producao.set(l,s)}}))}getValidProductionChar(t){let e=t;for(;;){if(this.arrayNTandT.some((t=>t===e)))return e;if(e=e.slice(0,e.length-1),""===e)return""}}isNT(t){return this.naoTerminais.some((e=>e===t))}isT(t){return this.terminais.some((e=>e===t))}}class r{constructor(){}FirstStep(t){this.leading=new Map,this.trailing=new Map;for(let e of t.naoTerminais){let l=[],s=[];this.firstStepRecursionLeading(e,t,l),this.firstStepRecursionLeadingReverse(e,t,s),this.leading.set(e,l),this.trailing.set(e,s)}}firstStepRecursionLeading(t,e,l){let s=e.producao.get(t);for(let t of s){let s=this.findFirstT(e.terminais,t);""!=s?l.push(s):this.firstStepRecursionLeading(t[0],e,l)}}firstStepRecursionLeadingReverse(t,e,l){let s=e.producao.get(t);for(let t of s){let s=this.findFirstTReverse(e.terminais,t);""!=s?l.push(s):this.firstStepRecursionLeadingReverse(t[0],e,l)}}findFirstTReverse(t,e){for(let l=e.length-1;l>-1;l--)if(t.some((t=>e[l]===t)))return e[l];return""}findFirstT(t,e){for(let l=0;l<e.length;l++)if(t.some((t=>e[l]===t)))return e[l];return""}RecognitionTable(){let t,e={success:!1,log:Array()},l=new Map;t=new Map,l.set("id",t.set("v",">")),l.set("id",t.set("^",">")),l.set("id",t.set(")",">")),l.set("id",t.set("$",">")),t=new Map,l.set("v",t.set("id","<")),l.set("v",t.set("v",">")),l.set("v",t.set("^","<")),l.set("v",t.set("(","<")),l.set("v",t.set(")",">")),l.set("v",t.set("$",">")),t=new Map,l.set("^",t.set("id","<")),l.set("^",t.set("v",">")),l.set("^",t.set("^",">")),l.set("^",t.set("(","<")),l.set("^",t.set(")",">")),l.set("^",t.set("$",">")),t=new Map,l.set("(",t.set("id","<")),l.set("(",t.set("v","<")),l.set("(",t.set("^","<")),l.set("(",t.set("(","<")),l.set("(",t.set(")","=")),t=new Map,l.set(")",t.set("v",">")),l.set(")",t.set("^",">")),l.set(")",t.set(")",">")),l.set(")",t.set("$",">")),t=new Map,l.set("$",t.set("id","<")),l.set("$",t.set("v","<")),l.set("$",t.set("^","<")),l.set("$",t.set("(","<")),l.set("$",t.set("$","aceita"));let s=[];s.push("id"),s.push("v"),s.push("id"),s.push("^"),s.push("id"),s.push("$");let r=[];r.push("$");const o="$"+this.grammar.inicioProd;for(;;){if(r.toString().replace(/,/g,"")===o&&"$"===s[0]){e.success=!0,e.log.push([r.toString().replace(/,/g," "),"",s[0],"","Aceitar"]);break}{let t,o=[],n=s[0];for(;!1===this.isTerminal(r[r.length-1]);)t=r[r.length-1],o.unshift(t),n=this.isTerminal(o[0])?o[0]:n;let i=r[r.length-1],a=s[0];if("<"===l.get(i).get(a)||"="===l.get(i).get(a))r.push(s.shift()),e.log.push([r.toString().replace(/,/g," "),l.get(i).get(a),s.toString().replace(/,/g," "),o.toString().replace(/,/g," "),"Empilhar"]);else{if(">"!==l.get(i).get(a))throw console.error("Error found");do{for(t=r[r.length-1],r.pop(),o.unshift(t),n=this.isTerminal(o[0])?o[0]:n;!1===this.isTerminal(r[r.length-1]);)t=r[r.length-1],r.pop(),o.unshift(t),n=this.isTerminal(o[0])?o[0]:n;i=r[r.length-1]}while("<"!==l.get(i).get(n));r.push(this.getNTcorrelated(o.toString().replace(/,/g,""))),e.log.push([r.toString().replace(/,/g," "),">",s.toString().replace(/,/g," "),o.toString().replace(/,/g," "),"Reduzir por "+r[r.length-1]+" -> "+o.toString().replace(/,/g," ")]),o=[],"$"!==s[0]&&(r.push(s[0]),s.shift())}}}return e}getNTcorrelated(t){let e="";return this.grammar.producao.forEach(((l,s)=>{l.forEach((l=>{l.toString().replace(/\,/g,"")===t&&(e=s)}))})),e}isTerminal(t){return"$"===t||this.grammar.terminais.some((e=>e===t))}}const o=class{constructor(e){t(this,e),this.tableRow=Array()}doStepOne(){let t=new s(this.grammar),e=new r;e.grammar=t,e.FirstStep(t);let l=[];for(let s of t.naoTerminais){let t={NT:"",first:"",last:""};t.NT=s,t.first=e.leading.get(s).toString(),t.last=e.trailing.get(s).toString(),l.push(t)}this.tableRow=l}render(){return e(l,null,e("button",{class:"btn btn-outline-dark",onClick:()=>this.doStepOne()},"Passo 1"),e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,e("th",null,"#"),e("th",null,"Primeiros"),e("th",null,"Ultimos"))),e("tbody",null,this.tableRow.map((t=>e("tr",null,e("td",null,t.NT),e("td",null,t.first),e("td",null,t.last)))))))}};class n{findTNT(t){let e;this.listaTNT=[],e=t.producao.keys();for(let l=0;l<t.producao.size;l++){let l,s,r=e.next().value,o=!1;s=t.producao.get(r).toString().split("|");for(let e=0;e<s.length;e++){l=s.toString().split(",");for(let e=0;e<l.length;e++)t.isT(l[e])&&(o=!0,e++),t.isNT(l[e])&&o&&(this.listaTNT.push(l[e-1]+l[e]),o=!1)}}return console.log(this.listaTNT),this.listaTNT}getMenorPrecedencia(t){let e=[],l=new s(t),o=new r;const n=new Map;e=this.findTNT(l),o.FirstStep(l);for(let t=0;t<e.length;t++){let l=e[t].toString().split(""),s=e[t],r=new Array;const i=o.leading.get(l[1]).toString().split(",");for(let t=0;t<i.length;t++){const e=l[0].toString()+" < "+i[t];r.push(e)}n.set(s,r)}return n}getTableRowMenorMarcador(t){let e=[],l=new s(t),o=new r;const n=new Array;e=this.findTNT(l),o.FirstStep(l);for(let t=0;t<e.length;t++){let l=e[t].toString().split("");const s=o.leading.get(l[1]).toString().split(",");for(let l=0;l<s.length;l++)if(t===e.length-1){const t=new Array;t.push("$ < "+s[l]),n.push(t)}}return n}}class i{findNTT(t){let e;this.listaNTT=[],e=t.producao.keys();for(let l=0;l<t.producao.size;l++){let l,s,r=e.next().value,o=!1;s=t.producao.get(r).toString().split("|");for(let e=0;e<s.length;e++){l=s.toString().split(",");for(let e=0;e<l.length;e++)t.isNT(l[e])&&(o=!0,e++),t.isT(l[e])&&o&&(this.listaNTT.push(l[e-1]+l[e]),o=!1)}}return console.log(this.listaNTT),this.listaNTT}getMaiorPrecedencia(t){let e=[],l=new s(t),o=new r;const n=new Map;e=this.findNTT(l),o.FirstStep(l);for(let t=0;t<e.length;t++){let l=e[t].toString().split(""),s=e[t],r=[];const i=o.trailing.get(l[0]).toString().split(",");for(let t=0;t<i.length;t++)r.push(i[t]+" > "+l[1]);n.set(s,r)}return n}getTableRowMaiorMarcador(t){let e=[],l=new s(t),o=new r;const n=new Array;e=this.findNTT(l),o.FirstStep(l);for(let t=0;t<e.length;t++){let l=e[t].toString().split("");const s=o.trailing.get(l[0]).toString().split(",");for(let e=0;e<s.length;e++)if(0===t){const t=new Array;t.push(s[e]+" > $"),n.push(t)}}return n}}class a{constructor(){}getHeaderTable(t){const e=new Array;for(let l=0;l<t.terminais.length;l++)e.push(t.terminais[l]);return e.push("$"),e}getArray(t,e,l,s){const r=[];t.forEach((t=>{for(let e=0;e<t.length;e++)r.push(t[e])})),e.forEach((t=>{for(let e=0;e<t.length;e++)r.push(t[e])}));for(let t=0;t<l.length;t++)r.push(l[t].toString());for(let t=0;t<s.length;t++)r.push(s[t].toString());return r}getMapTable(t){const e=new s(t),l=new n,r=new i,o=l.getMenorPrecedencia(t),a=r.getMaiorPrecedencia(t),h=l.getTableRowMenorMarcador(t),c=r.getTableRowMaiorMarcador(t),d=this.getArray(o,a,h,c),u=this.getHeaderTable(e),f=new Map,p=new Map;for(let t=0;t<u.length;t++){const e=u[t];for(let t=0;t<u.length;t++){const l=u[t];for(let t=0;t<d.length;t++){const s=d[t],r=e+" > "+l;s===e+" < "+l?(p.set(l,"<"),d.splice(t,1),t=d.length-1):s===r&&(p.set(l,">"),d.splice(t,1),t=d.length-1)}f.set(e,p)}}return f}getRowTable(t){const e=new s(t),l=new n,r=new i,o=l.getMenorPrecedencia(t),a=r.getMaiorPrecedencia(t),h=l.getTableRowMenorMarcador(t),c=r.getTableRowMaiorMarcador(t),d=this.getArray(o,a,h,c),u=this.getHeaderTable(e),f=new Array;for(let t=0;t<u.length;t++){const e=[],l=u[t];e.push(l);for(let t=0;t<u.length;t++){const s=u[t];let r=!1;for(let t=0;t<d.length;t++){const o=d[t],n=l+" > "+s;o===l+" < "+s?(e.push("<"),d.splice(t,1),t=d.length-1,r=!0):o===n&&(e.push(">"),d.splice(t,1),t=d.length-1,r=!0)}r||e.push("")}f.push(e)}return f}}const h=class{constructor(e){t(this,e),this.tableRowMaiorMarcador=[],this.tableRowMenorMarcador=[],this.tableHead=[],this.tableRow=[]}doLoad(){this.doStepTwo(),this.doStepTree(),this.doCreateTable()}doCreateTable(){const t=new a,e=new s(this.grammar);this.tableHead=t.getHeaderTable(e),this.tableRow=t.getRowTable(this.grammar)}doStepTwo(){let t=new s(this.grammar),e=new n;e.findTNT(t),this.tableHeaderP2=e.listaTNT;let l=[];this.tableRowMenorMarcador=[],this.menorprecedencia=e.getMenorPrecedencia(this.grammar),this.tableRowMenorMarcador=e.getTableRowMenorMarcador(this.grammar);for(let t=0;t<this.tableHeaderP2.length;t++){let e=this.tableHeaderP2[t],s=[];this.menorprecedencia.forEach(((t,l)=>{if(e===l)for(let e=0;e<t.length;e++)s.push(t[e])})),l.push(s)}this.tableRowP2=l}doStepTree(){let t=new s(this.grammar),e=new i;e.findNTT(t),this.tableHeaderP3=e.listaNTT;let l=[];this.tableRowMaiorMarcador=[],this.maiorprecedencia=e.getMaiorPrecedencia(this.grammar),this.tableRowMaiorMarcador=e.getTableRowMaiorMarcador(this.grammar);for(let t=0;t<this.tableHeaderP3.length;t++){let e=this.tableHeaderP3[t],s=[];this.maiorprecedencia.forEach(((t,l)=>{if(e===l)for(let e=0;e<t.length;e++)s.push(t[e])})),l.push(s)}this.tableRowP3=l}render(){var t,s,r,o,n,i,a,h;return e(l,null,e("button",{class:"btn btn-outline-dark",onClick:()=>this.doLoad()},"Passo 2"),e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,null===(t=this.tableHeaderP2)||void 0===t?void 0:t.map((t=>e("th",{scope:"col"},t))))),e("tbody",null,null===(s=this.tableRowP2)||void 0===s?void 0:s.map((t=>e("td",null,t.map((t=>e("tr",null,t)))))))),e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,null===(r=this.tableHeaderP3)||void 0===r?void 0:r.map((t=>e("th",{scope:"col"},t))))),e("tbody",null,null===(o=this.tableRowP3)||void 0===o?void 0:o.map((t=>e("td",null,t.map((t=>e("tr",null,t)))))))),this.tableRowMaiorMarcador.length>0?e("h4",null,"Precedência do marcador"):null,e("div",{class:"row"},e("div",{class:"col-6"},e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,this.tableRowMaiorMarcador.length>0?e("th",{scope:"col"},"Maior Marcador"):null)),e("tbody",null,null===(n=this.tableRowMaiorMarcador)||void 0===n?void 0:n.map((t=>e("tr",null,t.map((t=>e("td",null,t))))))))),e("div",{class:"col-6"},e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,this.tableRowMenorMarcador.length>0?e("th",{scope:"col"},"Menor Marcador"):null)),e("tbody",null,null===(i=this.tableRowMenorMarcador)||void 0===i?void 0:i.map((t=>e("tr",null,t.map((t=>e("td",null,t)))))))))),this.tableHead.length>0?e("h4",null,"Tabela"):null,this.tableHead.length>0?e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,e("th",{scope:"col"},"#"),e("th",null),null===(a=this.tableHead)||void 0===a?void 0:a.map((t=>e("th",{scope:"col"},t))))),e("tbody",null,null===(h=this.tableRow)||void 0===h?void 0:h.map(((t,l)=>e("tr",null,e("th",{scope:"row"},l+1),t.map((t=>e("td",null,t)))))))):null)}},c=class{constructor(e){t(this,e),this.inputRecog="id&id/id",this.tableRow=Array()}recognize(){let t=new s(this.grammar),e=new r;e.grammar=t;let l=e.RecognitionTable();for(let t of l.log){let e={stack:"",relation:"",input:"",handle:"",action:""};e.stack=t[0],e.relation=t[1],e.input=t[2],e.handle=t[3],e.action=t[4],this.tableRow.push(e)}}render(){return e(l,null,e("div",{class:"form-inline"},e("div",{class:"form-group mb-2"},e("label",{htmlFor:"inputRecognition"},"Entrada: ")),e("div",{class:"form-group mx-sm-3 mb-2"},e("input",{id:"inputRecognition",class:"form-control",type:"text",value:this.inputRecog,onInput:t=>this.inputRecog=t.target.value})),e("button",{class:"btn btn-light mb-2",onClick:()=>this.recognize(),disabled:!0},"Reconhecer (Não está pronto ainda)")),e("table",{class:"table table-hover"},e("thead",{class:"thead-dark"},e("tr",null,e("th",{class:"text-center",scope:"col"},"Passo"),e("th",{class:"text-center",scope:"col"},"Pilha"),e("th",{class:"text-center",scope:"col"},"Relação"),e("th",{class:"text-center",scope:"col"},"Entrada"),e("th",{class:"text-center",scope:"col"},"Handle"),e("th",{class:"text-center",scope:"col"},"Ação"))),e("tbody",null,this.tableRow.map(((t,l)=>e("tr",null,e("th",{scope:"row"},l+1),e("td",null,t.stack),e("td",{class:"text-center"},t.relation),e("td",{class:"text-right"},t.input),e("td",{class:"text-center"},t.handle),e("td",null,t.action)))))))}};export{o as app_apopasso1,h as app_apopasso2,c as app_apopasso3}