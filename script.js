const api_key = "d204c5a699c24fc58800abcd7f9a837a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
  const res = await fetch(`${url}${query}&apiKey=${api_key}`);
  const data = await res.json();
  bindData(data.articles);
}

function reload(){
  window.location.reload();
}

function bindData(articles){
  const cardContainer = document.getElementById('card-container');
  const newCardTemplate = document.getElementById('template_card');

  cardContainer.innerHTML = "";

  articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone = newCardTemplate.content.cloneNode(true);
    fillData(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillData(cardClone, article){
  const newsImg = cardClone.querySelector('#news_image');
  const newsTitle = cardClone.querySelector('#news_title');
  const newsSource = cardClone.querySelector('#news_source');
  const newsText = cardClone.querySelector('#news_text');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsText.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Jakarta"
  });

  newsSource.innerHTML = `${article.source.name} ● ${date}`;

  cardClone.firstElementChild.addEventListener('click', () => {
    window.open(article.url, "_blank");
  })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const search = document.getElementById('search_button');
const text = document.getElementById('search_input');

search.addEventListener('click', () => {
  const query = text.value;
  if(!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
})