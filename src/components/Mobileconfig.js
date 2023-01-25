const getDeviceType = () => {
    const ua = window.navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

 export function mobile() {
  console.log("10sdss0")
    const schedji = document.getElementsByClassName("MainLayout-stickyElement MainLayout-header MainLayout-flexRow");   
    const toolbar2 = document.getElementsByClassName("MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular Toolbar-toolbar css-1b7ni76-MuiToolbar-root"); 
    console.log("10sdss1")
if (getDeviceType()=="mobile"){
  console.log("10sdss2")
    for (var i = 0; i < schedji.length; i++) {
     
    schedji[i].style.height = "10%"; 
 }

 for (var i = 0; i < toolbar2.length; i++) {
     
  toolbar2[i].style.height = "10%"; 
}



}
 


  };
 