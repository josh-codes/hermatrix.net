window.onload = () =>{
    for(let i = 0; i < document.getElementsByTagName("appitem").length; i++){
        const appitem = document.getElementsByTagName("appitem")[i];
        appitem.addEventListener("click",(self:any)=>{
            location.href = self.toElement.getAttribute("url");
        })
    }
}