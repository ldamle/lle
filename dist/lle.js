!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.lle=t():n.lle=t()}(this,(()=>(()=>{"use strict";var n={d:(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},o:(n,t)=>Object.prototype.hasOwnProperty.call(n,t),r:n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}},t={};n.r(t),n.d(t,{Connection:()=>g,Element:()=>E,ElementGraph:()=>G,Generator:()=>j,Types:()=>_,stde:()=>r});var e={};n.r(e),n.d(e,{__getArrayIt:()=>m,__replByIndex:()=>d});var o={};n.r(o),n.d(o,{getFunc:()=>y,getFuncElement:()=>p});var i={};n.r(i),n.d(i,{Default:()=>C,Generator:()=>N,copy:()=>O});var s={};n.r(s),n.d(s,{element:()=>i});var r={};n.r(r),n.d(r,{signal:()=>o,style:()=>s});var c={};n.r(c);var h={};n.r(h);var l={};n.r(l);var u={};n.r(u);var a={};n.r(a);var f={};n.r(f),n.d(f,{ConnectionFactory:()=>v});var _={};n.r(_),n.d(_,{Factories:()=>f,Interface:()=>a,elementGraph:()=>h,server:()=>l,signal:()=>e,source:()=>c,style:()=>u});class g{constructor(n,t,e){this.in=!1,this.out=n,this.state="z",t&&(this.state="x",e&&(this.state=e),Array.isArray(t)?this.in=t:this.in=[t])}inConnect(n){return Array.isArray(this.in)?this.in.push(n):this.in=[n],this}disConnect(n){if(Array.isArray(this.in)){for(let t=0;t<this.in.length;t++)if(this.in[t].name===n.name&&this.in[t].element===n.element){this.in.splice(t,1);break}0===this.in.length&&(this.in=!1)}return this}inConnects(n){return Array.isArray(this.in)?this.in.push(...n):this.in=n,this}disConnects(n){if(Array.isArray(this.in))for(let t=0;t<n.length;t++)this.disConnect(n[t]);return this}isConnected(){return Array.isArray(this.in)&&this.in.length>0}lenInConnected(){return Array.isArray(this.in)?this.in.length:0}clone(n){return new g({name:this.out.name,element:n,no_source:this.out.no_source,is_out:!0})}getArrayInString(){const n=[];if(Array.isArray(this.in))for(let t=0;t<this.in.length;t++)n.push(this.in[t].name);return n}findInString(n){if(Array.isArray(this.in))for(let t=0;t<this.in.length;t++)if(this.in[t].element===n)return this.in[t].name;return""}findInSource(n){if(Array.isArray(this.in))for(let t=0;t<this.in.length;t++)if(this.in[t].element===n)return this.in[t]}}function m(n){return 0===n||1===n?n.toString():n}function d(n,t,e){return n.substring(0,e)+m(t)+n.substring(e+1)}function p(n,t){return y(n,t.in_connections?t.in_connections.length:0,t.out_connections.length,t.inArray?t.inArray():[""])}function y(n,t,e,o){const i=new Array(Math.pow(2,t)).fill("z".repeat(e));for(let t=0;t<n.length;t++)"object"==typeof n[t]&&"in"in n[t]&&"out"in n[t]?S(n[t],i):"object"==typeof n[t]&&"name"in n[t]&&"state"in n[t]&&"out"in n[t]&&o instanceof Array?x(n[t],i,o,e):A(n[t],i,e);return n=>i[parseInt(n,2)]||(i.length>0?"z".repeat(i[0].length):"")}function A(n,t,e){const o="z".repeat(e);for(let e=0;e<t.length;e++)if(JSON.stringify(t[e])===JSON.stringify(o)){t[e]=n;break}}function S(n,t){Array.isArray(n.in)&&(n.in=n.in.join(""));const e=b(n.in);for(let o=0;o<e.length;o++)t[parseInt(e[o],2)]=n.out}function b(n){if(!n.includes("x"))return[n];const t=[],e=n.indexOf("x");return t.push(...b(n.slice(0,e)+"0"+n.slice(e+1))),t.push(...b(n.slice(0,e)+"1"+n.slice(e+1))),t}function x(n,t,e,o,i){if("else"===n.name){const e="z".repeat(o);for(let o=0;o<t.length;o++)JSON.stringify(t[o])===JSON.stringify(e)&&(t[o]=n.out);return}if("object"==typeof n.out&&"name"in n.out&&"state"in n.out&&"out"in n.out)return void(i?(i.push([e.indexOf(n.name),n.state]),x(n.out,t,e,o,i)):x(n.out,t,e,o,[[e.indexOf(n.name),n.state]]));let s="x".repeat(e.length);if(i)for(let n=0;n<i.length;n++)s=d(s,i[n][1],i[n][0]);s=d(s,n.state,e.indexOf(n.name)),S({in:s,out:n.out},t)}const C={disp:"ru_el_notation",display_name:!0,adder_name_array:[],preffix_name_in_connection:"",suffix_name_in_connection:"",preffix_name_out_connection:"",suffix_name_out_connection:"",display_in_connections:!0,display_out_connections:!0,display_line_in_connections:!0,display_line_out_connections:!0,rotate:"0",sizes:{MarginConn:{v:30,h:12},MarginCenter:{v:15,h:40,vb:10},strokeWidth:3,font:{center:35,conn:28},color:{background:"#ffffff",foreground:"#000000"}}},N={disp:"ru_el_notation",display_name:!1,adder_name_array:[],preffix_name_in_connection:"",suffix_name_in_connection:"",preffix_name_out_connection:"",suffix_name_out_connection:"",display_in_connections:!1,display_out_connections:!0,display_line_in_connections:!1,display_line_out_connections:!1,rotate:"0",sizes:{MarginConn:{v:10,h:10},MarginCenter:{v:10,h:10,vb:10},strokeWidth:10,font:{center:10,conn:10},color:{background:"#ffffff",foreground:"#000000"}}};function O(n){return Object.assign(Object.assign({},n),{sizes:Object.assign(Object.assign({},n.sizes),{MarginConn:Object.assign({},n.sizes.MarginConn),MarginCenter:Object.assign({},n.sizes.MarginCenter),font:Object.assign({},n.sizes.font),color:Object.assign({},n.sizes.color)})})}class v{constructor(n){this.connectionClass=n}create(n,t){return t?new this.connectionClass(n,t):new this.connectionClass(n)}}const F={Connection:new v(g)};class E{constructor(n,t,e,o){this.in_connections=[],this.out_connections=[],this.state=()=>"",this.name="",this.style=this.customStyle(),"string"==typeof n?(this.name=n,t instanceof E&&e instanceof E&&this.concat(t,e),t instanceof Array&&e instanceof Array&&o instanceof Array&&this.setParams(t,e,y(o,this.in_connections.length,this.out_connections.length,this.inArray())),t instanceof Array&&e instanceof Array&&"function"==typeof o&&this.setParams(t,e,o)):(n instanceof E&&t instanceof E&&this.concat(n,t),n instanceof Array&&t instanceof Array&&e instanceof Array&&this.setParams(n,t,y(e,this.in_connections.length,this.out_connections.length,this.inArray())),t instanceof Array&&e instanceof Array&&"function"==typeof o&&this.setParams(t,e,o))}setParams(n,t,e){for(let n=0;n<t.length;n++)this.out_connections.push(F.Connection.create({name:t[n],element:this,no_source:n,is_out:!0}));return this.in_connections=n,this.state=e,this}concat(n,t){const e=n.clone(),o=t.clone();if(e.out_connections.length<o.in_connections.length){for(let n=0;n<e.out_connections.length;n++)o.in(o.in_connections[n],e.out_connections[n]);for(let n=0;n<e.in_connections.length;n++)this.in_connections.push(e.in_connections[n]);for(let n=e.out_connections.length;n<o.in_connections.length;n++)this.in_connections.push(o.in_connections[n]);for(let n=0;n<o.out_connections.length;n++)this.out_connections.push(o.out_connections[n])}else{for(let n=0;n<o.in_connections.length;n++)o.in(o.in_connections[n],e.out_connections[n]);for(let n=0;n<o.out_connections.length;n++)this.out_connections.push(o.out_connections[n]);for(let n=o.in_connections.length;n<e.out_connections.length;n++)this.out_connections.push(e.out_connections[n]);for(let n=0;n<e.in_connections.length;n++)this.in_connections.push(e.in_connections[n])}for(let n=0;n<this.out_connections.length;n++)this.out_connections[n]=this.out_connections[n].clone(this);return this}add(n){if(this.in_connections.length<n.out_connections.length){const t=this.in_connections.length;for(let e=0;e<t;e++)this.in(this.in_connections[e],n.out_connections[e])}else for(let t=0;t<n.out_connections.length;t++)this.in(this.in_connections[t],n.out_connections[t]);return this}in(n,t){if(t){let e=-1;for(let o=0;o<this.in_connections.length;o++)if(this.in_connections[o]===n){this.in_connections[o]=t,e=o;break}return t.inConnect({name:n,element:this,no_source:e,is_out:!1}),t}for(let t=0;t<this.in_connections.length;t++)if("string"==typeof this.in_connections[t]){if(this.in_connections[t]===n)return this.in_connections[t]}else if(this.in_connections[t].findInString(this)===n)return this.in_connections[t];return""}inIndex(n){for(let t=0;t<this.in_connections.length;t++)if("string"==typeof this.in_connections[t]){if(this.in_connections[t]===n)return t}else if(this.in_connections[t].findInString(this)===n)return t;return-1}inArray(){const n=[];for(let t=0;t<this.in_connections.length;t++)"string"==typeof this.in_connections[t]?n.push(this.in_connections[t]):n.push(this.in_connections[t].findInString(this));return n}out(n){for(let t=0;t<this.out_connections.length;t++)if(this.out_connections[t].out.name===n)return this.out_connections[t];return{}}clone(){const n=new E;for(let t=0;t<this.out_connections.length;t++)n.out_connections.push(this.out_connections[t].clone(n));for(let t=0;t<this.in_connections.length;t++)"string"==typeof this.in_connections[t]?n.in_connections.push(this.in_connections[t]):n.in_connections.push(this.in_connections[t].findInString(this));return n.state=this.state,n}isAllInConnected(){for(let n=0;n<this.in_connections.length;n++)if("string"==typeof this.in_connections[n])return!1;return!0}customStyle(){return this.style=O(C),this.style}}class j{constructor(n,t){this.style=N,"string"==typeof n&&t?(this.frequency=t,this.out_connections=[F.Connection.create({name:n,element:this,no_source:0,is_out:!0})]):(this.frequency=n,this.out_connections=[F.Connection.create({name:"",element:this,no_source:0,is_out:!0})])}out(n){return n&&n!==this.out_connections[0].out.name&&(this.out_connections[0].out.name=n),this.out_connections[0]}clone(){const n=new j(this.frequency);return n.out(this.out().out.name),n}isAllInConnected(){return!1!==this.out_connections[0].in}}class G{constructor(n){this.tree=[],this.genGraph(n)}genGraph(n){const t=new Set;this.findGenerators(n,t);const e=[];for(let n=0;n<this.tree.length;n++)this.genGraphNode(this.tree[n],e)}findGenerators(n,t){if(t.add(n),void 0!==n.in_connections){for(let e=0;e<n.in_connections.length;e++)if("string"!=typeof n.in_connections[e]){const o=n.in_connections[e].out.element;t.has(o)||this.findGenerators(o,t)}for(let e=0;e<n.out_connections.length;e++)if(n.out_connections[e].in)for(let o=0;o<n.out_connections[e].in.length;o++){const i=n.out_connections[e].in[o].element;t.has(i)||this.findGenerators(i,t)}}else this.tree.push({element:n,connection:[],out:[]});return this.tree}genGraphNode(n,t){const e=n.element;for(let o=0;o<e.out_connections.length;o++)if(e.out_connections[o].in)for(let i=0;i<e.out_connections[o].in.length;i++){const s=e.out_connections[o].in[i].element,r=t.find((n=>n.element===s));if(r)r.connection.push(e.out_connections[o]),n.out.push(r);else{const i={element:s,connection:[e.out_connections[o]],out:[]};n.out.push(i),t.push(i),this.genGraphNode(i,t)}}}findElement(n){for(let t=0;t<this.tree.length;t++){const e=this.findElementNode(n,this.tree[t]);if(e)return e}return!1}findElementNode(n,t){if(n===t.element)return t;for(let e=0;e<t.out.length;e++){const o=this.findElementNode(n,t.out[e]);if(o)return o}return!1}getElementArrayFromNodeArray(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].element);return t}getOutputs(){const n=this.getSetNodeDFS(),t=[];for(let e=0;e<n.length;e++)if(n[e].element.out_connections.length!==n[e].out.length)for(let o=0;o<n[e].element.out_connections.length;o++)n[e].element.out_connections[o].in||t.push(n[e].element.out_connections[o]);return t}getInputs(){const n=this.getSetNodeDFS(),t=[];for(let e=0;e<n.length;e++)if("in_connections"in n[e].element){const o=n[e].element.in_connections;if(o.length!==n[e].out.length)for(let i=0;i<o.length;i++)"string"==typeof o[i]&&t.push({name:o[i],element:n[e].element,no_source:e,is_out:!1})}return t}getGenerators(){return this.getElementArrayFromNodeArray(this.tree)}getAllElementsDFS(){return this.getElementArrayFromNodeArray(this.getSetNodeDFS())}getAllElementsBFS(){return this.getElementArrayFromNodeArray(this.getAllNodeBFS())}getAllNodeDFS(){const n=[];for(let t=0;t<this.tree.length;t++)this.DFSrec(this.tree[t],n);return n}DFSrec(n,t){t.push(n);for(let e=0;e<n.out.length;e++)this.DFSrec(n.out[e],t)}getConnectionsNode(n){const t=[];for(let e=0;e<n.element.out_connections.length;e++)n.element.out_connections[e].in&&t.push(n.element.out_connections[e]);return t}getAllNodeBFS(){const n=[...this.tree],t=this.getSetNodeDFS(),e=[];for(;t.length>0;)for(let o=0;o<t.length;o++)if(n.find((n=>n===t[o])))t.splice(o,1),o--;else{let i=!0;for(let e=0;e<t[o].connection.length;e++)if(!n.find((n=>n.element===t[o].connection[e].out.element))){i=!1;break}i&&(n.push(t[o]),e.push(...t[o].connection),t.splice(o,1),o--)}return n}getSetNodeDFS(){return this.getAllNodeDFS().filter(((n,t,e)=>e.indexOf(n)===t))}getDataElementGraph(){const n=this.getAllNodeBFS(),t=this.getElementArrayFromNodeArray(n),e=[];for(let o=0;o<n.length;o++){if(e.push({name:n[o].element.name?n[o].element.name:"",id:o,connections_in:[],connections_out:[]}),n[o].element.in_connections){const i=n[o].element.in_connections;for(let s=0;s<i.length;s++)"string"==typeof i[s]?e[o].connections_in.push({conn_name:i[s],id:-1}):e[o].connections_in.push({conn_name:i[s].findInString(n[o].element),id:t.indexOf(i[s].out.element)})}for(let i=0;i<n[o].element.out_connections.length;i++){const s=[];if(n[o].element.out_connections[i].in)for(let e=0;e<n[o].element.out_connections[i].in.length;e++)s.push(t.indexOf(n[o].element.out_connections[i].in[e].element));e[o].connections_out.push({conn_name:n[o].element.out_connections[i].out.name,id:s})}}const o=[];for(let n=0;n<this.tree.length;n++)this.recExportElementGraph(this.tree[n],o,t);return{elements:e,elementGraph:o}}recExportElementGraph(n,t,e){const o=e.indexOf(n.element);t.push({id:o,out:[]});for(let o=0;o<n.out.length;o++)this.recExportElementGraph(n.out[o],t[t.length-1].out,e)}}return t})()));