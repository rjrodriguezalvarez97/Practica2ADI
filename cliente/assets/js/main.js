import {Servicio_API} from './servicios/Servicio_API'

import {Templates} from './templates/Templates'

var servicio_API = new Servicio_API('http://localhost:3000/')
var templatesPrueba = new Templates();

/**
 * Hide or show the forum list
 */
function toggleForumList(){
    var forumList = document.getElementById('divForumsList');
    forumList.style.display = forumList.style.display === 'block' ? 'none' : 'block';
}
/**
 * Return to the forum list
 */
function backToForumList(){
    document.getElementById('divSubforumList').style.display= 'none';
    toggleForumList();
}

/**
 * Check if a user is logged
 */
function isLogged(){
    return localStorage.token !== undefined;
}

/**
 * Hide or show the login form
 */
function toggleLoginForm(){

    var form = document.getElementById('divFormLogin');
    isLogged() ? form.style.display = "none" : form.style.display = "block";
}
/**
 * Creates and error with the given message
 * @param {string} errorMessage 
 */
function createErrorLogin(errorMessage){

    var errorHTML = templatesPrueba.errorTemplate({message: errorMessage});
    var errorLogin = document.getElementById('errorLogin');
    errorLogin.innerHTML=errorHTML;
    errorLogin.style.display = 'block';
}

/**
 * Creates the navbar
 */
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
/**
 * Creates the forum list
 */
function createForumList(){
    if(isLogged()){
        servicio_API.getForums().then(function (result){
            var divForumList = document.getElementById('divForumsList');

            divForumsList.innerHTML = templatesPrueba.forumListTemplate(result);
            divForumsList.style.display = 'block';
        })
    }

}
/**
 * Creates a list with all the subforums  that belong to the forum
 * @param {int} id forum id
 * @param {string} name forum name
 */
function createSubforumList(id,name){
    if(isLogged()){
        servicio_API.getSubforumsByForumId(id).then(function (result){
            var data = {};
            data.data = result;
            data.name = name;
            var divSubforumList = document.getElementById('divSubforumList');
            divSubforumList.innerHTML = templatesPrueba.subForumListTemplate(data);
            divSubforumList.style.display = 'block';
            toggleForumList();

        })
    }
}
/**
 * Create a forum inside of the modal
 */
function createForum(){
    var createForumNameEntry = document.getElementById('createForumNameEntry');
    var createForumDescriptrionEntry = document.getElementById('createForumDescriptrionEntry');
    var payload = {
        name: createForumNameEntry.value,
        description: createForumDescriptrionEntry.value
    };
    servicio_API.createForum(payload).then(function (response){
        location.reload();
    })
}

function forumDetails(id){
    var forumNameEntry = document.getElementById('forumNameEntry');
    var forumDescriptionEntry = document.getElementById('forumDescriptrionEntry');
    servicio_API.getForum(id).then(function (forum){
        forumNameEntry.value = forum.name;
        forumDescriptionEntry.value = forum.description;
        var updateButton = document.getElementById('buttonUpdate');

        updateButton.addEventListener('click', updateForum);
        updateButton.idForum = id;
        console.log("id del boton: " + updateButton.idForum);
    })
}


function updateForum(event){
    var forumNameEntry = document.getElementById('forumNameEntry');
    var forumDescriptionEntry = document.getElementById('forumDescriptrionEntry');
    var payload = {
        name: forumNameEntry.value, 
        description: forumDescriptionEntry.value
    };
    servicio_API.updateForum(event.target.idForum, payload).then(function (response){
        location.reload();

    })
}

function deleteForum(id){
    servicio_API.deleteForum(id).then(function (response) {
        location.reload();
    })
}


function subforumDetails(id){
    servicio_API.getSubforum(id).
    then(function (result){
        console.log(result);
        document.getElementById('subforumNameEntry').value = result.title;
    })
}

function deleteSubforum(id){
    servicio_API.deleteSubForum(id).
    then(function (response){
        location.reload();
    })

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
                createForumList();

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

    document.getElementById('createForumModalSaveButton').addEventListener("click", createForum);
    toggleLoginForm();
    createNavbar();
    createForumList();

});
window.backToForumList = backToForumList;
window.deleteSubforum = deleteSubforum;
window.subforumDetails = subforumDetails;
window.createSubforumList = createSubforumList;
window.forumDetails = forumDetails;
window.deleteForum = deleteForum;