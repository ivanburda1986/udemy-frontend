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
        if (data.profile.message === 'Not found') {
          //Show alert that the user cannot be found
          console.log('nothing found');
        } else {
          //Show the profile
          ui.showProfile(data.profile);
        }
      })

  } else {
    // Clear the displayed profile data
    console.log('cleared');
  }
});