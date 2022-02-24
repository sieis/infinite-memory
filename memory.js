fetch('./verse.json')
    .then(response => response.json())
    .then(data => displayVerses(data))
    .catch((err) => console.log('error: ' + err))

displayVerses = (data) => {
    const list = document.querySelector(`.cards`)
    const references = document.querySelector(`.references`)
    let reset = document.querySelector('#reset')
    data.forEach(i => {
        list.innerHTML += `<div id="${i.location + "verse"}" class="card my-2 mx-5" style="display:none">
                            <div class="card-body">
                                <h5 class="card-title">${i.location}</h5>
                                <p class="card-text" id="${i.location + "text"}" style ="display: none">${i.verse}</p>
                                <iframe width="100%" height="180" frameborder="no" scrolling="no" seamless src="https://share.transistor.fm/e/${i.podcast}"></iframe>
                                <form>
                                    <div class="mb-3">
                                        <label for="memorySample" class="form-label">Try to Type Verse</label>
                                        <textarea name="textarea" cols="6" rows="6" class="form-control" id="${i.location+"memory"}"></textarea>
                                    </div>
                                </form>
                                    <button id="${i.location+"check"}" class="btn btn-primary">Submit</button>
                            </div>
                            <div id="${i.location + "footer"}" class="card-footer text-center">
                                <button id="${i.location + "btn"}" class="btn btn-primary">One Word at a Time</button>
                                <button id="${i.location+"toggle"}" class="btn btn-primary">Whole Verse</button>
                            </div>
                        </div>`
        references.innerHTML += `<li id="${i.location}" class="btn btn-primary btn-sm m-1 p-2">${i.location}</li>`
    });
    data.forEach(i => {
        // split into an array of words separated by spaces
        let verse = i.verse.split(" ")
        // dummy checks
        // console.log(verse)
        // console.log("length: ", i.verse.length, "\nlength random marker: ", Math.floor(Math.random() * i.verse.length))
        let x = document.getElementById(`${i.location}`);
        let y = document.getElementById(`${i.location + "verse"}`);
        let z = document.getElementById(`${i.location + "footer"}`);
        let b = document.getElementById(`${i.location + "btn"}`);
        let t = document.getElementById(`${i.location + "text"}`)
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