import {Servicio_API} from './servicios/Servicio_API'

import {Templates} from './templates/Templates'

var servicio_API = new Servicio_API('http://localhost:3000/')
var templatesPrueba = new Templates();


function createErrorLogin(errorMessage){

    var errorHTML = templatesPrueba.errorTemplate({message: errorMessage});
    var errorLogin = document.getElementById('errorLogin');
    errorLogin.innerHTML=errorHTML;
    errorLogin.style.display = 'block';
}

function forumDetails(id){
    var divForumDetailPopUp = document.getElementById('divForumDetailPopUp');
    divForumDetailPopUp.innerHTML = templatesPrueba.forumDetailsModal();
    divForumDetailPopUp.style.display = "block";
}
window.forumDetails = forumDetails;
function createNavbar(){
    var userExists = {};
    if(localStorage.token && localStorage.id){
       userExists.user = true;
    }
    document.getElementById('navbar').innerHTML = templatesPrueba.navbarTemplate(userExists);
    try{
        document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        location.reload();
    })}
    catch{//When a user is not logged in element logout doesn't exist  
    }
}
function isLogged(){
    return localStorage.token !== undefined;
}

function createForumList(){
    if(isLogged()){
        var forumList = servicio_API.getForums().then(function (result){
            var divForumList = document.getElementById('divForumsList');
            divForumsList.innerHTML = templatesPrueba.forumListTemplate(result);
            divForumsList.style.display = 'block';
        })
    }

}
function toggleLoginForm(){

    var form = document.getElementById('divFormLogin');
    isLogged() ? form.style.display = "none" : form.style.display = "block";
}
document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById('formLogin').addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('errorLogin').style.display = 'none';
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        servicio_API.login({email: email, password: password}).then(function (resp){
            if(resp.token && resp.id){
                localStorage.setItem("token", resp.token);
                localStorage.setItem("id", resp.id);
                createNavbar();
                toggleLoginForm();

            }else{
                switch(resp.error){
                    case 'Bad Request': createErrorLogin('Campos inválidos');
                    break;
                    case 'Unauthorized': createErrorLogin('Credenciales inválidas');
                    break;
                    default: createErrorLogin(resp.error);
                }
            }
        })
    });

    toggleLoginForm();
    createNavbar();
    createForumList();



});
