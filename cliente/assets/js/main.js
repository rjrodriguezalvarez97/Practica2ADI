import {Servicio_API} from './servicios/Servicio_API'
import { compile } from 'handlebars';

var servicio_API = new Servicio_API('http://localhost:3000/')
var errorTemplate = `
<span>
<strong>Error:</strong> {{message}}
</span>
`
var errorTemplateCompiled = compile(errorTemplate);


function createErrorLogin(errorMessage){

    var errorHTML = errorTemplateCompiled({message: errorMessage});
    var errorLogin = document.getElementById('errorLogin');
    errorLogin.innerHTML=errorHTML;
    errorLogin.style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById('formLogin').addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('errorLogin').style.display = 'none';
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        servicio_API.login({email: email, password: password}).then(function (resp){
            console.log("Estoy en main y la respuesta es: " + resp);
            console.log(resp);
            if(resp.token && resp.id){
                localStorage.setItem("token", resp.token);
                localStorage.setItem("id", resp.id);

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


    showLoginForm();
    

});
