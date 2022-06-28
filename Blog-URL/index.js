const baseURL = 'https://apis.scrimba.com/jsonplaceholder/';
const endPointPost = 'posts'

const blogForm = document.getElementById('blog-form')
const blogContainer = document.querySelector('.blog-container');
const postBlogButton = document.getElementById('post-blog');
const postBlogTitle = document.getElementById('blog-form-title')
const postBlogBody = document.getElementById('blog-form-body')

fetch(baseURL+endPointPost, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        const postArr = data.slice(0, 5);
        console.log( postArr)
        blogContainer.innerHTML = postArr.map((num) => {
            return  `
                        <div class="blog-post">
                            <div class="blog-title">
                                <h2>${num.title}</h2>
                            </div>
                            <div class="blog-body">
                                <p>${num.body}</p>
                            </div> 
                        </div> 
                    `
        }).join('');
    })

blogForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("button pressed");

    const blogFormTitle = postBlogTitle.value;
    const blogFormBody = postBlogBody.value;

    const postFormData = {title: blogFormTitle, body: blogFormBody}
    console.log(postFormData)

   
    
})