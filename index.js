let postsArray = [];
let title = document.getElementById("title-input");
let body = document.getElementById("body-input");

function renderPosts() {
    let html = "";
    for (let post of postsArray) {
        html += `
        <h2 class="title">${post.title}</h2>
        <p class="body">${post.body}</p>
        <hr>
        `   
    }
    document.getElementById("post-list").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0,7);
        console.log(postsArray);
        renderPosts();
    })


document.getElementById("add-post").addEventListener("click", function(event){
    event.preventDefault();

    if (title.value !== "" && body.value !== "") {
        let postObj = {
            title: title.value,
            body: body.value
        };
        fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
            method: "POST",
            body: JSON.stringify({
                title: postObj.title,
                body: postObj.body
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(res => res.json())
            .then(data =>  {
                console.log(data);
                postsArray.unshift(data);
                renderPosts();

            })
                                      
            title.value = "";
            body.value = "";
    }
})