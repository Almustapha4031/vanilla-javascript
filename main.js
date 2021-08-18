const gitHubApiUrl = 'https://api.github.com/users/';
const form = document.querySelector('form');
const search = document.getElementById('search');

async function getProfile(username){
    const res = await fetch(gitHubApiUrl + username)
    const resData = await res.json();
    createCard(resData);
    getRepositories(username);
    
   
}
getProfile('Almustapha4031');
function createCard(profile){
   const main = document.querySelector('main');
   profile.email = 'almustaphaukur00@gmail.com';
    const divHTML = `
                    <div class="card">
                       
                            <img class="avater_img" src="${profile.avatar_url}" alt="${profile.name}" >
                       
                        <div class="user_info">
                            <h2>${profile.name}</h2>
                            <p>${profile.bio}</p>
                            <p>${profile.email}</p>
                            <p>${profile.location}</p>
                            <ul>
                                <li>${profile.followers}<strong>followers</strong></li>
                                <li>${profile.following}<strong>followers</strong></li>
                                <li>${profile.public_repos}<strong>repositories</strong></li>
                            </ul>
                            <h4>Repositoies: </h4>
                        <div id="repos"></div>
                        </div>
                        
                    </div>
                    `;
                    main.innerHTML = divHTML;

}

async function getRepositories(username){
    const res = await fetch(gitHubApiUrl + username + '/repos');
    const resData = await res.json();


    console.log(resData);
    addRepository(resData);
}

function addRepository(respose){
    let reposEl = document.getElementById('repos');

    respose.forEach(elem => {
        const a = document.createElement('a');
        a.href = `${elem.html_url}`;
        a.classList.add('replink');
        a.target = '_blank';
        a.innerText = `${elem.name}`; 
        reposEl.appendChild(a);   
    });
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchkey = search.value;
    if(searchkey){
        getProfile(searchkey);
    }
    
    search.value = '';
})

