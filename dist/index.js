!function(e,t){e&&!e.getElementById("livereloadscript")&&((t=e.createElement("script")).async=1,t.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",t.id="livereloadscript",e.getElementsByTagName("head")[0].appendChild(t))}(self.document),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).tools={})}(this,(function(e){"use strict";var t=function(e){var t=e.header,n=e.data,a=e.name,r=e.deep,o=document.createElement("div"),l=document.createElement("table");l.style.fontSize="14px",l.setAttribute("cellspacing","0"),l.setAttribute("cellspacing","0"),l.setAttribute("border","1");var c=document.createElement("thead");if(2===r){var i=document.createElement("tr"),d=document.createElement("tr");i.style.height="35px",d.style.height="35px",t.forEach((function(e){if(e.children){var t=document.createElement("td");t.innerText=e.label,t.setAttribute("colspan",e.colspan),i.appendChild(t),e.children.forEach((function(e){var t=document.createElement("td");t.innerText=e.label,e.length?t.style.width=e.length+"px":t.style.width="100px",d.appendChild(t)})),c.appendChild(i),c.appendChild(d),l.appendChild(c)}else{var n=document.createElement("td");e.length?n.style.width=e.length+"px":n.style.width="100px",n.setAttribute("colspan",1),n.setAttribute("rowspan",e.rowspan),n.innerText=e.label,i.appendChild(n)}}))}else{var s=document.createElement("tr");s.style.height="35px",t.forEach((function(e){var t=document.createElement("td");e.length?t.style.width=e.length+"px":t.style.width="100px",t.innerText=e.label,s.appendChild(t)})),c.appendChild(s),l.appendChild(c)}var u=[];t.forEach((function(e){e.children?e.children.forEach((function(e){u.push(e)})):u.push(e)}));var p=document.createElement("tbody");n.forEach((function(e,t){e.index=1+t;var n=document.createElement("tr");n.style.height="35px",u.forEach((function(t){var a;if(t.value)a="<td style=\"mso-number-format:'@'';\">".concat(t.value,"</td>");else if(/\./.test(t.key)){var r=t.key.split(".").reduce((function(e,t){return e[t]}),e);a="<td style=\"mso-number-format:'@'';\">".concat(r,"</td>")}else a="<td style=\"mso-number-format:'@'';\">".concat(e[t.key],"</td>");n.insertAdjacentHTML("beforeend",a)})),p.appendChild(n)})),l.appendChild(p),o.appendChild(l);var h=o.innerHTML,m='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body style=\'text-align:center\'>'.concat(h,"</body></html>"),f=document.createElement("a");f.setAttribute("target","_blank"),/(\.xlsx$)|(\.xls$)/.test(a)||(a+=".xlsx"),f.setAttribute("download",a),f.href="data:application/vnd.ms-excel;base64,"+function(e){return window.btoa(unescape(encodeURIComponent(e)))}(m),f.click()};function n(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}e.base64ToBlob=function(e){for(var t=e.split(","),n=t[0].match(/:(.*?);/)[1],a=atob(t[1]),r=a.length,o=new Uint8Array(r);r--;)o[r]=a.charCodeAt(r);return new Blob([o],{type:n})},e.copyToBoard=function(e){var t=document.createElement("textarea");return document.body.appendChild(t),t.value=e,t.select(),document.execCommand("copy")?(document.execCommand("copy"),document.body.removeChild(t),!0):(document.body.removeChild(t),!1)},e.debonce=function(e,t){var n;return function(){var a=this;n&&clearTimeout(n),n=setTimeout((function(){e.call(a)}),t)}},e.exportExcel=t,e.format=function(e,t){t||(t=new Date),e||(e="YYYY-MM-DD hh:mm:ss");var n=t.getFullYear(),a=(t.getMonth()+1).toString().padStart(2,"0"),r=t.getDate().toString().padStart(2,"0"),o=t.getHours().toString().padStart(2,"0"),l=t.getMinutes().toString().padStart(2,"0"),c=t.getSeconds().toString().padStart(2,"0");return e=e.replace("YYYY",n).replace("MM",a).replace("DD",r).replace("hh",o).replace("mm",l).replace("ss",c)},e.pictureGray=function(e){var t=Object.prototype.toString.call(e).slice(8,-1);if("String"!==t&&"HTMLCanvasElement"!==t)throw new Error("请传入cnavas的选择器或者是cnavas对象");if("String"===t){if(!(e=document.querySelector(e)))throw new Error("请检查选择器是否有误，或者当前DOM没有canvas节点");if("HTMLCanvasElement"!==n(e))throw new Error("当前选择器有误，请检查选择器对应的DOM节点是否是canvas")}for(var a=e.getContext("2d"),r=a.getImageData(0,0,e.width,e.height),o=r.data,l=0;l<o.length;l+=4){var c=(o[l]+o[l+1]+o[l+2])/3;o[l]=c,o[l+1]=c,o[l+2]=c}a.putImageData(r,0,0),console.log("图像灰度成功")},e.sleep=function(e){return new Promise((function(t){return setTimeout(t,e)}))},e.throttleAtonce=function(e,t){var n=0;return function(){var a=Date.now();a-n>t&&(e.call(this),n=a)}},e.throttleLatter=function(e,t){var n="";return function(){n||(n=setTimeout((function(){e.call(this),n=""}),t))}},e.type=n,Object.defineProperty(e,"__esModule",{value:!0})}));
