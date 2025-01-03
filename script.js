document.addEventListener("DOMContentLoaded", () => {
    const postButton = document.getElementById("post-button");
    const postInput = document.getElementById("post-input");
    const bodyInput = document.getElementById("body-input");
    const postsContainer = document.getElementById("posts-container");
    const imageInput = document.getElementById("image-input"); // Добавлено
    const counter = document.getElementById('char-counter');
    const maxLength = 300;

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        if (postsContainer) {
            posts.forEach(post => {
                const newPost = document.createElement("div");
                newPost.classList.add("post");

                const newPostLine = document.createElement("div");
                newPostLine.classList.add("postLine");

                const newPostLineNull = document.createElement("div");
                newPostLineNull.classList.add("postLineNull");

                const postTitle = document.createElement("h2");
                postTitle.textContent = post.title;

                const postBody = document.createElement("p");
                postBody.textContent = post.body;

                newPost.appendChild(postTitle);
                newPost.appendChild(postBody);

                if (post.imageUrl) {
                    const postImage = document.createElement("img");
                    postImage.src = post.imageUrl;
                    postImage.classList.add("imgContent");
                    newPost.appendChild(postImage);
                }

                postsContainer.appendChild(newPost);
                postsContainer.appendChild(newPostLine);
            });
        }
    }

    function savePost(postContent) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.unshift(postContent);
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    if (postButton) {
        postButton.addEventListener("click", () => {
            const postTitle = postInput.value.trim();
            const postBody = bodyInput.value.trim();

            if (postTitle === "") {
                alert("Пожалуйста, заполните все поля!");
                return;
            }
            if (postBody.length > 300) {
                alert("Слишком длинный текст. Максимальная длина — 300 символов.");
                return;
            }

            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const imageUrl = event.target.result;
                    const postContent = { title: postTitle, body: postBody, imageUrl: imageUrl };
                    savePost(postContent);
                    window.location.href = "index.html";
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                const postContent = { title: postTitle, body: postBody };
                savePost(postContent);
                window.location.href = "index.html";
            }
        });
    }

    const moreB = document.getElementById("moreB");
    const morePanel = document.getElementById("morePanel");
    let isVisibaly = false;

    if(!isVisibaly){
        morePanel.style.display = 'none';
    }
    else{
        morePanel.style.display = 'block';
    }

    moreB.addEventListener('click', () => {
    isVisibaly = !isVisibaly; // Переключаем флаг

    if (isVisibaly) {
        morePanel.style.display = 'block'; // Показываем панель
    } else {
        morePanel.style.display = 'none'; // Скрываем панель
    }
});


    if (postsContainer) {
        loadPosts();
    }

    postInput.addEventListener('input', () => {
        const remaining = maxLength - postInput.value.length;
        counter.textContent = remaining;
    });
});

function clearPosts() {
    const postsContainer = document.getElementById("posts-container");
    if (postsContainer) {
        postsContainer.innerHTML = "";
    }
    localStorage.removeItem("posts");
}