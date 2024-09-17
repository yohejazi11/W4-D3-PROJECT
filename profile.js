let apiPost = "https://66e84a14b17821a9d9dc20f9.mockapi.io/posts";
let userId = sessionStorage.getItem('userId');
let apiUser="https://66e84a14b17821a9d9dc20f9.mockapi.io/users/"+userId;

let postContainer = document.getElementById('myPostsContainer');

let nav = document.getElementById('navUl')
let signA = document.getElementById('signA')
let loginA = document.getElementById('loginA')

if (userId > 0) {
    signA.remove()
    loginA.remove()
    let profileA = document.createElement('a')
    let profileLI = document.createElement('li')
    profileA.setAttribute('href', 'profile.html')
    profileA.textContent = "Profile";
    profileLI.appendChild(profileA)
    nav.appendChild(profileLI)
    let userName=document.getElementById('userName')
    let userAbout=document.getElementById('userAbout')
    fetch(apiUser)
    .then(response => response.json)
    .then(data => {
        userName.textContent=data.username
        userAbout.textContent=data.about
    })
}

fetch(apiPost)
    .then(response => response.json())
    .then(data => {

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(element => {
                if (element.postOwner == userId) {
                    let postBox = document.createElement('div');
                    let title = document.createElement('h2');
                    let postText = document.createElement('p')
                    let deletPostBTN = document.createElement('button');

                    postBox.setAttribute('class', 'post-box')
                    title.setAttribute('class', 'post-title')
                    postText.setAttribute('class', 'post-text')
                    deletPostBTN.setAttribute('class', 'delet-post-btn')
                    postBox.setAttribute('id', 'postBox')
                    title.setAttribute('id', 'postTitle')
                    postText.setAttribute('id', 'postText')


                    title.textContent = element.title;
                    postText.textContent = element.postText;
                    deletPostBTN.textContent = "Delete"
                    postBox.appendChild(title)
                    postBox.appendChild(postText)
                    postBox.appendChild(deletPostBTN)
                    postContainer.appendChild(postBox)

                    deletPostBTN.addEventListener("click", () => {
                        fetch(apiPost + "/" + element.id, {
                            method: 'DELETE',
                            headers: { "Content-Type": "application/json" }

                        })
                        postBox.remove()
                    })
                }


            });
        }
        else {
            let message = document.createElement('h1')
            message.setAttribute('class', 'message')
            message.textContent = "oops you dont add any post yet !";
            postContainer.appendChild(message)
        }
    })


let postTitle = document.getElementById('postTitle');

let postContent = document.getElementById('postContent');

let addPostBTN = document.getElementById('addPostBTN');



addPostBTN.addEventListener("click", () => {
    if (postTitle.value.length < 0) {
        window.alert("title should be more the five charachter")
    }
    else if (postContent.value.length <= 0) {
        window.alert("please enter a post content")

    }
    else {
        fetch(apiPost, {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle.value,
                postText: postContent.value,
                postOwner: userId
            }),
            headers: { "Content-Type": "application/json" }
        })
    }

})