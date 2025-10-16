// Nombre de la tienda y PayPal
const STORE_NAME = "Tienda RUB";
const PAYPAL_LINK = "https://paypal.me/PabloHernandez204"; // tu enlace PayPal

// Login / Registro
function showLogin(){document.getElementById('loginForm').style.display='block'; document.getElementById('registerForm').style.display='none';}
function showRegister(){document.getElementById('loginForm').style.display='none'; document.getElementById('registerForm').style.display='block';}

function register(){
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPass').value;
  let users = JSON.parse(localStorage.getItem('users')||'{}');
  if(users[email]){alert('Usuario ya existe'); return;}
  users[email]=pass;
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registrado!'); showLogin();
}

function login(){
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  let users = JSON.parse(localStorage.getItem('users')||'{}');
  if(users[email]===pass){ localStorage.setItem('currentUser', email); window.location='tienda.html';}
  else alert('Credenciales inválidas');
}

function logout(){localStorage.removeItem('currentUser'); window.location='index.html';}

// Productos: Brainrots con precios muy baratos
const PRODUCTS = [
    {id:1, name:"Dragón Caneloni", price:0.8},
    {id:2, name:"Elefante de Fresa", price:1.9},
    {id:3, name:"Sammyini Spyderini", price:0.4},
    {id:4, name:"La vaca Saturno Saturnita", price:0.6},
    {id:5, name:"67", price:0.8},
    {id:6, name:"La combinación suprema", price:0.4}
];


// Render productos
function renderProducts(){
  const div = document.getElementById('products'); if(!div)return; div.innerHTML='';
  PRODUCTS.forEach(p=>{
    const b = document.createElement('div');
    b.innerHTML=`${p.name} - $${p.price} <button onclick='addToCart(${p.id})'>Agregar</button>`;
    div.appendChild(b);
  });
}

// Carrito
function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]');}
function saveCart(c){localStorage.setItem('cart', JSON.stringify(c));}
function addToCart(id){const p = PRODUCTS.find(x=>x.id===id); const cart=getCart(); cart.push(p); saveCart(cart); renderCart();}
function renderCart(){const c=document.getElementById('cart'); if(!c)return; const cart=getCart(); c.innerHTML=''; cart.forEach((i,idx)=>{const b=document.createElement('div'); b.innerHTML=`${i.name} - $${i.price} <button onclick='removeFromCart(${idx})'>Quitar</button>`; c.appendChild(b);});}
function removeFromCart(idx){const cart=getCart(); cart.splice(idx,1); saveCart(cart); renderCart();}

function goToCheckout(){ window.location='checkout.html';}
function goBack(){ window.location='tienda.html';}

// Checkout QR
function renderCheckout(){
  const sum=document.getElementById('summary');
  if(!sum)return;
  const cart=getCart();
  let total=0;
  cart.forEach(p=>{
      total+=p.price;
      const d=document.createElement('div');
      d.textContent=`${p.name} - $${p.price}`;
      sum.appendChild(d);
  });
  const t=document.createElement('div');
  t.textContent=`Total: $${total}`;
  sum.appendChild(t);

  const qrDiv=document.getElementById('qr');
  if(qrDiv){ 
      new QRCode(qrDiv,{text:`${PAYPAL_LINK}`,width:150,height:150});
      const title=document.createElement('p');
      title.textContent = STORE_NAME; 
      qrDiv.appendChild(title);
  }
}

// Init
document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('products')) renderProducts();
  if(document.getElementById('cart')) renderCart();
  if(document.getElementById('summary')) renderCheckout();
});
