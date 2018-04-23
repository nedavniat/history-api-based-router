class Router {
  constructor(root = '#app', nav = 'nav', viewfolder = 'views'){
    this.root = document.querySelector(root);
    this.viewfolder = viewfolder;
    this.init(nav);
  }

  followRoute(e) {
    const target = e.target.closest('a');
    if(!target) return false;

    e.preventDefault();
    e.stopPropagation();

    const file  = e.target.href.match(/[^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/)[0];
    history.pushState(file, null, file);
    this.getContent(file);
  }

  getContent(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.viewfolder}/${file}`);
    xhr.onreadystatechange =  () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        this.root.innerHTML = xhr.responseText;
      }
    };
    xhr.send();
  }

  init(nav) {
    document.querySelector(nav).addEventListener('click', (e) => this.followRoute(e));
    window.addEventListener('popstate', ({ state }) => this.getContent(state));
  }
}