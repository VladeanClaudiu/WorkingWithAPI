const baseURL = 'https://apis.scrimba.com/jsonplaceholder/';
const endPointPost = 'posts'

const blogForm = document.getElementById('blog-form')
const blogContainer = document.querySelector('.blog-container');
const postBlogButton = document.getElementById('post-blog');
const postblogTitle = document.getElementById('blog-form-title')
const postblogBody = document.getElementById('blog-form-body')

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

    const formData = new FormData(event.target);
    blogFormObject = {};

    for(const [fieldName] of formData) {
        const fieldValue = formData.getAll(fieldName);
        blogFormObject[fieldName] = fieldValue.length == 1 ? fieldValue.toString() : fieldValue
    }

    console.log('blogForm', blogFormObject)
    
})