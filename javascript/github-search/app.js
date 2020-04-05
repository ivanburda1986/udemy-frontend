//Initializ Github
const github = new Github;

//Initialize the UI
const ui = new UI;

//Search input
const searchUser = document.getElementById('searchUser');

//Search input event listener
searchUser.addEventListener('keyup', (e) => {
  //Get input text
  const userText = e.target.value;

  if (userText !== '') {
    //Make an HTTP call
    github.getUser(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          // console.log(data);
          ui.showAlert('User not found', 'alert alert-danger');
        } else {
          //Show the profile
          ui.showProfile(data.profile);
          // SHow repos
          ui.showRepos(data.repos);
        }
      })

  } else {
    // Clear the displayed profile data
    ui.clearProfile();
  }
});