import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  repos: Array<any>;
  pageNumber = 1;

  constructor(private http: HttpClient) {
    this.setRepos(this.pageNumber)
  }

  setRepos(pageNum) {
    this.getUserRepos(pageNum)
      .subscribe((res: any) => {
        this.repos = this.repos ? [...this.repos, ...res.items] : res.items; 
      });
  }

  getUserRepos(pageNum) {
    // 1.	Repository name - name
    // 2.	Repository description 
    // 3.	Number of stars for the repo. stargazers_count
    // 4.	Number of issues for the repo. open_issues_count
    // 5.	Username and avatar of the owner. login avatar_url
    // 6.	As a User I should be able to keep scrolling and new results should appear (pagination).

    const url = `https://api.github.com/search/repositories?q=created:%3E2020-05-22&sort=stars&order=desc&page=${pageNum}`;
    return this.http.get(url);
  }
  
  onScrollDown() {
    console.log('scrolled down');
    this.pageNumber++;
    this.setRepos(this.pageNumber);
  }

  uniqueRepoId(index, repo) {
    return repo.id;
  }
}
