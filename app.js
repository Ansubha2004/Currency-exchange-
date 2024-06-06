const input=document.querySelector("input");
const URL="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hiCykR7PIjW31Kjlok9x0ix0zdbsO3lVsXiMambl&base_currency=";
const select=document.querySelectorAll(".select select");
const image=select.parentElemen
for(let s of select)
    {
        for(let code in countryList)
            {
                const options=document.createElement("option");
                options.value=countryList[code];
                options.innerText=code;
                if(s.name==="from")
                    {
                        if(options.value==="US")
                            options.selected=true;
                    }
                    if(s.name==="to")
                        {
                            if(options.value==="IN")
                                options.selected=true;
                        }
                s.append(options); 
            }
        s.addEventListener("change",(e)=>{
            console.log(e.target);
            updateflag(e.target);
        });
    }
const updateflag=(element)=>{
    let currentcountry=element.value;
    console.log(currentcountry);
    let image=element.parentElement.children[0];
    let flaglink="https://flagsapi.com/".concat(currentcountry.concat("/flat/64.png"));
    image.src=flaglink;
};
const country=(i)=>{
    let s;
    for(let c in countryList)
        {
            if(countryList[c]===select[i].value)
                {
                    s=c;
                    return s;
                }
        }
}
async function exchangecurrency()
    {
        let i=input.value;
        console.log(i);
        if(i<=0 || i=="")
            input.value=1;
        else{
        let basecountry=country(0);
        let newlink=URL.concat(basecountry);
        let response= await fetch(newlink);
        let DATA=await response.json();
        let tocountry=country(1);
        let rate=DATA["data"][tocountry];
        display(basecountry,tocountry,rate);}
    }
const display=(b,t,r)=>{
    const result=document.querySelector("#result");
    let val=input.value*r;
    console.log(val);
    result.innerText=input.value+" "+b+" = "+val+" "+t;
};
const submit=document.querySelector("button");
submit.addEventListener("click",()=>{
    exchangecurrency();   
})