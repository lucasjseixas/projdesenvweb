// Declaração de variáveis --

let user = document.querySelector("#user");
let labeluser = document.querySelector("#labeluser");
let validcampuser = false;

let userlogado = false;
let esq = document.getElementsByClassName("#esq");

let password = document.querySelector("#password");
let labelpassword = document.querySelector("#labelpassword");
let validcamppassword = false;

let msgerro = document.querySelector("#msgerro");
let msgsucesso = document.querySelector("#msgsucesso");

let listofusers = document.getElementById("listofusers");
let userlist = document.querySelector("#userlist");

let entrar = document.querySelector("#buttonentrar");

let mostrarlogin = document.querySelector("#btn-box1-2-hidden");
let mostrarlogin2 = document.querySelector("#btn-box1-2");
let containerlogin = document.querySelector(".containerlogin")

let containerprocura = document.getElementById("containerprocura");

let fechar = document.getElementById("fechar");

// Declaração de eventos --
// Validação de input de usuário
user.addEventListener("keyup", () => {
  if (user.value.length <= 2) {
    labeluser.setAttribute("style", "color: red");
    labeluser.innerHTML = "No mínimo 3 caracteres para usuário";
    user.setAttribute = ("style", "border-color: red");
    validcampuser = false;
  } else {
    labeluser.setAttribute("style", "color: green");
    labeluser.innerHTML = "E-mail";
    user.setAttribute = ("style", "border-color: green");
    validcampuser = true;
  }
});

// Validação de input de senha

password.addEventListener("keyup", () => {
  if (password.value.length <= 2) {
    labelpassword.setAttribute("style", "color: red");
    labelpassword.innerHTML = "Senha de pelo menos 3 caracteres";
    password.setAttribute = ("style", "border-color: red");
    validcamppassword = false;
  } else {
    labelpassword.setAttribute("style", "color: green");
    labelpassword.innerHTML = "Senha";
    password.setAttribute = ("style", "border-color: green");
    validcamppassword = true;
  }
});

mostrarlogin2.addEventListener("click", ()=>{
  if(containerlogin.style.display === "" || containerlogin.style.display === "none"){
    containerlogin.style.display = "block";
  } else {
    containerlogin.style.display = "none";
  }
});

mostrarlogin.addEventListener("click", ()=>{
  if(containerlogin.style.display === "" || containerlogin.style.display === "none"){
    containerlogin.style.display = "block";
  } else {
    containerlogin.style.display = "none";
  }
});

fechar.addEventListener("click", ()=>{
  containerlogin.style.display = "none";
});

// Declaração de funções --
// Função de checagem de LocalStorage --

function checaruser() {
  if (!localStorage.getItem("token")) {
    window.alert("Erro: Usuário nao logado");
  } else {
    window.alert("Bem vindo(a) de volta");
  }
};

function sair() {
  localStorage.removeItem("token");
  if(!localStorage.removeItem("token")){
  window.alert("Usuário deslogado com sucesso");
  labeluser.style.display = "";
  user.style.display = "";
  labelpassword.style.display = "";
  password.style.display = "";
  userlogado = false;
  containerprocura.style.display = "none"
  listofactivities.innerHTML = "";
  }
};

// Request API --
// Request da lista de usuários da API

userlist.addEventListener("click", () => {
  fetch("https://reqres.in/api/users?page=1")
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp.data);
      for (var i = 0; i < resp.data.length; i++) {
        let li = document.createElement("li"),
          emailf = resp.data[i].email;
        li.innerHTML = emailf;
        listofusers.appendChild(li);
      }
    });
});

// Request Login na API

entrar.addEventListener("click", () => {
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.value,
      password: password.value,
    }),
  }).then((resp) => {
    let respstatus = resp.status;
    if (resp.status === 200) {
      resp.json().then((resp) => {
        localStorage.setItem("token", resp.token),
          window.alert(
            "Usuário " + user.value + " logado com sucesso!" + " " + respstatus
          )
          msgsuccesso.setAttribute('style', 'display: block')
          msgsuccesso.innerHTML = '<strong>Usuário logado</strong>'
          msgerro.setAttribute('style', 'display: none')
          msgerro.innerHTML = ''
          containerprocura.style.display = "block";
          userlogado = true;
      });
    } else {
      window.alert("Erro: Usuário ou senha incorretos" + " " + respstatus);
      msgerro.setAttribute('style', 'display: block')
      msgerro.innerHTML = '<strong>Erro ao logar...</strong>'
      msgsuccesso.innerHTML = ''
      msgsuccesso.setAttribute('style', 'display: none')
    }
    
  labeluser.style.display = "none";
  user.style.display = "none";
  labelpassword.style.display = "none";
  password.style.display = "none";

  });
  password.value = '';
  user.value = '';
});

// Get de API pública

document.querySelector("#listadeatividades").addEventListener("click", ()=>{
  fetch("https://www.boredapi.com/api/activity")
    .then((resposta) => resposta.json())
    .then((resposta) =>{
        let li = document.createElement("li");
        d = resposta.activity;
        li.innerHTML = 'Atividade aleatória: ' + d;
        listofactivities.appendChild(li);
    })
});

document.getElementById("procurarporchave").addEventListener("click", ()=>{
  let atividadeporchaveid = document.getElementById("atividadeporchaveid");
  fetch("http://www.boredapi.com/api/activity?key=" + atividadeporchaveid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    let li = document.createElement("li");
    d = resp.activity;
    li.innerHTML = 'Atividade por chave: ' + d;
    listofactivities.appendChild(li);
  })
  atividadeporchaveid.value = "";
});


document.getElementById("procurarportipo").addEventListener("click", ()=>{
  let atividadesmenuid = document.getElementById("atividadesmenuid");
  fetch("http://www.boredapi.com/api/activity?type=" + atividadesmenuid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    let li = document.createElement("li");
    d = resp.activity;
    li.innerHTML = 'Atividade por tipo: ' + d;
    listofactivities.appendChild(li);
    })
});

document.getElementById("procurarporparticipantes").addEventListener("click", ()=>{
  let atividadeporparticipantesid = document.getElementById("atividadeporparticipantesid");
  fetch("http://www.boredapi.com/api/activity?participants=" + atividadeporparticipantesid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    console.log(resp);
    let li = document.createElement("li");
    d = resp.activity;
    li.innerHTML = 'Atividade por participantes: ' + d;
    listofactivities.appendChild(li);
    })
    atividadeporparticipantesid.value = "";
});

document.getElementById("procurarporpreco").addEventListener("click", ()=>{
  let atividadepeloprecoid = document.getElementById("atividadepeloprecoid");
  fetch("http://www.boredapi.com/api/activity?price=" + atividadepeloprecoid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    console.log(resp);
    let li = document.createElement("li");
    d = resp.activity;
    li.innerHTML = 'Atividade por preço: ' + d;
    listofactivities.appendChild(li);
    })
    atividadepeloprecoid.value = "";
});

document.querySelector("#resetarpesquisa").addEventListener("click", ()=>{
  y = document.querySelector("#listofactivities")
  y.innerHTML = "";
  atividadepeloprecoid.value = "";
  atividadeporparticipantesid.value = "";
  atividadeporchaveid.value = "";
});