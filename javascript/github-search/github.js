class Github {
  constructor() {
    this.client_id = '2bb7d41a6ef18bfdc444';
    this.client_secret = '77034ea82c9c9e6b9e4e53400071ec8e993aaf33';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const profile = await profileResponse.json();

    return {
      profile
    }
  }

}