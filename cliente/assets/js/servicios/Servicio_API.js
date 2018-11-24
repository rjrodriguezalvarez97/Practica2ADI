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
       }).then(function (respuesta) {
          return respuesta.json();
       })
    }

}