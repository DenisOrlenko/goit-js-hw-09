const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){console.log("start"),t.startBtn.disabled=!0,t.stopBtn.disabled=!1,o=setInterval(n,1e3)})),t.stopBtn.addEventListener("click",(function(){console.log("stop"),t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(o)}));let o=null;function n(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}
//# sourceMappingURL=01-color-switcher.8f0d9e14.js.map