window.onload = () =>{
    document.getElementsByTagName("returnbutton")[0].addEventListener("click",()=>{
        location.href = "index.html"
    })
    document.getElementsByTagName("input")[0].addEventListener("keyup",(e)=>{
        if (e.key === 'Enter' || e.keyCode === 13) {
            codelogic()
        }
    })
    document.getElementsByTagName("enterinput")[0].addEventListener("click",()=>{
        codelogic()
    })
}
const codelogic = async () =>{
    const data = JSON.stringify({
        code: document.getElementsByTagName("input")[0].value
      })
    const output = await req("https://hermatrix.net/submitCode", data)
    document.getElementsByTagName("h1")[0].innerHTML = output;
}
const req = async (url:string, data:string):Promise<string> => {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        Http.send(data);
        Http.onreadystatechange = function() {
            if(Http.readyState == 4 && Http.status == 200) {
                resolve(JSON.parse(Http.responseText).content)
            } else if (Http.readyState == 4 && Http.status == 401){
                resolve("Nope, try again.")
            } else if (Http.readyState == 4 && Http.status != 200 && Http.status != 401){
                resolve("An unexpected error has occurred.")
            }
        }
      });
}