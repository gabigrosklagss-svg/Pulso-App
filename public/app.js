const $=(selector)=>document.querySelector(selector);
const savedTheme=localStorage.getItem('pulso:theme');
const theme=savedTheme&&['light','dark','system'].includes(savedTheme)?savedTheme:'system';
document.documentElement.dataset.theme=theme;
document.querySelector(`input[name=theme][value=${theme}]`).checked=true;

function route(){const id=location.hash.slice(1)||'buscar';document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${id}`));}
addEventListener('hashchange',route);route();document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>location.hash=b.dataset.go);
const dialog=$('#authDialog');const openAuth=()=>dialog.showModal();$('#accountButton').onclick=openAuth;$('#loginCta').onclick=openAuth;$('.dialog-close').onclick=()=>dialog.close();
let registering=false;$('#authToggle').onclick=()=>{registering=!registering;$('.register-only').classList.toggle('hidden',!registering);$('#authTitle').textContent=registering?'Crie sua conta':'Entre na sua conta';$('#authSubmit').textContent=registering?'Criar conta':'Entrar';$('#authToggle').textContent=registering?'Já tenho uma conta':'Ainda não tenho conta';};
async function api(path,options={}){const response=await fetch(path,{headers:{'content-type':'application/json'},...options});const result=await response.json();if(!response.ok)throw new Error(result.error);return result;}
$('#authForm').onsubmit=async(event)=>{event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget));const error=$('#authError');error.textContent='';try{if(registering)await api('/api/auth/register',{method:'POST',body:JSON.stringify(data)});await api('/api/auth/login',{method:'POST',body:JSON.stringify(data)});dialog.close();await loadProfile();}catch(e){error.textContent=e.message;}};
async function loadProfile(){try{const {user}=await api('/api/me');$('#profileState').innerHTML=`<h2>Olá, ${escapeHtml(user.name)}</h2><p>${escapeHtml(user.email)}</p><p><strong>E-mail:</strong> ${user.email_verified_at?'verificado':'verificação pendente'} · <strong>Telefone:</strong> ${user.phone_verified_at?'verificado':'pendente'}</p><button id="logout">Sair</button>`;$('#logout').onclick=async()=>{await api('/api/auth/logout',{method:'POST',body:'{}'});location.reload();};if(user.theme){applyTheme(user.theme,false);}}catch{} }
function escapeHtml(value){const element=document.createElement('span');element.textContent=value;return element.innerHTML;}
async function applyTheme(value,sync=true){document.documentElement.dataset.theme=value;localStorage.setItem('pulso:theme',value);document.querySelector(`input[name=theme][value=${value}]`).checked=true;if(sync){try{await api('/api/me/theme',{method:'PATCH',body:JSON.stringify({theme:value})});}catch{}}}
$('#themePicker').onchange=(event)=>applyTheme(event.target.value);
$('#searchForm').onsubmit=(event)=>{event.preventDefault();const input=$('#searchInput');if(!input.value.trim())return;localStorage.setItem('pulso:draft',input.value.trim());$('#draftMessage').textContent=input.value.trim();$('#draftMessage').classList.remove('hidden');input.value='';$('#manualFallback').classList.remove('hidden');};
const draft=localStorage.getItem('pulso:draft');if(draft){$('#draftMessage').textContent=draft;$('#draftMessage').classList.remove('hidden');$('#manualFallback').classList.remove('hidden');}loadProfile();
