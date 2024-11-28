import API_KEY from "./apikey.js";

let allArticles;
const recentSection = document.querySelector(".recent");


let prevScroll = 0;
const title = document.getElementById("title");
window.addEventListener("scroll", () => {
    if (window.scrollY < prevScroll) {
        title.classList.remove("scroll-down");
        title.classList.add("scroll-up");
    }
    if (window.scrollY > prevScroll && window.scrollY > 300) {
        title.classList.remove("scroll-up");
        title.classList.add("scroll-down");
    }
    prevScroll = window.scrollY;

    if (window.scrollY < 5) {
        title.classList.remove("scroll-up");
        title.classList.remove("scroll-down");
    }
})


const headlines = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            allArticles = data.articles.filter((item) => {
                return item.content != '[Removed]' && item.urlToImage;
            })
            displayLatest(allArticles[0]);
            displayArticles(allArticles.slice(1,));
        });
}


const displayLatest = (item) => {
    // console.log(item);

    document.querySelector(".featured-img").src = item.urlToImage;
    const featured = document.querySelector(".featured-content");

    let heading = document.createElement("h1");
    heading.innerHTML = item.title;
    featured.appendChild(heading);

    let description = document.createElement("p");
    description.innerHTML = item.description;
    featured.appendChild(description);
}


const displayArticles = (data) => {
    data.forEach((item) => {
        // console.log(item);
        let recentPost = document.createElement("div");
        recentPost.className = "recent-post";

        let img = document.createElement("img");
        img.className = "img";
        img.src = item.urlToImage;
        recentPost.appendChild(img);

        let content = document.createElement("div");
        content.className = "content";

        let heading = document.createElement("h3");
        heading.innerHTML = item.title;
        content.appendChild(heading);

        let description = document.createElement("p");
        description.className = "description";
        description.innerHTML = item.description;
        description.title = item.description;
        content.appendChild(description);

        recentPost.appendChild(content);

        let page = document.createElement("a");
        page.href = item.url;
        page.appendChild(recentPost);

        recentSection.appendChild(page);

    })
}


headlines();