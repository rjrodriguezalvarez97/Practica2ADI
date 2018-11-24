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
}