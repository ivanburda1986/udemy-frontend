class Github {
  constructor() {
    this.client_id = '2bb7d41a6ef18bfdc444';
    this.client_secret = '77034ea82c9c9e6b9e4e53400071ec8e993aaf33';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const profile = await profileResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const repos = await reposResponse.json();

    return {
      profile,
      repos
    }
  }

}