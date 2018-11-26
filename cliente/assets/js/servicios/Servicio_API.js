export class Servicio_API{
    constructor(url){
        this.API_URL = url;
    }

    login(payload){
       return fetch(this.API_URL + 'login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(payload)
       }).then(function (response) {
          return response.json();
       })
    }
    getForums(){
        return fetch(this.API_URL + 'forums').
        then(function (response){
            return response.json();
        });
    }
    getForum(id){
        return fetch(this.API_URL + 'forums/' + id).
        then(function (response){
            return response.json();
        })
    }
    updateForum(id, payload){
        return fetch(this.API_URL + 'forums/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(payload)
        }).then(function (response){
            return response.json();
        })
    }
    deleteForum(id){
        return fetch(this.API_URL + 'forums/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.token
            },
        }).then(function (response){
            return response.json();
        })
    }

    createForum(payload){
        return fetch(this.API_URL + 'forums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(payload)
        }).then(function (response){
            console.log(response);
            return response.json();
        })
    }

}