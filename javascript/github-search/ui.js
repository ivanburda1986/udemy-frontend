class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  //Display profile and the UI
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary mb-1">Public repos: ${user.public_repos}</span>
          <span class="badge badge-secondary mb-1">Public gists: ${user.gists}</span>
          <span class="badge badge-success mb-1">Followers: ${user.followers}</span>
          <span class="badge badge-info mb-1">Following: ${user.following}</span>
          <br/><br/>
          <ul class="list-group">
          <li class="list-group-item">Company: ${user.company}</li>
          <li class="list-group-item">Website/Blog: ${user.blog}</li>
          <li class="list-group-item">Location: ${user.location}</li>
          <li class="list-group-item">Member since: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>    
    `;
  }

  // Show user repos
  showRepos(repos) {
    let output = '';

    repos.forEach(function (repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary mb-1">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary mb-1">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success mb-1">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `
    });

    //Output the repositories
    document.getElementById('repos').innerHTML = output;
  }

  //Show alert message
  showAlert(message, className) {
    //Clear any remaining alerts
    this.clearAlert();
    //Create a div
    const div = document.createElement('div');
    //Add classes
    div.className = className;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get the parent to insert the div with the text to
    const container = document.querySelector('.searchContainer');
    //Get the serachbox
    const search = document.querySelector('.search');
    //Insert the alert
    container.insertBefore(div, search); //The params are: what: div, where to before: search

    //Timeout after 1 sec to get rid of the error message
    setTimeout(() => {
      this.clearAlert();
    }, 1000)
  }
  //Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }


  //Clear profile display
  clearProfile() {
    //Clear the area with profile information
    this.profile.innerHTML = '';
  }
}