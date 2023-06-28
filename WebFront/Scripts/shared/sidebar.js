class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="nav-side-menu flex-shrink-0 p-3">
            <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
            <div class="menu-list">
            <ul id="menu-content" class="menu-content collapse out">
                
                <li>
                    <!--<a href="/mdk/sic-visualizacion/index.html">-->
                    <a href="index.html">
                        <i class="fa fa-bank fa-fw"></i> Inicio
                    </a>
                </li>

                <li  data-bs-toggle="collapse" data-bs-target="#tirnoper-menu" class="collapsed">
                  <a href="#"><i class="fa fa-bar-chart fa-fw"></i> Tir No Per <span class="arrow"></span></a>
                </li>
                
                <ul class="sub-menu collapse" id="tirnoper-menu">
                    <li>
                    <a href="/TirNoPer/TirNoPer")">Herramienta</a>
                    </li>                    
                </ul>

                <!--<li>
                    <a href="login.html"><i class="fa fa-arrow-left fa-fw"></i> Cerrar Sesi&oacute;n</a>
                </li>-->
                
                    
                    <!--
                    <li class="static">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Renta Fija
                        </button>
                        <div class="collapse" id="dashboard-collapse">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                            <li><a href="HRF.html" class="link-dark rounded">Herramienta</a></li>
                        </ul>
                        </div>
                    </li>
                    -->
                    <!--
                    <li class="static selected">
                        
                        <ul id="tirnoper-menu" class="btn-toggle-nav list-unstyled fw-normal pb-1">
                            <li><a href="TirNoPer.html" class="link-dark rounded">Herramienta</a></li>
                        </ul>
                        </div>
                    </li>
                    -->
                    
                
            </ul>
            </div>
        </div>
    `;
    }
  }
  
  customElements.define('sidebar-component', Sidebar);