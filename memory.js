fetch('./verse.json')
    .then(response => response.json())
    .then(data => displayVerses(data))
    .catch((err) => console.log('error: ' + err))

displayVerses = (data) => {
    const list = document.querySelector(`.cards`)
    const references = document.querySelector(`.references`)
    let reset = document.querySelector('#reset')
    data.forEach(i => {
        list.innerHTML += `<div id="${i.location + "verse"}" class="card" style="display:none">
                            <div class="card-body text-center">
                                <h3 class="m-3 card-title">${i.location}</h3>
                                <p class="m-5 fs-5 card-text" id="${i.location + "text"}" >${i.verse}</p>

                                <div class="toggle m-3">
                                    <button id="${i.location + "btn"}" class="m-2 btn btn-danger">Remove Words</button>
                                    <button id="${i.location+"toggle"}" class="m-2 btn btn-info">Toggle Whole Verse</button>
                                </div>
                                <iframe width="88%" height="180" frameborder="no" scrolling="no" seamless src="https://share.transistor.fm/e/${i.podcast}"></iframe>
                                <form>
                                    <div class="px-5 my-3">
                                        <label for="memorySample" class="my-3 fs-4 form-label">Try to Type Verse</label>
                                        <textarea name="textarea" cols="6" rows="6" class="form-control" id="${i.location+"memory"}"></textarea>
                                    </div>
                                </form>
                                </div>
                                <div id="${i.location + "footer"}" class="card-footer text-center">
                                    <button id="${i.location+"check"}" class="my-3 btn btn-outline-primary">Check Typed Verse</button>
                                    <button id="${i.location+"reset-checker"}" class="my-3 btn verse-btn">Reset Checker</button>
                                </div>
                        </div>`
        references.innerHTML += `<li id="${i.location}" class="btn verse-btn m-1 p-2">${i.location}</li>`
    });
    data.forEach(i => {
        // split into an array of words separated by spaces
        let originalVerse = i.verse
        let verse = i.verse.split(" ")
        let x = document.getElementById(`${i.location}`);
        let y = document.getElementById(`${i.location + "verse"}`);
        // let z = document.getElementById(`${i.location + "footer"}`);
        let b = document.getElementById(`${i.location + "btn"}`);
        let t = document.getElementById(`${i.location + "text"}`)
        let hideVerse = document.getElementById(`${i.location+"toggle"}`)
        let wholeVerse = document.getElementById(`${i.location + "text"}`)
        let verseChecker = document.getElementById(`${i.location + "check"}`)
        let resetVerse = document.getElementById(`${i.location+"reset-checker"}`)
        // console.log(x, y, z, b, t)
        x.onclick = showCard = () => {
            if (y.style.display === "none") {
                y.style.display = "block"
            } else {
                y.style.display = "none";
            }
        }

        b.onclick = memorize = () => {
            let randNum = Math.floor(Math.random() * verse.length);
            // remove one word from verse array based on random position
            verse.splice(randNum, 1);
            // join remaining words into string
            t.innerHTML = verse.join(" ");
            randNum = Math.floor(Math.random() * verse.length);
            console.log(t.innerHTML)
        }
        reset.onclick = () => {
            location.reload()
        }
        hideVerse.onclick = showWords =() =>{
            if(wholeVerse.style.display === "none"){
                wholeVerse.style.display = "block"
            } else{
                wholeVerse.style.display = "none"
            }
        }
        verseChecker.onclick = () =>{
            let typedVerse = document.getElementById(`${i.location+"memory"}`)
            console.log("typed verse: ",typedVerse.value.toLowerCase(),"\noriginal verse: ", originalVerse.toLowerCase())
            if(typedVerse.value.toLowerCase() === originalVerse.toLowerCase()){
                // change background of card to green
                // downside: punctuation matters. this'll only turn green if you get everything exactly right (other than capitalization)
                y.style.backgroundColor = "#62fc89"
            }else{
                // change background of card to red
                y.style.backgroundColor = "#fc6262"
            }
        }
        resetVerse.onclick = () =>{
            let typedVerse = document.getElementById(`${i.location+"memory"}`)
            y.style.backgroundColor="#fff"
            typedVerse.value = ""
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