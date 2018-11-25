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
                {{#each data}}
                <tr>
                    <th scope="row">{{ id }}</th>
                    <td>{{name}}</td>
                    <td>
                    <a href="#myModal" data-toggle="modal" onclick="forumDetails({{id}})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href="javascript:deleteForum({{id}})">
                        <i class="fa fa-trash-o" aria-hidden="true"></i></a></td>
                    </td>
                </tr>

                {{/each}}
            </tbody>
        </table>
        `
        var forumListCompiled = compile(forumListTemplate);
        var forumListHTML = forumListCompiled({data: data});
        return forumListHTML;
    }

    forumDetailsModal(){
        var forumDetailModalTemplate = 
        `
        <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Modal Header</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>

        </div>
        <div class="modal-body">
            <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
        </div>
        </div>
        </div>
        `
        var forumDetailModalCompiled = compile( forumDetailModalTemplate);
        var forumDetailModalHTML = forumDetailModalCompiled();
        return forumDetailModalHTML;
    }
}
