const baseURL = 'https://apis.scrimba.com/jsonplaceholder/';
const endPointPost = 'posts'

const blogContainer = document.querySelector('.blog-container');

fetch(baseURL+endPointPost, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        const postArr = data.slice(0, 5);
        console.log( postArr)
        blogContainer.innerHTML = postArr.map((num) => {
            return  `
                        <div class="blog-title">
                            <h2>${num.title}</h2>
                        </div>
                        <div class="blog-body">
                            <p>${num.body}</p>
                        </div>  
                    `
        })
        
                               

    })