"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[617],{8429:function(n,t,e){e.r(t),e.d(t,{default:function(){return C}});var r=e(9439),a=e(2791),o=e(8687),i=e(3431),s=e(7689),u=e(5993),c=e(4501),l=e(5671),d=e(3144),h=e(136),f=e(3668),p=e(1495),v=e.n(p),x=e(7753),m=e.n(x),g=(e(4420),e(3329)),b=function(n){(0,h.Z)(e,n);var t=(0,f.Z)(e);function e(){var n;(0,l.Z)(this,e);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=t.call.apply(t,[this].concat(a))).state={layoutName:"default",input:""},n.onChange=function(t){n.props.onNumberChange(t),n.setState({input:t})},n.onKeyPress=function(t){"{shift}"!==t&&"{shift2}"!==t||n.handleShift();var e=n.state.input;return"{call}"===t?(n.props.onCallBtnPress(e),void n.keyboard.clearInput()):"{save}"===t?(n.props.onSaveBtnPress(e),void n.keyboard.clearInput()):void 0},n.handleShift=function(){var t=n.state.layoutName;n.setState({layoutName:"default"===t?"shift":"default"})},n.onChangeInput=function(t){var e=t.target.value;n.props.onFilterChange(e),n.setState({input:e},(function(){n.keyboard.setInput(e)}))},n.inputStyle={width:"100%",height:"100px",padding:"10px",fontSize:20,border:0},n}return(0,d.Z)(e,[{key:"render",value:function(){var n=this;return(0,g.jsxs)("div",{children:[(0,g.jsx)("input",{readOnly:"readonly",value:this.state.input,style:this.inputStyle,placeholder:"(99) 9999-9999",onChange:function(t){return n.onChangeInput(t)}}),(0,g.jsx)(v(),{keyboardRef:function(t){return n.keyboard=t},theme:"hg-theme-default hg-layout-numeric numeric-theme",layoutName:this.state.layoutName,onChange:function(t){return n.onChange(t)},onKeyPress:function(t){return n.onKeyPress(t)},onHold:console.log,disableCaretPositioning:!0,disableButtonHold:!1,display:{"{call}":"CALL","{save}":"SAVE","{bksp}":"backspace","{shift}":"*/+","{shift2}":"123","{//}":" "},layout:{default:["{call} {save} {bksp}","1 2 3","4 5 6","7 8 9","{shift} 0 #"],shift:["{//} {//} {//}","{//} {//} {//}","{//} {//} {//}","{//} {//} {//}","* + {shift2}"]},buttonTheme:[{class:"customBtn callBtn",buttons:"{call}"},{class:"customBtn saveBtn",buttons:"{save}"},{class:"customBtn backspaceBtn",buttons:"{bksp}"}],inputMask:"(99) 9999-9999",modules:[m()]})]})}}]),e}(a.Component),j=b,y=e(8764),k=e(7113),w=e(2961),Z=e(276),C=function(){var n=(0,a.useState)(""),t=(0,r.Z)(n,2),e=t[0],l=t[1],d=(0,a.useState)(""),h=(0,r.Z)(d,2),f=h[0],p=h[1],v=(0,o.useSelector)(i.A),x=(0,s.s0)(),m=(0,Z.Jx)(),b=m.data,C=void 0===b?[]:b,S=m.error,B=void 0===S?"":S;(0,a.useEffect)((function(){p(v)}),[v]);var P=C.filter((function(n){var t=n.name,e=n.number;return t.toLowerCase().includes(f)||e.includes(f)}));return(0,g.jsx)(g.Fragment,{children:B?(0,g.jsx)(w.Z,{error:B}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(k.Z,{}),(0,g.jsx)(c.xu,{height:270,overflowY:"scroll",children:f&&(0,g.jsx)(y.Z,{contacts:P})}),(0,g.jsx)(j,{onCallBtnPress:function(){return(0,u.m)(e)},onSaveBtnPress:function(){e&&x("new",{state:{number:e}})},onNumberChange:function(n){l(n),p(n)}})]})})}},8764:function(n,t,e){e.d(t,{Z:function(){return g}});var r,a,o,i=e(168),s=e(9104),u=s.Z.li(r||(r=(0,i.Z)(["\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 4px 8px;\n  font-size: 20px;\n"]))),c=s.Z.div(a||(a=(0,i.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  width: 60px;\n  border-radius: 50%;\n  background-color: black;\n  color: white;\n  font-size: 40px;\n"]))),l=s.Z.span(o||(o=(0,i.Z)(["\n  display: block;\n  font-weight: 600;\n  font-size: 24px;\n"]))),d=e(1087),h=e(7689),f=e(2791),p=e(3329),v=function(n){var t,e=n.id,r=n.children,a=(0,f.useRef)(),o=(0,h.TH)(),i=null===(t=o.state)||void 0===t?void 0:t.id;(0,f.useEffect)((function(){a.current&&i&&i===e&&a.current.scrollIntoView({behavior:"smooth",block:"center"})}),[e,i]);var s="/"===o.pathname?"contacts/".concat(e):e.toString();return(0,p.jsx)(d.Link,{ref:a,to:s,state:{from:o,id:e},children:r})},x=function(n){var t=n.data,e=t.name,r=t.number,a=t.extraId,o=e[0].toUpperCase();return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(v,{id:a,children:(0,p.jsxs)(u,{children:[(0,p.jsx)(c,{children:(0,p.jsx)("span",{children:o})}),(0,p.jsxs)("div",{children:[(0,p.jsx)(l,{children:e}),(0,p.jsx)("span",{children:r})]})]})})})},m=e(4501),g=function(n){var t=n.contacts,e=void 0===t?[]:t;return(0,p.jsx)(m.xu,{children:(0,p.jsx)("ul",{children:e.length>0&&e.map((function(n){return(0,p.jsx)(x,{data:n},n.id)}))})})}},2961:function(n,t,e){e.d(t,{Z:function(){return o}});var r=e(4501),a=e(3329),o=function(n){var t=n.error,e="".concat(null===t||void 0===t?void 0:t.data," (status: ").concat(null===t||void 0===t?void 0:t.status,")");return(0,a.jsxs)(r.xu,{p:15,children:[(0,a.jsx)("h1",{children:"OOOPS..."}),(0,a.jsx)("h2",{children:"Something went wrong"}),(0,a.jsx)("h2",{children:"Please reload page or check URL"}),(0,a.jsxs)("p",{children:["Info: ",e]})]})}},7113:function(n,t,e){e.d(t,{Z:function(){return d}});var r,a=e(8687),o=e(3431),i=e(1634),s=e(168),u=e(9104).Z.input(r||(r=(0,s.Z)(["\n  width: 100%;\n  height: 50px;\n"]))),c=e(2791),l=e(3329);function d(){var n=(0,a.useDispatch)(),t=(0,a.useSelector)(o.A);return(0,c.useEffect)((function(){return function(){n((0,i.T)(""))}}),[n]),(0,l.jsx)(u,{value:t,name:"filter",onChange:function(t){var e=t.currentTarget.value;n((0,i.T)(e))},type:"text",placeholder:"Type to search"})}},3431:function(n,t,e){e.d(t,{A:function(){return r}});var r=function(n){return n.filter}},5993:function(n,t,e){e.d(t,{j:function(){return a},m:function(){return r}});var r=function(n){return window.location.href="tel:".concat(n)},a=function(n){return window.location.href="mailto:".concat(n)}}}]);
//# sourceMappingURL=617.c8fde157.chunk.js.map