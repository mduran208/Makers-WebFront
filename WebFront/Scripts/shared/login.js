class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
            <nav class="navbar navbar-expand navbar-light topbar navbar-main">
                
                    <li class="navbar" href="/">                      
                        <img class="img-logo" src="~/resource/img/logo-blanco-header.svg" alt="credicorp capital logo" padding-top="10%" style="margin-left:auto; margin-right:auto">                      
                    </li>
                    
               
            </nav>
        </header>
      `;
    }
}

customElements.define('header-component', Header);