let apiURL="https://66e84a14b17821a9d9dc20f9.mockapi.io/users";

let email=document.getElementById('emailInput')

let pass=document.getElementById('passInput')

let loginBTN=document.getElementById('signinBTN')


loginBTN.addEventListener("click", () => {

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log("userData")

            let userData = data.filter(element => email.value == element.email && pass.value == element.password);
            console.log("userData")
            if (userData.length>0) {
                let userId = userData[0].id;
                sessionStorage.setItem('userId', userId);
                console.log(sessionStorage.getItem('userId'));
                window.location.href = "index.html";
            } else {
                window.alert("Incorrect email or password");
            }


        })


})