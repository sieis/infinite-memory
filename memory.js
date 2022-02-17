fetch('./verse.json')
    .then(response => response.json())
    .then (data => displayVerses(data))
    .catch((err)=>console.log('error: '+err))

displayVerses = (data)=>{
    const list = document.querySelector(`.cards`)
    const references=document.querySelector(`.references`)
    data.forEach(i => {
        list.innerHTML+=`<div id="${i.location+"verse"}" class="card my-2 mx-5">
                            <div class="card-body">
                                <h5 class="card-title">${i.location}</h5>
                                <p class="card-text" id="${i.location+"text"}">${i.verse}</p>
                            </div>
                            <div id="${i.location+"footer"}" class="card-footer text-center" style="display:none">
                                <button id="${i.location+"btn"}" class="btn btn-primary">Toggle Verse</button>
                            </div>
                        </div>`
                        references.innerHTML += `<li id="${i.location}" class="btn btn-primary m-1 p-2">${i.location}</li>`
    });
    data.forEach(i => {
        let verse = i.verse.split(" ")
        console.log(verse)
        console.log("length: ", i.verse.length, "\nlength random marker: ", Math.floor(Math.random()*i.verse.length))
        let x = document.getElementById(`${i.location}`);
        let y =document.getElementById(`${i.location+"verse"}`);
        let z =document.getElementById(`${i.location+"footer"}`);
        let b =document.getElementById(`${i.location+"btn"}`);
        let t = document.getElementById(`${i.location+"text"}`)
        x.onclick =changeBackground=()=>{
            y.classList.toggle("togglebackground");
            if (z.style.display==="none") {
                z.style.display="block"
            }else{
                z.style.display="none";
            }
        }
        b.onclick=memorize=()=>{
            let randNum=Math.floor(Math.random()*verse.length);
            verse.splice(randNum,1);
            // verse[randNum]="xxx"
            t.innerHTML = verse.join(" ");
            console.log(t.innerHTML);
            randNum = Math.floor(Math.random()*verse.length);
        }
        // b.onclick=memorize=()=>{
        //     if(t.style.display==="none"){
        //         t.style.display="block";
        //     }else{
        //         t.style.display="none";
        //     }
        // }
    });  
    
}


// https://source.unsplash.com/random/600×400/?river