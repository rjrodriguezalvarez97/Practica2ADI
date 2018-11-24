import {Servicio_API} from './servicios/Servicio_API'

import {Templates} from './templates/Templates'

var servicio_API = new Servicio_API('http://localhost:3000/')
var templates = new Templates();


function createErrorLogin(errorMessage){

    var errorHTML = templates.errorTemplate({message: errorMessage});
    var errorLogin = document.getElementById('errorLogin');
    errorLogin.innerHTML=errorHTML;
    errorLogin.style.display = 'block';
}
function createNavbar(){
    var userExists = {};
    if(localStorage.token && localStorage.id){
       userExists.user = true;
    }
    document.getElementById('navbar').innerHTML = templates.navbarTemplate(userExists);
    try{
        document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        location.reload();
    })}
    catch{//When a user is not logged in element logout doesn't exist  
    }

}
function toggleLoginForm(){

    var form = document.getElementById('divFormLogin');
    form.style.display === 'block' ? form.style.display = "none" : form.style.display = "block";
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



});
