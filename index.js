const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategories(data.data))
}

const showCategories = data => {
    //   captur the all categories container to append links
    const categoriesContainer = document.getElementById('categories-container');

    data.news_category.forEach(singleCategory => {
        let linkContainer = document.createElement('p')
        linkContainer.innerHTML = `
    <a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')">${singleCategory.category_name}</a>

    `;
        categoriesContainer.appendChild(linkContainer)
    })
}

// all news is abvlabale in category

const fetchCategoryNews = (category_id, category_name) => {
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showAllNews(data.data, category_name))
}

const showAllNews = (data, category_name) => {
    // console.log(data, category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = "";
    data.forEach(singleNews => {
        const {_id, image_url, title, details, author,total_view} = singleNews;
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4 d-flex flex-column">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.slice(0, 200)}...
              </p>
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-between">
                 <div class="d-flex gap-2">
                    <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40px" width="40px">
                   <div>
                     <p class="m-0 p-0">${author.name}</p>
                    <p class="m-0 p-0">${author.published_date}</p>
                   </div class="d-flex align-items-center">
                    <i class= "fas fa-eye"></i>
                    <p class="m-0 p-0">${total_view}</p>
                </div>
                <div>
                    <i class= "fas fa-star"></i>
                 </div>
                 <div>
                    <i class= "fas fa-arrow-right" onclick="showNewsDetails('${_id}')"></i>
                 </div>
            </div>
          </div>
        </div>
        `;
        newsContainer.appendChild(card);

    })
}

const showNewsDetails = news_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    console.log(url);
}