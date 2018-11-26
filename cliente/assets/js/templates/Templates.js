import { compile } from 'handlebars';
export class Templates{

    errorTemplate(data){
        var errorTemplate = 
        `
        <span>
        <strong>Error:</strong> {{message}}
        </span>
        `;
        var errorTemplateCompiled = compile(errorTemplate);
        var errorHTML = errorTemplateCompiled(data);
        return errorHTML;
        
    }

    navbarTemplate(data){
        var navbarTemplate = 
        `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Ricky's Forum</a>
            {{#if user}}
                <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a id="logout" class="nav-link" href="#">Logout</a>
                </li>
                </ul>
            {{/if}}
        </nav>
        `
        var navbarTemplate = compile(navbarTemplate);
        var navbarHTML = navbarTemplate(data);
        return navbarHTML;
    }

    forumListTemplate(data){
        var forumListTemplate = 
        `
        <table class="table table-striped table-light">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre del foro</th>
                <th scope="col">Acciones </th>
                </tr>
            </thead>
            <tbody>
                {{#each .}}
                <tr>
                    <th scope="row">{{ id }}</th>
                    <td>{{name}}</td>
                    <td>
                    <a href="#myModal" data-toggle="modal" onclick="forumDetails({{id}})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href="javascript:deleteForum({{id}})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                    <a href="javascript:createSubforumList({{id}},'{{name}}')"><i class="fa fa-eye" aria-hidden="true"></i></a>
                    </td>
                </tr>
                {{/each}}
                <tr>
                    <th scope="row"> </th>
                    <td></td>
                    <td> <a href="#createForumModal" data-toggle="modal"><i class="fa fa-plus" aria-hidden="true"></i></a></td>
            </tbody>
        </table>
        `
        var forumListCompiled = compile(forumListTemplate);
        var forumListHTML = forumListCompiled(data);
        return forumListHTML;
    }
    subForumListTemplate(data){
        var subforumListTemplate = 
        `
        <h3>Subforos de {{foro}} </h3>
        <table class="table table-striped table-light">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre del subforo</th>
                <th scope="col">Acciones </th>
                </tr>
            </thead>
            <tbody>
                {{#each data}}
                <tr>
                    <th scope="row">{{ id }}</th>
                    <td>{{title}}</td>
                    <td>
                    <a href="#editSubforum" data-toggle="modal" onclick="subforumDetails({{id}})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href="javascript:deleteSubforum({{id}})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                    </td>
                </tr>
                {{else}}
                <tr>
                    <th scope="row"></th>
                    <td>No existen subforos para este foro</td>
                    <td></td>

                </tr>
                {{/each}}
                <tr>
                    <th scope="row"> </th>
                    <td></td>
                    <td> <a href="javascript:backToForumList()">Volver</a></td>
            </tbody>
        </table>
        `;
        var subforumListCompiled = compile(subforumListTemplate);
        var subforumListHTML = subforumListCompiled(data);
        return subforumListHTML;
    }
    
}
