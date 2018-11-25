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

}