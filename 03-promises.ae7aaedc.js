var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var l={id:e,exports:{}};return t[e]=l,o.call(l.exports,l,l.exports),l.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var l=o("iQIUW");const r={form:document.querySelector(".form"),delayEl:document.querySelector('[name="delay"]'),stepEl:document.querySelector('[name="step"]'),amountE:document.querySelector('[name="amount"]'),submitBtn:document.querySelector("button")};r.form.addEventListener("submit",(function(e){e.preventDefault(),r.submitBtn.disabled=!0,i=Number(r.delayEl.value),u=Number(r.stepEl.value),a=Number(r.amountE.value);for(let e=1;e<=a;e+=1)d(e,i).then((({position:e,delay:t})=>{l.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{l.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})).finally((()=>{setTimeout((()=>{e===a&&(r.submitBtn.disabled=!1)}),4e3)})),i+=u}));let i=null,u=null,a=null;function d(e,t){const n=Math.random()>.3;return new Promise(((o,l)=>{setTimeout((()=>{n?o({position:e,delay:t}):l({position:e,delay:t})}),t)}))}
//# sourceMappingURL=03-promises.ae7aaedc.js.map