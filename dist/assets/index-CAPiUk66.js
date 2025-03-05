(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class C{#t={};on(t,e){this.#t[t]||(this.#t[t]=[]),this.#t[t].push(e)}emit(t,e){this.#t[t]&&this.#t[t].forEach(i=>i(e))}}class r extends C{#t;constructor(t,e){super(),this.#t=e,this.id=t,this.width=this.#t.width,this.height=this.#t.height,this.title=this.#t.title,this.content=this.#t.content,this.zIndex=this.#t.zIndex||1,this.isMinimized=e.isMinimized||!1,this.icon=e.icon||null,this.isDragging=!1,this.isResizing=!1,this.initialX=0,this.initialY=0,this.initialMouseX=0,this.initialMouseY=0,this.x=e.x||Math.min(Math.max(0,Math.random()*(window.innerWidth-this.width-100)),window.innerWidth-this.width),this.y=e.y||Math.min(Math.max(100,Math.random()*(window.innerHeight-this.height)-100),window.innerHeight-this.height),this.#e(),this.isMinimized&&this.minimize(),window.addEventListener("resize",this.handleResize.bind(this)),this.createResizeHandles()}async#e(){this.element=document.createElement("div"),this.element.className="window",this.element.style.position="fixed",this.element.style.left=`${this.x}px`,this.element.style.top=`${this.y}px`,this.element.style.width=`${this.width}px`,this.element.style.height=`${this.height}px`,this.element.style.overflow="hidden",this.element.style.display="flex",this.element.style.flexDirection="column",this.titleBar=document.createElement("div"),this.titleBar.className="window-title-bar title-bar",this.titleBar.style.cursor="move",this.titleBar.style.userSelect="none",this.titleBar.style.display="flex",this.titleBar.style.justifyContent="space-between",this.titleBar.style.padding="5px 8px",this.titleBar.style.alignItems="center",this.titleBar.style.flexShrink="0",this.titleText=document.createElement("div"),this.titleText.className="window-title-bar-text title-bar-text",this.titleText.textContent=this.title,this.titleText.style.fontSize=this.#t.styles.titlebar_fontsize||"12px",this.titleBar.appendChild(this.titleText);const t=document.createElement("div");t.className="title-bar-controls",t.style.display="flex",this.minimizeButton=document.createElement("button"),this.minimizeButton.className="window-minimize-button",this.minimizeButton.ariaLabel="Minimize",this.minimizeButton.onclick=e=>{e.stopPropagation(),this.toggleMinimize()},t.appendChild(this.minimizeButton),this.closeButton=document.createElement("button"),this.closeButton.className="window-close-button",this.closeButton.ariaLabel="Close",this.closeButton.onclick=e=>{e.stopPropagation(),this.emit("close",this)},t.appendChild(this.closeButton),this.titleBar.appendChild(t),this.contentArea=document.createElement("div"),this.contentArea.className="window-content window-body",this.contentArea.innerHTML=this.content,this.contentArea.style.overflow="auto",this.contentArea.style.flexGrow="1",this.contentArea.style.position="relative",this.contentArea.style.padding="10px",this.titleBar.onmousedown=e=>{e.preventDefault(),this.startDrag(e)},this.element.appendChild(this.titleBar),this.element.appendChild(this.contentArea),this.element.onclick=()=>this.emit("focus",this),this.#t?.initialURL&&await this.fetchWindowContents(this.#t.initialURL)}getConfig(){return{...this.#t}}createResizeHandles(){[{cursor:"nwse-resize",position:"top-left",dx:-1,dy:-1},{cursor:"nesw-resize",position:"top-right",dx:1,dy:-1},{cursor:"nesw-resize",position:"bottom-left",dx:-1,dy:1},{cursor:"nwse-resize",position:"bottom-right",dx:1,dy:1}].forEach(e=>{const i=document.createElement("div");switch(i.className=`resize-handle resize-${e.position}`,i.style.cssText=`
        position: absolute;
        background: transparent;
        z-index: 10;
        cursor: ${e.cursor};
      `,e.position){case"top-left":i.style.top="-5px",i.style.left="-5px",i.style.width="15px",i.style.height="15px";break;case"top-right":i.style.top="-5px",i.style.right="-5px",i.style.width="15px",i.style.height="15px";break;case"bottom-left":i.style.bottom="-5px",i.style.left="-5px",i.style.width="15px",i.style.height="15px";break;case"bottom-right":i.style.bottom="-5px",i.style.right="-5px",i.style.width="15px",i.style.height="15px";break}i.addEventListener("mousedown",s=>this.startResize(s,e.dx,e.dy)),this.element.appendChild(i)})}handleResize(){const t=Math.max(0,window.innerWidth-this.width),e=Math.max(0,window.innerHeight-this.height);this.x=Math.min(this.x,t),this.y=Math.min(this.y,e),this.updatePosition()}startDrag(t){this.isDragging=!0,this.initialX=this.x,this.initialY=this.y,this.initialMouseX=t.clientX,this.initialMouseY=t.clientY,this.emit("dragStart",this)}drag(t){if(!this.isDragging)return;const e=t.clientX-this.initialMouseX,i=t.clientY-this.initialMouseY;let s=this.initialX+e,n=this.initialY+i;s=Math.max(0,Math.min(s,window.innerWidth-this.width)),n=Math.max(0,Math.min(n,window.innerHeight-this.height)),this.x=s,this.y=n,this.updatePosition(),this.emit("drag",this)}dragEnd(){this.isDragging&&(this.isDragging=!1,this.emit("dragEnd",this))}toggleMinimize(){this.isMinimized?this.restore():this.minimize(),this.emit("minimize",this)}minimize(){this.isMinimized=!0,this.element.style.display="none"}restore(){this.isMinimized=!1,this.element.style.display="block"}updatePosition(){this.element.style.left=`${this.x}px`,this.element.style.top=`${this.y}px`}setZIndex(t){this.zIndex=t,this.element.style.zIndex=t}getState(){return{width:this.width,height:this.height,x:this.x,y:this.y,zIndex:this.zIndex,isMinimized:this.isMinimized,icon:this.icon,title:this.title,content:this.content,styles:this.#t.styles,events:this.#t.events}}destroy(){this.element.remove()}startResize(t,e,i){t.stopPropagation(),t.preventDefault(),this.isResizing=!0,this.initialWidth=this.width,this.initialHeight=this.height,this.initialX=this.x,this.initialY=this.y,this.initialMouseX=t.clientX,this.initialMouseY=t.clientY,this.resizeDirX=e,this.resizeDirY=i,document.addEventListener("mousemove",this.resize.bind(this)),document.addEventListener("mouseup",this.endResize.bind(this))}resize(t){if(!this.isResizing)return;const e=t.clientX-this.initialMouseX,i=t.clientY-this.initialMouseY;let s=this.initialWidth,n=this.initialHeight,o=this.x,a=this.y;this.resizeDirX!==0&&(s=Math.max(200,this.initialWidth+e*this.resizeDirX),this.resizeDirX<0&&(o=this.initialX+(this.initialWidth-s))),this.resizeDirY!==0&&(n=Math.max(100,this.initialHeight+i*this.resizeDirY),this.resizeDirY<0&&(a=this.initialY+(this.initialHeight-n))),o=Math.max(0,Math.min(o,window.innerWidth-s)),a=Math.max(0,Math.min(a,window.innerHeight-n)),this.width=s,this.height=n,this.x=o,this.y=a,this.element.style.width=`${this.width}px`,this.element.style.height=`${this.height}px`,this.updatePosition()}endResize(){this.isResizing&&(this.isResizing=!1,this.emit("resize",this))}static parseMessageContent(t){const e=[];let i=0;const s=/```([\s\S]*?)```/g;let n;for(;(n=s.exec(t))!==null;)n.index>i&&e.push({type:"text",content:t.slice(i,n.index)}),e.push({type:"code",content:n[1].trim()}),i=n.index+n[0].length;return i<t.length&&e.push({type:"text",content:t.slice(i)}),e}async handleScripts(t,e){const i=[];for(const s of t){s.src===""&&i.push(s);try{const n=await fetch(s.src),o=document.createElement("script");o.textContent=await n.text(),i.push(o)}catch(n){console.error("Failed to load external script:",n)}}i.forEach(s=>e.appendChild(s))}async handleStyles(t,e){const i=[];for(const s of t)try{const n=await fetch(s.href),o=document.createElement("style");o.textContent=await n.text(),i.push(o)}catch(n){console.error("Failed to load external stylesheet:",n)}i.forEach(s=>e.appendChild(s))}async fetchWindowContents(t){const e=this.title,i=this.content;this.title="Loading...",this.titleText.textContent=this.title;const s=document.createElement("div");s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center",s.style.height="100%",s.style.width="100%";const n=document.createElement("div"),o=document.createElement("span");n.className="progress-indicator",n.style.width="80%",n.style.maxWidth="400px",o.className="progress-indicator-bar",o.style.width="0%",n.appendChild(o),s.appendChild(n),this.contentArea.innerHTML="",this.contentArea.appendChild(s);const a=l=>new Promise(h=>{requestAnimationFrame(()=>{o.style.width=`${l}%`,setTimeout(h,50)})});try{await a(20);const l=await fetch(t);if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);await a(40);const h=await l.text(),c=new DOMParser().parseFromString(h,"text/html");await a(60),this.title=c.querySelector("title")?.textContent||e,this.titleText.textContent=this.title,this.changeTaskbarTitle(this.title);const p=c.querySelector("body");let m=document.createElement("div");p&&Array.from(p.childNodes).forEach(b=>{m.appendChild(b.cloneNode(!0))}),await a(75);const f=Array.from(c.querySelectorAll("script")),w=Array.from(c.querySelectorAll("link"));await this.handleScripts(f,m),await a(85),await this.handleStyles(w,m),await a(95),this.contentArea.innerHTML="",this.contentArea.innerHTML=m.innerHTML,await a(100)}catch(l){console.error("Failed to fetch window contents:",l),this.title=e,this.contentArea.innerHTML=i}}exportIconConfig(){this.emit("exportIconConfig",this)}changeTaskbarTitle(t){this.emit("changeTaskbarTitle",{id:this.id,title:this.title})}}class v extends r{constructor(t,e){e.title=`Chat - ${e.channel}`,e.content='<div class="chat-container"></div>',super(t,e),this.username=e.username||this.getUsername(),this.channel=e.channel||"general",this.messages=this.loadCachedMessages()||[],this.setupChatUI(),this.connectWebSocket(),setTimeout(()=>{for(const i of this.messages)i.type==="message"&&this.displayMessage(i)},250),this.senderColor=e.senderColor||localStorage.getItem("senderColor")||"#e3f2fd",this.receiverColor=e.receiverColor||localStorage.getItem("receiverColor")||"#f5f5f5",this.addColorPickers()}loadCachedMessages(){const t=`chat-messages-${this.channel}`,e=localStorage.getItem(t);return e?JSON.parse(e):null}saveCachedMessages(){const t=this.messages.filter(i=>i.type==="message"&&i.username!=="System"),e=`chat-messages-${this.channel}`;localStorage.setItem(e,JSON.stringify(t.slice(-50)))}addColorPickers(){const t=document.createElement("div");t.className="chat-controls",t.innerHTML=`
      <div class="color-pickers">
        <div class="picker-group">
          <label>Your messages:</label>
          <input type="color" id="sender-color" value="${this.senderColor}">
        </div>
        <div class="picker-group">
          <label>Others' messages:</label>
          <input type="color" id="receiver-color" value="${this.receiverColor}">
        </div>
      </div>
    `,this.contentArea.querySelector(".chat-container").prepend(t);const i=t.querySelector("#sender-color"),s=t.querySelector("#receiver-color");i.addEventListener("change",n=>{this.senderColor=n.target.value,localStorage.setItem("senderColor",this.senderColor),this.updateMessageColors()}),s.addEventListener("change",n=>{this.receiverColor=n.target.value,localStorage.setItem("receiverColor",this.receiverColor),this.updateMessageColors()})}updateMessageColors(){this.contentArea.querySelectorAll(".chat-message").forEach(e=>{e.classList.contains("chat-message")&&(e.classList.contains("sent")?e.style.backgroundColor=this.senderColor:e.classList.contains("received")?e.style.backgroundColor=this.receiverColor:e.style.backgroundColor="#f9f9f9")})}updateMessageUsername(t,e){if(!t||!e||t===e)return;localStorage.setItem("chat-username",e),this.messages.forEach(s=>{s.username===t&&(s.username=e)}),this.saveCachedMessages(),this.contentArea.querySelectorAll(".chat-message").forEach(s=>{if(!s.classList.contains("chat-message"))return;const n=s.querySelector(".message-sender");n.textContent===t&&(n.textContent=e)})}setupChatUI(){const t=this.element.querySelector(".chat-container");t.style.cssText=`
      display: flex;
      flex-direction: column;
      max-height: 600px;
      max-width: 100%;
      width:100%;
      overflow-y: auto;
      overflow-x: hidden;
    `,this.messageContainer=document.createElement("div"),this.messageContainer.style.cssText=`
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px;
      background: #f9f9f9;
      margin-bottom: 10px;
      max-height: 350px;
      max-width: 300px;
    `,t.appendChild(this.messageContainer);const e=document.createElement("div");e.style.cssText=`
      flex: 1;
      padding: 10px;
      border-top: 1px solid #ddd;
      background: white;
    `,this.messageInput=document.createElement("textarea"),this.messageInput.style.cssText=`
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
      margin-bottom: 8px;
      max-height: 300px;
      max-width: 250px;
      width: 100%;
    `,this.messageInput.placeholder="Type your message...",this.messageInput.rows=3;const i=document.createElement("button");i.textContent="Send",i.style.cssText=`
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 0rem;
    `,i.onclick=()=>this.sendMessage(),this.messageInput.onkeydown=o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),this.sendMessage())},e.appendChild(this.messageInput),e.appendChild(i),t.appendChild(e);const s=document.createElement("button");s.textContent="😊",s.style.cssText=`
      padding: 8px 16px;
      margin-right: 8px;
      margin-bottpm: 10px;
      background: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    `,s.onclick=()=>this.emit("toggleEmojis",this),e.insertBefore(s,e.lastChild);const n=document.createElement("button");n.textContent="New name",n.style.cssText=`
      padding: 8px 16px;
      margin-right: 8px;
      margin-bottpm: 10px;
      background: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    `,n.onclick=()=>this.changeUsername(),e.insertBefore(n,e.lastChild),this.messageInput=e.querySelector("textarea"),t.scrollTop=t.scrollHeight}parseMessageContent(t){const e=[];let i=0;const s=/```([\s\S]*?)```/g;let n;for(;(n=s.exec(t))!==null;)n.index>i&&e.push({type:"text",content:t.slice(i,n.index)}),e.push({type:"code",content:n[1].trim()}),i=n.index+n[0].length;return i<t.length&&e.push({type:"text",content:t.slice(i)}),e}displayMessage(t){const e=document.createElement("div");let i="#f9f9f9";t.username===this.username?i=this.senderColor:t.username==="System"&&t.username==="The Server"&&(i="#f9f9f9"),e.style.cssText=`
      margin-bottom: 10px;
      padding: 8px;
      border-radius: 4px;
      background: ${i};
      border: 1px solid #ddd;
    `;const s=document.createElement("div");s.className="message-sender",s.style.cssText=`
      padding: 4px 8px;
      max-width: 180px;
      overflow-x: hidden;
      font-weight: bold;
      margin-bottom: 4px;
      color: #666;
    `,s.textContent=t.username,e.appendChild(s);const n=document.createElement("div");this.parseMessageContent(t.data).forEach(l=>{const h=document.createElement("div");l.type==="code"?h.style.cssText=`
          font-family: 'Fira Code', monospace;
          font-size: 0.95em;
          line-height: 1.4;
          white-space: pre-wrap;
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 12px;
          border-radius: 6px;
          margin: 8px 0;
          border-left: 4px solid #007acc;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          tab-size: 2;
          -moz-tab-size: 2;
        `:h.style.cssText=`
          margin: 4px 0;
          line-height: 1.5;
          max-width: 215px;
          overflow-x: hidden;
          overflow-wrap: break-word;
        `,h.textContent=l.content,n.appendChild(h)}),e.className="chat-message",t.username===this.getUsername()?e.classList.add("sent"):t.username==="System"||t.username==="The Server"?e.classList.add("system"):e.classList.add("received"),e.appendChild(n),this.messageContainer.appendChild(e),this.messageContainer.scrollTop=this.messageContainer.scrollHeight;const a=this.element.querySelector(".chat-container");a.scrollTop=a.scrollHeight}initEmojiSelector(){if(!this.emojiSelector)return;const t=this.element.getBoundingClientRect();this.emojiSelector.x=t.right+10,this.emojiSelector.y=t.top,this.emojiSelector.on("emojiSelected",({emoji:e})=>{const i=this.messageInput,s=i.selectionStart,n=i.selectionEnd,o=i.value;i.value=o.substring(0,s)+e+o.substring(n),i.focus(),i.selectionStart=i.selectionEnd=s+e.length}),this.emojiSelector.handleResize()}connectWebSocket(){this.ws=new WebSocket(""),this.ws.onopen=()=>{this.addSystemMessage("Connecting to chat server")},this.ws.onmessage=t=>{const e=JSON.parse(t.data);e.type!=="heartbeat"&&this.addMessage(e)},this.ws.onclose=()=>{this.addSystemMessage("Disconnected from chat server"),setTimeout(()=>this.connectWebSocket(),5e3)}}addMessage(t){this.messages.push(t),this.messages.length>50&&this.messages.shift(),t.type==="message"&&t.username!=="System"&&this.saveCachedMessages(),this.displayMessage(t)}addSystemMessage(t){const e={type:"system",data:t,username:"System"};this.addMessage(e)}sendMessage(){this.ws.readyState!==WebSocket.OPEN&&setTimeout(()=>this.connectWebSocket(),3e3);const t=this.messageInput.value.trim();if(!t)return;const e={type:"message",data:t,username:this.username,channel:this.channel,key:""};this.ws.send(JSON.stringify(e)),this.messageInput.value=""}changeChannel(t){this.channel=t,this.messages=this.loadCachedMessages()||[],this.setupChatUI(),this.addSystemMessage(`Switched to channel: ${t}`),this.connectWebSocket(),setTimeout(()=>{for(const e of this.messages)e.type==="message"&&this.displayMessage(e)},500)}destroy(){this.ws&&this.ws.close();const t=this.username,e=localStorage.getItem("chat-username");e&&t!==e&&(console.log(`name changed from ${t} to ${e}`),this.updateMessageUsername(t,e)),super.destroy()}getUsername(){let t=this.username;return t||(t=localStorage.getItem("chat-username")),t||(t=prompt("Please enter your username:"),t||(t="Anonymous-"+Math.floor(Math.random()*1e3)),localStorage.setItem("chat-username",t)),this.username=t,t}changeUsername(){const t=this.username,e=prompt("Enter new username:");return e&&e!==t&&this.updateMessageUsername(t,e),this.username=e,e}}class g extends r{constructor(t,e){super(t,e),this.categories={Smileys:["😀","😃","😄","😁","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘"],Gestures:["👍","👎","👌","✌️","🤞","🤜","🤛","👏","🙌","👐","🤲","🤝","🙏"],Heart:["❤️","🧡","💛","💚","💙","💜","🤎","🖤","🤍","💔","❣️","💕","💞","💓","💗","💖"],Animals:["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸"],Food:["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥"]},this.setupUI()}setupUI(){this.element.style.overflowY="hidden",this.contentArea.style.overflowY="hidden";const t=document.createElement("div");t.style.cssText=`
      padding: 10px;
      height: 100%;
      overflow-y: auto;
    `;const e=document.createElement("div");e.style.cssText=`
      position: sticky;
      top: 0;
      background: white;
      padding: 5px 0;
      margin-bottom: 10px;
      z-index: 1;
    `;const i=document.createElement("input");i.type="text",i.placeholder="Search emojis...",i.style.cssText=`
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
      max-width: 325px;
    `,e.appendChild(i),t.appendChild(e),Object.entries(this.categories).forEach(([s,n])=>{const o=document.createElement("div");o.className="emoji-category",o.style.marginBottom="20px";const a=document.createElement("h3");a.textContent=s,a.style.cssText=`
        margin: 0 0 10px 0;
        color: #666;
        font-size: 14px;
      `;const l=document.createElement("div");l.style.cssText=`
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 5px;
      `,n.forEach(h=>{const c=document.createElement("button");c.textContent=h,c.style.cssText=`
          font-size: 20px;
          padding: 5px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: background-color 0.2s;

          &:hover {
            background-color: #f0f0f0;
          }
        `,c.onclick=()=>{this.emit("emojiSelected",{emoji:h})},l.appendChild(c)}),o.appendChild(a),o.appendChild(l),t.appendChild(o),i.focus()}),i.oninput=s=>{const n=s.target.value.toLowerCase();t.querySelectorAll(".emoji-category").forEach(a=>{const l=a.querySelectorAll("button");let h=!1;l.forEach(c=>{const p=c.textContent.toLowerCase().includes(n);c.style.display=p?"block":"none",p&&(h=!0)}),a.style.display=h?"block":"none"})},this.contentArea.appendChild(t)}}class k{constructor(){this.listeners={}}on(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}emit(t,e){this.listeners[t]&&this.listeners[t].forEach(i=>i(e))}}class S extends k{#t=null;#e=0;#s=0;#i=!1;#n=null;#o=null;constructor({onComplete:t=null,onReset:e=null,format:i="seconds"}={}){super(),this.#n=t,this.#o=e,this.format=i}start(t){if(!t||t<=0)throw new Error("Duration must be a positive number");if(this.#t!==null)throw new Error("Timer is already running");this.#s=t*1e3,this.#e=this.#s,this.#i=!1,this.#a()}stop(){this.#t&&(clearInterval(this.#t),this.#t=null),this.#e=0,this.#i=!1}reset(t=!1){const e=this.isRunning();this.#t&&(clearInterval(this.#t),this.#t=null),this.#e=this.#s,this.#i=!1,this.#o&&this.#o(this.#s/1e3),(t||e)&&this.#a()}pause(){this.#t&&!this.#i&&(clearInterval(this.#t),this.#t=null,this.#i=!0)}resume(){this.#i&&(this.#i=!1,this.#a())}getTimeRemaining(){return Math.ceil(this.#e/1e3)}getInitialDuration(){return this.#s/1e3}isRunning(){return this.#t!==null&&!this.#i}#a(){this.#t=setInterval(()=>{if(!this.#i){this.#e=Math.max(0,this.#e-100);const t=Math.ceil(this.#e/1e3);this.emit("tick",t),this.#e<=0&&(this.stop(),this.#n&&this.#n())}},100)}}class y extends r{constructor(t,e){super(t,e),this.timer=new S({onComplete:()=>{this.element.style.transition="opacity 0.5s ease-out",this.element.style.opacity="0",setTimeout(()=>this.emit("close",this),500)},format:"seconds"}),this.timer.on("tick",a=>this.updateTitleBarDisplay(a));const i=document.createElement("div");i.style.cssText=`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      text-align: center;
      background: linear-gradient(to bottom, #ffffff, #f7f7f7);
    `;const s=document.createElement("div");s.style.cssText=`
      font-size: 3em;
      margin-bottom: 10px;
    `,s.textContent=this.getAppropriateIcon(content.type);const n=document.createElement("div");n.style.cssText=`
      font-size: 1.25em;
      font-weight: bold;
      color: #374151;
      margin-bottom: 10px;
      line-height: 1.5;
    `,n.innerHTML=this.content,i.appendChild(s),i.appendChild(n),this.contentArea.appendChild(i),this.element.appendChild(this.contentArea),this.timer.start(15)}getAppropriateIcon(t){return t.toLowerCase()==="win"?"🏆":t.toLowerCase()==="time"?"⏰":t.toLowerCase()==="star"?"🌟":t.toLowerCase()==="warning"?"⚠️":"ℹ️"}updateTitleBarDisplay(t){this.titletextdiv=this.titleBar.getElementsByClassName("window-title-bar-text")[0],this.titletextdiv.textContent=`Closing in ${t}s`}}class T{constructor(t,e,i,s){t=t||"",e=e||"imagees/0.png",i=i||"images/0.png",this.element=document.createElement("div"),this.element.className="desktop-icon",this.image=document.createElement("img"),this.image.src=e,this.image.alt=t,this.label=document.createElement("span"),this.label.textContent=t,this.element.appendChild(this.image),this.element.appendChild(this.label),s&&this.element.addEventListener("dblclick",s),this.element.style.cssText=`
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80px;
      cursor: pointer;
      padding: 8px;
    `,this.element.addEventListener("mouseenter",()=>{this.image.src=i}),this.element.addEventListener("mouseleave",()=>{this.image.src=e}),this.image.style.cssText=`
      width: 60px;
      height: 60px;
      margin-bottom: 4px;
      border-radius: 4px;
      this.transition: all 0.5s;
    `,this.label.style.cssText=`
      color: white;
      text-align: center;
      font-size: 13px;
      text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      word-wrap: break-word;
      max-width: 76px;
    `}setPosition(t,e){this.element.style.left=`${t}px`,this.element.style.top=`${e}px`}}class x extends r{constructor(t,e){if(super(t,{...e,title:e.title||"Win98 Music Player",width:e.width||350,height:e.height||300}),this.tracks=[],this.currentTrackIndex=e.currentTrackIndex||0,this.isPlaying=!1,this.audio=new Audio,this.audio.addEventListener("ended",()=>this.next()),this.initializePlayer(),e.tracks)for(const i of e.tracks)this.addTrack(i.title,i.url)}initializePlayer(){this.contentArea.innerHTML="",this.contentArea.style.padding="10px",this.contentArea.style.display="flex",this.contentArea.style.flexDirection="column",this.contentArea.style.gap="10px",this.createNowPlaying(),this.createControls(),this.createPlaylist(),this.createVolumeControl(),this.updateNowPlaying()}createNowPlaying(){const t=document.createElement("div");t.className="field-row",t.style.padding="5px",t.style.marginBottom="10px";const e=document.createElement("label");e.textContent="Now Playing:",e.style.marginRight="10px",this.nowPlayingText=document.createElement("div"),this.nowPlayingText.style.whiteSpace="nowrap",this.nowPlayingText.style.overflow="hidden",this.nowPlayingText.style.textOverflow="ellipsis",this.nowPlayingText.style.minWidth="0",this.nowPlayingText.style.flexGrow="1",this.nowPlayingText.style.display="inline-block",this.nowPlayingText.style.padding="5px",this.nowPlayingText.style.border="inset 2px",this.nowPlayingText.style.backgroundColor="white",this.nowPlayingText.textContent="No track selected",t.appendChild(e),t.appendChild(this.nowPlayingText),this.contentArea.appendChild(t)}createControls(){const t=document.createElement("div");t.className="field-row",t.style.justifyContent="center",t.style.gap="10px",this.prevButton=document.createElement("button"),this.prevButton.innerHTML="&#9668;&#9668;",this.prevButton.onclick=()=>this.previous(),this.playButton=document.createElement("button"),this.playButton.innerHTML="&#9658;",this.playButton.onclick=()=>this.togglePlay(),this.stopButton=document.createElement("button"),this.stopButton.innerHTML="&#9632;",this.stopButton.onclick=()=>this.stop(),this.nextButton=document.createElement("button"),this.nextButton.innerHTML="&#9658;&#9658;",this.nextButton.onclick=()=>this.next(),t.appendChild(this.prevButton),t.appendChild(this.playButton),t.appendChild(this.stopButton),t.appendChild(this.nextButton),this.contentArea.appendChild(t),this.createProgressBar()}createProgressBar(){const t=document.createElement("div");t.style.padding="5px",t.style.marginTop="5px",this.progressBar=document.createElement("div"),this.progressBar.className="progress-indicator",this.progressBar.style.width="100%",this.progressBar.style.height="15px",this.progressBarFill=document.createElement("span"),this.progressBarFill.className="progress-indicator-bar",this.progressBarFill.style.width="0%",this.progressBar.appendChild(this.progressBarFill),t.appendChild(this.progressBar),this.contentArea.appendChild(t),this.audio.addEventListener("timeupdate",()=>{const e=this.audio.currentTime/this.audio.duration*100;this.progressBarFill.style.width=`${e}%`}),this.progressBar.addEventListener("click",e=>{const i=this.progressBar.getBoundingClientRect(),s=(e.clientX-i.left)/i.width;this.audio.currentTime=this.audio.duration*s})}createVolumeControl(){const t=document.createElement("div");t.className="field-row",t.style.padding="5px",t.style.alignItems="center";const e=document.createElement("label");e.textContent="Volume:",e.style.marginRight="10px";const i=document.createElement("input");i.type="range",i.min="0",i.max="100",i.value="80",i.style.flexGrow="1",i.addEventListener("input",()=>{this.audio.volume=parseInt(i.value)/100}),this.audio.volume=.8,t.appendChild(e),t.appendChild(i),this.contentArea.appendChild(t)}createPlaylist(){const t=document.createElement("div");t.style.flexGrow="1",t.style.overflow="auto",t.style.border="inset 2px",t.style.backgroundColor="white",t.style.padding="5px",t.style.minHeight="80px",this.playlistElement=document.createElement("ul"),this.playlistElement.style.listStyleType="none",this.playlistElement.style.padding="0",this.playlistElement.style.margin="0",t.appendChild(this.playlistElement),this.contentArea.appendChild(t)}addTrack(t,e){const i={title:t,url:e};this.tracks.push(i);const s=document.createElement("li");s.style.padding="5px",s.style.cursor="pointer",s.textContent=t,this.tracks.length-1===this.currentTrackIndex&&(s.style.backgroundColor="#0000AA",s.style.color="white"),s.addEventListener("click",()=>{this.currentTrackIndex=this.tracks.indexOf(i),this.loadTrack(),this.play(),this.updatePlaylist()}),this.playlistElement.appendChild(s),this.tracks.length===1&&this.loadTrack()}updatePlaylist(){this.playlistElement.querySelectorAll("li").forEach((e,i)=>{i===this.currentTrackIndex?(e.style.backgroundColor="#0000AA",e.style.color="white"):(e.style.backgroundColor="",e.style.color="")})}updateNowPlaying(){if(this.tracks.length===0){this.nowPlayingText.textContent="No track selected";return}const t=this.tracks[this.currentTrackIndex];this.nowPlayingText.textContent=this.isPlaying?`▶ ${t.title}`:`${t.title}`}loadTrack(){if(this.tracks.length===0)return;const t=this.tracks[this.currentTrackIndex];this.audio.src=t.url,this.audio.load(),this.updateNowPlaying()}play(){this.audio.src||this.loadTrack(),this.audio.play(),this.isPlaying=!0,this.playButton.innerHTML="&#10074;&#10074;",this.updateNowPlaying()}pause(){this.audio.pause(),this.isPlaying=!1,this.playButton.innerHTML="&#9658;",this.updateNowPlaying()}togglePlay(){this.isPlaying?this.pause():this.play()}stop(){this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1,this.playButton.innerHTML="&#9658;",this.updateNowPlaying()}next(){this.tracks.length!==0&&(this.currentTrackIndex=(this.currentTrackIndex+1)%this.tracks.length,this.loadTrack(),this.updatePlaylist(),this.isPlaying&&this.play())}previous(){this.tracks.length!==0&&(this.currentTrackIndex=(this.currentTrackIndex-1+this.tracks.length)%this.tracks.length,this.loadTrack(),this.updatePlaylist(),this.isPlaying&&this.play())}destroy(){this.audio.pause(),this.audio.src="",super.destroy()}}class E{constructor(){this.windows=new Map,this.icons=new Map,this.zIndexBase=1e3,this.username="Anonymous-"+Math.floor(Math.random()*1e3),this.background_color="#FAF9F6",this.taskbar_background_color="#c0c0c0",this.taskbar_text_color="#fff",this.windowTypes=new Map([[r.name,{width:600,height:400,icon:"",title:"Window",content:"",styles:{},events:{},savedstate:{}}],[v.name,{width:600,height:400,icon:"",title:"Chat",channel:"general",username:"Anonymous",content:"",styles:{},events:{toggleEmojis:()=>this.toggleEmojis(window),usernameChanged:i=>{this.username=i}},savedstate:{}}],[y.name,{width:300,height:200,icon:"",title:"Popup",content:"",styles:{},events:{},savedstate:{}}],[g.name,{width:300,height:400,icon:"",title:"Emojis",content:"",styles:{},events:{},savedstate:{}}]]);const t=document.createElement("link");t.href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap",t.rel="stylesheet",document.head.appendChild(t),this.environment=document.createElement("div"),this.environment.id="window-environment",this.environment.style.cssText=`
      height: 100vh;
      width: 100vw;
      overflow-x: hidden;
      overflow-y: hidden;
      background-color: ${this.background_color};
      background-image: url('images/bg.png');
      background-size: cover;
      `,this.taskbar=document.createElement("div"),this.taskbar.id="taskbar",this.taskbar.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      max-width: 100vw;
      display: flex;
      min-height: 30px;
      align-items: center;
      padding: 0 10px;
      z-index: 9999;
      background-color: ${this.taskbar_background_color};
      color: ${this.taskbar_text_color};
      overflow: hidden;
      cursor: default;
      `,this.iconContainer=document.createElement("div"),this.iconContainer.id="icon-container",this.iconContainer.style.cssText=`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 40px);
      z-index: ${this.zIndexBase-1};
      pointer-events: auto;
    `,this.environment.appendChild(this.iconContainer),this.addDefaultTaskbarIcons(),this.addDefaultIcons(),this.createScrollButtons(),this.notificationContainer=document.createElement("div"),this.notificationContainer.id="notification-container",this.notificationContainer.style.display="flex",this.notificationContainer.style.overflowX="hidden",this.notificationContainer.style.flexGrow=1,this.notificationContainer.style.height="25px",this.notificationContainer.style.minWidth="2px",this.notificationContainer.style.maxWidth="20vw",this.notificationContainer.style.boxShadow="rgb(255, 255, 255) -1px -1px inset, rgb(0, 0, 0) 1px 1px inset, rgb(128, 128, 128) -2px -2px inset, rgb(223, 223, 223) 2px 2px inset",this.notificationContainer.style.padding="2px 5px",this.notificationContainer.style.justifyContent="end",this.notificationContainer.style.marginLeft="auto",this.notificationContainer.style.alignItems="center",this.datetime=new Date;const e=document.createElement("div");e.textContent=this.datetime.toLocaleTimeString(),e.style.fontSize="14px",e.style.color="rgb(0, 0, 0)",e.style.fontFamily='"Pixelated MS Sans Serif", Arial',e.style.whiteSpace="nowrap",e.style.overflow="hidden",e.style.textOverflow="ellipsis",this.notificationContainer.appendChild(e),this.taskbar.appendChild(this.notificationContainer),setInterval(()=>{this.datetime.setSeconds(this.datetime.getSeconds()+1),e.textContent=this.datetime.toLocaleTimeString()},1e3),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.saveState=this.saveState.bind(this),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp),window.addEventListener("beforeunload",this.saveState),document.body.appendChild(this.environment),this.environment.appendChild(this.taskbar)}createScrollButtons(){this.leftScrollButton=document.createElement("button"),this.leftScrollButton.innerHTML="&#10094;",this.leftScrollButton.style.cssText=`
      left: 0;
      top: 0;
      bottom: 0;
      min-width: 20px;
      background: ${this.taskbar_background_color};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      margin-left: auto;
      margin-right: 5px;
    `,this.leftScrollButton.addEventListener("click",()=>this.scroll(-200)),this.taskbar.appendChild(this.leftScrollButton),this.taskbarScrollContainer=document.createElement("div"),this.taskbarScrollContainer.id="taskbar-scroll-container",this.taskbarScrollContainer.style.display="flex",this.taskbarScrollContainer.style.overflowX="hidden",this.taskbarScrollContainer.style.flexGrow=1,this.taskbarScrollContainer.style.height="25px",this.taskbarScrollContainer.style.minWidth="0",this.taskbarScrollContainer.style.maxWidth="40vw",this.taskbarScrollContainer.style.boxShadow="rgb(255, 255, 255) -1px -1px inset, rgb(0, 0, 0) 1px 1px inset, rgb(128, 128, 128) -2px -2px inset, rgb(223, 223, 223) 2px 2px inset",this.taskbarScrollContainer.style.alignItems="center",this.taskbarScrollContainer.style.padding="2px 5px",this.taskbar.appendChild(this.taskbarScrollContainer),this.rightScrollButton=document.createElement("button"),this.rightScrollButton.innerHTML="&#10095;",this.rightScrollButton.style.cssText=`
      right: 0;
      top: 0;
      bottom: 0;
      width: 12px;
      min-width: 12px;
      background: ${this.taskbar_background_color};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      margin-left: 5px;
      margin-right: auto;
    `,this.rightScrollButton.addEventListener("click",()=>this.scroll(200)),this.taskbar.appendChild(this.rightScrollButton),this.updateScrollButtons()}scroll(t){this.taskbarScrollContainer.scrollBy({left:t,behavior:"smooth"}),setTimeout(()=>this.updateScrollButtons(),50)}updateScrollButtons(){const t=this.taskbarScrollContainer,e=t.scrollLeft,i=t.scrollWidth,s=t.clientWidth;this.leftScrollButton.style.opacity=e>0?1:0,this.rightScrollButton.style.opacity=i>s&&e+s<i?1:0}addDefaultTaskbarIcons(){const t=this.createTaskbarIcon("Welcome",r,{height:780,width:730,icon:null,title:"Welcome!",content:"<p>This is a test</p>",initialURL:"/welcome"});this.taskbar.appendChild(t);const e=this.createTaskbarIcon("Projects",r,{height:780,width:730,icon:null,title:"Projects!",content:"<p>Projects</p>",initialURL:"/projects"});this.taskbar.appendChild(e);const i=this.createTaskbarIcon("Contact",r,null);this.taskbar.appendChild(i);const s=this.createTaskbarIcon("Source",r,null);this.taskbar.appendChild(s)}addIcon(t){console.log("Adding icon:",t.title);const e=new T(t.title,t.image,t.onhover,t.clickhandler);return e.setPosition(t.x,t.y),this.icons.set(t.title,e),this.iconContainer.appendChild(e.element),e}addDefaultIcons(){[{title:"Welcome",image:"images/clippy.gif",onhover:"images/clippy_closeup.gif",x:20,y:50,clickhandler:()=>this.newWindow(r,{height:780,width:730,icon:null,title:"Welcome!",content:"<p>This is a test</p>",initialURL:"/welcome"})},{title:"Current Projects",image:"icons/win_controls/console.png",onhover:"icons/win_controls/console.png",x:20,y:175,content:"",clickhandler:()=>this.newWindow(r,{height:780,width:730,icon:null,title:"Projects",content:"<p>Projects</p>",initialURL:"/projects"})},{title:"Music",image:"icons/win_controls/music.png",onhover:"icons/win_controls/music.png",x:20,y:300,clickhandler:()=>this.newWindow(x,{width:400,height:400,icon:null,title:"Win98 Music Player",content:'<div id="music-player"></div>',tracks:[{title:"BOOMER",url:"/audio/boomer.wav"},{title:"In Awe of The Machine",url:"/audio/machine.wav"},{title:"Jello By WayKool",url:"/audio/jello-waykool.mp3"},{title:"Weather",url:"/audio/Weather.wav"}],styles:{titlebar_fontsize:"12px"}})},{title:"Bonzi",image:"icons/bonzi.ico",onhover:"icons/bonzi.ico",x:20,y:425,clickhandler:()=>this.newWindow(r,{title:"Bonzi",content:"Literal malware!",width:600,height:400})}].forEach(e=>{this.addIcon(e)})}createTaskbarIcon(t,e,i){const s=document.createElement("button");return s.className="taskbar-item",s.style.padding="0 10px",s.style.cursor="pointer",s.whiteSpace="nowrap",s.style.display="flex",s.style.alignItems="center",s.style.fontSize="1rem",s.style.whiteSpace="nowrap",s.style.minWidth="20px",s.style.textOverflow="ellipsis",s.style.overflow="hidden",s.textContent=t,s.onclick=()=>this.newWindow(e,i||this.windowTypes.get(e.name)),s}pinWindow(t){const e=document.createElement("button");e.className=`taskbar-item taskbar-item-${t.id}`,e.style.padding="0 10px",e.style.cursor="pointer",e.whiteSpace="nowrap",e.style.display="flex",e.style.alignItems="center",e.style.fontSize="1rem",e.style.whiteSpace="nowrap",e.style.minWidth="20px",e.style.textOverflow="ellipsis",e.style.overflow="hidden",e.textContent=t.title,e.onclick=()=>t.toggleMinimize(),this.taskbarScrollContainer.appendChild(e),this.icons.set(t.id,e),this.updateScrollButtons()}removeWindow(t){console.log("Removing window:",t.id),this.windows.has(t.id)&&(this.windows.delete(t.id),this.environment.removeChild(t.element),this.taskbarScrollContainer.removeChild(this.icons.get(t.id)),this.icons.delete(t.id),t.destroy(),this.updateZIndices(),this.saveState(),this.updateScrollButtons())}exportIconConfig(t){const e={title:t.title,image:t.icon,onhover:t.icon,x:20,y:50,clickhandler:()=>this.newWindow(typeof t,t.getConfig())};this.addIcon(e)}newWindow(t=r,e={}){const i=this.createWindow(crypto.randomUUID(),t,e);return this.pinWindow(i),this.bringToFront(i),this.updateZIndices(),this.saveState(),i}createWindow(t,e=r,i={}){if(this.windows.has(t))return console.error(`Window with id ${t} already exists. Skipping creation.`),this.windows.get(t);if(!this.windowTypes.has(e.name))console.log(`>> ${e.name} class not registered in windowTypes`),e.prototype instanceof r?(console.log(">>> Window class is a subclass of Window - Registering new Type"),this.windowTypes.set(e,{width:i.width||600,height:i.height||400,title:i.title||"",icon:i.icon||"",styles:i.styles||{},events:i.events||{},savedstate:i.savedstate||{}})):(console.error(">>>Window class is not a subclass of Window - Using default Window class."),e=r);else{const n=this.windowTypes.get(e.name);for(const o in n)i[o]=i[o]||n[o]}const s=new e(t,i);return i.events&&Object.entries(i.events).forEach(([n,o])=>{s.on(n,o)}),s.on("close",n=>this.removeWindow(n)),s.on("focus",n=>this.bringToFront(n)),s.on("dragStart",()=>this.startDragging(s)),s.on("minimize",()=>this.saveState()),s.on("drag",()=>this.saveState()),s.on("dragEnd",()=>this.saveState()),s.on("popup",n=>this.newWindow(`${crypto.randomUUID()}-${t}`,n,y)),s.on("exportIconConfig",()=>this.exportIconConfig(s)),s.on("changeTaskbarTitle",n=>{this.icons.get(n.id).textContent=n.title}),this.windows.set(s.id,s),this.environment.appendChild(s.element),this.updateZIndices(),this.saveState(),s}toggleEmojis(t){t.emojiSelector?(t.emojiSelector.emit("close"),t.emojiSelector=null):(t.emojiSelector=this.createWindow(`emoji-${this.id}`,"","",300,400,null,g),t.initEmojiSelector(),this.bringToFront(t.emojiSelector))}bringToFront(t){const e=Array.from(this.windows.values()),i=e.indexOf(t);i!==-1&&(e.splice(i,1),e.push(t),this.windows.clear(),e.forEach(s=>this.windows.set(s.id,s)),this.updateZIndices(),this.saveState())}updateZIndices(){let t=0;this.windows.forEach(e=>{e.setZIndex(this.zIndexBase+t),t++})}startDragging(t){this.currentlyDragging=t,this.bringToFront(t)}onMouseMove(t){this.currentlyDragging&&this.currentlyDragging.drag(t)}onMouseUp(t){this.currentlyDragging&&(this.currentlyDragging.dragEnd(t),this.currentlyDragging=null)}saveState(){const t={windows:Array.from(this.windows.values()).map(e=>({...e.getState(),className:e.constructor.name}))};localStorage.setItem("windowEnvironmentState",JSON.stringify(t))}clearSavedState(){localStorage.removeItem("windowEnvironmentState")}}localStorage.removeItem("windowEnvironmentState");const u=new E(!0);u.clearSavedState();const M={height:780,width:730,icon:null,title:"Welcome!",content:"<p>This is a test</p>",initialURL:"/welcome"},I={height:780,width:730,icon:null,title:"Projects!",content:"<p>Projects</p>",initialURL:"/projects"},B={width:400,height:400,icon:null,title:"Win98 Music Player",content:'<div id="music-player"></div>',tracks:[{title:"BOOMER",url:"/audio/boomer.wav"},{title:"In Awe of The Machine",url:"/audio/machine.wav"},{title:"Jello By WayKool",url:"/audio/jello-waykool.mp3"},{title:"Weather",url:"/audio/Weather.wav"}],styles:{titlebar_fontsize:"12px"}};u.newWindow(r,M);u.newWindow(r,I);u.newWindow(x,B);
