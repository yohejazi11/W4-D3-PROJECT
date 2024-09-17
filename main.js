let apiURL = "https://66e84a14b17821a9d9dc20f9.mockapi.io/posts";

let userId = sessionStorage.getItem('userId');

let postContainer=document.getElementById('publicPostsContainer');

let nav=document.getElementById('navUl')
let signA=document.getElementById('signA')
let loginA=document.getElementById('loginA')

if(userId>0)
{
    signA.remove()
    loginA.remove()
    let profileA=document.createElement('a')
    let profileLI=document.createElement('li')
    profileA.setAttribute('href','profile.html')
    profileA.textContent="Profile";
    profileLI.appendChild(profileA)
    nav.appendChild(profileLI)
}

fetch(apiURL)
.then(response =>response.json())
.then(data => {


    data.forEach(element => {
        let postBox=document.createElement('div');
        let title=document.createElement('h2');
        let postText=document.createElement('p')


        postBox.setAttribute('class','post-box')
        title.setAttribute('class','post-title')
        postText.setAttribute('class','post-text')
        postBox.setAttribute('id','postBox')
        title.setAttribute('id','postTitle')
        postText.setAttribute('id','postText')


        title.textContent=element.title;
        postText.textContent=element.postText;

        postBox.appendChild(title)
        postBox.appendChild(postText)
        postContainer.appendChild(postBox)



    });
})


let postTitle = document.getElementById('postTitle');

let postContent = document.getElementById('postContent');

let addPostBTN = document.getElementById('addPostBTN');



addPostBTN.addEventListener("click", () => {
    if (postTitle.value.length <0) {
        window.alert("title should be more the five charachter")
    }
    else if (postContent.value.length<=0) {
        window.alert("please enter a post content")

    }
    else {
        fetch(apiURL, {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle.value,
                postText: postContent.value,
                postOwner:userId
            }),
            headers: { "Content-Type": "application/json" }
        })
        setInterval(()=>{  
        window.location.reload();
        },1000)

    }
})