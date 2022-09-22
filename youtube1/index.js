

let q;
let search = async () => {
    let query = document.getElementById("query").value;
    let data = await getData(query);
    q = query;
    append(data)

}

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=In&key=AIzaSyD4pgJWOw4g5QRFe0vWcMKWNuKHOIJAhAs
// https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=20&key=AIzaSyD4pgJWOw4g5QRFe0vWcMKWNuKHOIJAhAs

let getData = async (query) => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyBsYPXySs1IrRjDOafY_DPVccrkETBTldY`;

    let res = await fetch(url)
    let data = await res.json();
    return (data.items);
    //    console.log(data.items);

};

let append = (data) => {
    let container = document.getElementById("container")
    container.innerHTML = null;
    data.forEach((el) => {
        // snippet ==> title
        //snippet ==> thumbnails----> medium------>url

        let { snippet: { title, thumbnails: { medium: { url } } } } = el;
        let img = document.createElement("img");

        img.src = url;

        let h3 = document.createElement("h3")

        h3.innerText = title;

        let div = document.createElement("div");

        div.setAttribute("class", "video")

        div.onclick = () => {
            saveViedo(el);
        }



        div.append(img, h3)
        container.append(div);
    })
}


let saveViedo = (data) => {
    localStorage.setItem("video", JSON.stringify(data));
    window.location.href = "appendviedo.html";
}

let filter = async () => {
    let data = await getData(q);
    let value = document.getElementById("channeltitle").value;
    console.log(value);

    data = data.filter(({snippet:{channelTitle,
    }})=>{
             return ( channelTitle==value)
    })
    console.log(data)
    append(data);
}




let defaultData = async () => {
    let url = ` https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=20&key=AIzaSyD4pgJWOw4g5QRFe0vWcMKWNuKHOIJAhAs`;

    let res = await fetch(url)

    let data = await res.json();

    append(data.items);

};
defaultData();


