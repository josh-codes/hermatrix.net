let user = "";
let pass = "";
window.onload = () =>{
    document.getElementsByTagName("returnbutton")[0].addEventListener("click",()=>{
        location.href = "index.html"
    })
    document.getElementsByTagName("input")[0].addEventListener("keyup",(e)=>{
        if (e.key === 'Enter' || e.keyCode === 13) {
            codelogicterm()
        }
    })
    document.getElementsByTagName("enterinput")[0].addEventListener("click",()=>{
        codelogicterm()
    })
    writeconsole(" ", "green")
    writeconsole(" ", "green")
    writeconsole("Use 'logon &lt;username&gt; &lt;password&gt;' to login to the terminal.", "green")
}
const writeconsole = async (text:string, color:string) => {
    const consolehold = document.getElementById("consolehold");
    if (consolehold !== null){
        consolehold.innerHTML += "<p style=\"color:"+color+"; width: 100%;\">"+text.replace("<", '&lt;').replace(">", '&gt;')+"</p>";
        consolehold.children[consolehold.children.length-1].scrollIntoView();
    }
}
const codelogicterm = async () => {
    const usercmd = document.getElementsByTagName("input")[0].value;
    writeconsole("$ "+usercmd, "green")
    document.getElementsByTagName("input")[0].value = ""
    if (usercmd.split(" ")[0] == "logon" && usercmd.split(" ")[1] !== undefined && usercmd.split(" ")[2] !== undefined){
        user = usercmd.split(" ")[1];
        pass = usercmd.split(" ")[2];
        logicreq(user+":"+pass)
    } else {
        logicreq(usercmd)
    }
}
const logicreq = async (cmd:string) => {
    const json = JSON.stringify({
        user: user,
        pass: pass,
        input: cmd,
        location: "/"
    })
    console.log(json)
    const msgraw = await reqterm("https://hermatrix.net/submitConsole", json)
    if (msgraw !== undefined) {
        const msg = JSON.parse(msgraw)
        for (let i = 0; i <msg.data.length; i++){
            writeconsole(msg.data[i].content, msg.data[i].color);
        }
    }
}
const reqterm = async (url:string, data:string):Promise<any> => {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        Http.send(data);
        Http.onreadystatechange = function() {
            if(Http.readyState == 4 && Http.status == 200) {
                resolve(Http.responseText)
            } else if (Http.readyState == 4 && Http.status == 401){
                resolve('{"data":[{"new":false,"color":"pink","content":"Authentication Failed!"}],"location":"/"}')
            } else if (Http.readyState == 4 && Http.status != 200 && Http.status != 401){
                resolve(undefined)
            }
        }
      });
}