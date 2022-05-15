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

let alerta = document.getElementById("msgalerta");

let teste = document.getElementById("testediv");

let resultadobusca = document.getElementById("resultadobusca");

// Declaração de eventos --
// Validação de input de usuário

user.addEventListener("keyup", () => {
  if (user.value.length <= 2) {
    labeluser.setAttribute("style", "color: red");
    labeluser.innerHTML = "<strong>No mínimo 3 caracteres para usuário</strong>";
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
    labelpassword.innerHTML = "<strong>Senha de pelo menos 3 caracteres</strong>";
    password.setAttribute = ("style", "border-color: red");
    validcamppassword = false;
  } else {
    labelpassword.setAttribute("style", "color: green");
    labelpassword.innerHTML = "Senha";
    password.setAttribute = ("style", "border-color: green");
    validcamppassword = true;
  }
});

// Mostrar Tela de Login -- JavaScript puro

// mostrarlogin2.addEventListener("click", ()=>{
//   if(containerlogin.style.visibility === "" || containerlogin.style.visibility === "hidden"){
//     containerlogin.style.visibility = "visible";
//   } else {
//     containerlogin.style.visibility = "hidden";
//   }
// });

// mostrarlogin.addEventListener("click", ()=>{
//   if(containerlogin.style.visibility === "" || containerlogin.style.visibility === "hidden"){
//     containerlogin.style.visibility = "visible";
//   } else {
//     containerlogin.style.visibility = "hidden";
//   }
// });

// fechar.addEventListener("click", ()=>{
//   if(containerlogin.style.visibility === "" || containerlogin.style.visibility === "visible")
//   listofusers.innerHTML = "";
//   containerlogin.style.visibility = "hidden";
// });

// Declaração de funções --
// Função de checagem de LocalStorage --

// function checaruser() {
//   if (!localStorage.getItem("token")) {
//     console.log("Usuário nao logado");
//   } else {
//     console.log("Bem vindo(a) de volta");
//     teste.innerHTML = "Bem vindo(a) de volta";
//   }
// };

$(document).ready(function(){
  if(!localStorage.getItem("token")){
    console.log("Erro: Usuário não logado");
  }else{
    console.log("Bem vindo(a) de volta");
    $("#containerprocura").show();
    $("#testediv").hide();
  }
});

function sair() {
  localStorage.removeItem("token");
  if(!localStorage.removeItem("token")){
  labeluser.style.display = "";
  labeluser.innerHTML = "";
  user.style.display = "";
  labelpassword.style.display = "";
  labelpassword.innerHTML = "";
  password.style.display = "";
  userlogado = false;
  containerprocura.style.display = "none"
  listofactivities.innerHTML = "";
  listofusers.innerHTML = "";
  teste.style.display = "block";
  resultadobusca.innerHTML = "";
  resultadobusca.style.visibility = "hidden";
  resultadobusca.style.fontSize = "0px";
  }
  if(userlogado === false){
    alerta.style.visibility = "visible";
    alerta.innerHTML = "<strong>Usuário deslogado!</strong>";
  };
};

// Request API --
// Request da lista de usuários da API


// JavaScript puro

// userlist.addEventListener("click", () => {
//   fetch("https://reqres.in/api/users?page=1")
//     .then((resp) => resp.json())
//     .then((resp) => {
//       console.log(resp.data);
//       for (var i = 0; i < resp.data.length; i++) {
//         let li = document.createElement("li"),
//           emailf = resp.data[i].email;
//         li.innerHTML = emailf;
//         listofusers.appendChild(li);
//       }
//     });
// });

// Jquery Lista de Usuarios --

$(document).ready(function(){
  $("#userlist").click(function(){
  $.ajax({
  url: "https://reqres.in/api/users?page=1",
  type: "GET",
  success: function(response){
    for(var i = 0; i<response.data.length; i++){
      let emailf = response.data[i].email;
      $("<li id='myli'>" + emailf + "</li>").appendTo("#listofusers").hide().slideDown(600);
        } 
      }
    })
  })
});

// Request Login na API

entrar.addEventListener("click", () => {
  if(validcamppassword === true && validcampuser === true){
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
    if (resp.status === 200) {
      resp.json().then((resp) => {
          localStorage.setItem("token", resp.token);
          // msgsuccesso.setAttribute('style', 'display: block');
          // msgsuccesso.innerHTML = '<strong>Usuário logado</strong>';
          // msgerro.setAttribute('style', 'display: none');
          // msgerro.innerHTML = '';
          alerta.setAttribute('style', 'color: green');
          alerta.style.display = "inline-block";
          alerta.innerHTML = '<strong>Login bem sucedido</strong>';
          containerprocura.style.display = "block";
          userlogado = true;
          teste.style.display = "none";
      });
    } else {
          // msgerro.setAttribute('style', 'display: block');
          // msgerro.innerHTML = 'Erro 400: Usuário ou senha incorretos';
          // msgsuccesso.innerHTML = '';
          // msgsuccesso.setAttribute('style', 'display: none');
          alerta.setAttribute('style', 'color: red');
          alerta.style.display = 'inline-block';
          alerta.innerHTML = '<strong>Erro ao logar ou usuário já logado</strong>';
          teste.style.display = "block";
    }
  })
  password.value = '';
  user.value = '';
}});


// Get de API pública

document.querySelector("#listadeatividades").addEventListener("click", ()=>{
  fetch("https://www.boredapi.com/api/activity")
    .then((resposta) => resposta.json())
    .then((resposta) =>{
        d = resposta.activity;
        resultadobusca.style.fontSize = "17px";
        resultadobusca.innerHTML = "";
        resultadobusca.style.visibility = "visible";
        resultadobusca.style.backgroundColor = "lightgrey";
        resultadobusca.innerHTML = 'Atividade aleatória: ' + d;
    })
});

document.getElementById("procurarporchave").addEventListener("click", ()=>{
  let atividadeporchaveid = document.getElementById("atividadeporchaveid");
  fetch("https://www.boredapi.com/api/activity?key=" + atividadeporchaveid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    d = resp.activity;
    resultadobusca.innerHTML = "";
    resultadobusca.style.fontSize = "17px";
    resultadobusca.style.visibility = "visible";
    resultadobusca.style.backgroundColor = "lightgrey";
    resultadobusca.innerHTML = 'Atividade por chave: ' + d;
  })
  atividadeporchaveid.value = "";
});


document.getElementById("procurarportipo").addEventListener("click", ()=>{
  let atividadesmenuid = document.getElementById("atividadesmenuid");
  fetch("https://www.boredapi.com/api/activity?type=" + atividadesmenuid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    d = resp.activity;
    resultadobusca.innerHTML = "";
    resultadobusca.style.fontSize = "17px";
    resultadobusca.style.visibility = "visible";
    resultadobusca.style.backgroundColor = "lightgrey";
    resultadobusca.innerHTML = 'Atividade por tipo: ' + d;
    })
});

document.getElementById("procurarporparticipantes").addEventListener("click", ()=>{
  let atividadeporparticipantesid = document.getElementById("atividadeporparticipantesid");
  fetch("https://www.boredapi.com/api/activity?participants=" + atividadeporparticipantesid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    d = resp.activity;
    resultadobusca.innerHTML = "";
    resultadobusca.style.fontSize = "17px";
    resultadobusca.style.visibility = "visible";
    resultadobusca.style.backgroundColor = "lightgrey";
    resultadobusca.innerHTML = 'Atividade por pessoas: ' + d;
    })
    atividadeporparticipantesid.value = "";
});

document.getElementById("procurarporpreco").addEventListener("click", ()=>{
  let atividadepeloprecoid = document.getElementById("atividadepeloprecoid");
  fetch("https://www.boredapi.com/api/activity?price=" + atividadepeloprecoid.value)
  .then((resp) => resp.json())
  .then((resp)=>{
    d = resp.activity;
    resultadobusca.innerHTML = "";
    resultadobusca.style.fontSize = "17px";
    resultadobusca.style.visibility = "visible";
    resultadobusca.style.backgroundColor = "lightgrey";
    resultadobusca.innerHTML = 'Atividade por preço: ' + d;
    })
    atividadepeloprecoid.value = "";
});

document.querySelector("#resetarpesquisa").addEventListener("click", ()=>{
  y = document.querySelector("#listofactivities")
  y.innerHTML = "";
  atividadepeloprecoid.value = "";
  atividadeporparticipantesid.value = "";
  atividadeporchaveid.value = "";
  resultadobusca.innerHTML = "";
  resultadobusca.style = "";
});

// Login Botao Desktop

$(document).ready(function(){
  $("#btn-box1-2-hidden").click(function(){
    if(userlogado === true){
    $(".containerprocura").show();
    $(".containerlogin").show().animate({height: "100%"}, 600);
    }else{
      $(".containerlogin").show().animate({height: "100%"}, 600);
    }
  })
});

  $("#fechar").click(function(){
    if(userlogado === false){
    $(".containerlogin").hide("slide", {direction: "right"}, 600);
    $("#listofusers").empty().append("");
    } else {
    $(".containerlogin").hide("slide", {direction: "right"}, 600);
    }
});

// Login Botao Mobile

$(document).ready(function(){
  $("#btn-box1-2").click(function(){
    if(userlogado === true){
      $(".containerprocura").show();
      $(".containerlogin").show().animate({height: "100%"}, 600);
      }else{
      $(".containerlogin").show().animate({height: "100%"}, 600);
      }
  });

  $("#fechar").click(function(){
    if(userlogado === false){
      $(".containerlogin").hide("slide", {direction: "right"}, 600);
      $("#listofusers").empty().append("");
      } else {
      $(".containerlogin").hide("slide", {direction: "right"}, 600);
      }
  })
});