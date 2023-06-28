class Report extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="container container-reporte">
            <img src="~/resource/img/report-1.png" alt="" class="responsive-img">
        </div>
      `;
    }
  }
  
  customElements.define('report-component', Report);

  document.onreadystatechange = function (){
    let state = document.readyState
    if (state == 'complete') {
        
      if(sessionStorage.getItem("access_token") != null || sessionStorage.getItem("access_token") != undefined){validate_token()} 
      setTimeout(function(){
        document.getElementById('interactive');
        document.getElementById('load-main').style.visibility="hidden";
      },100);
    }
  }