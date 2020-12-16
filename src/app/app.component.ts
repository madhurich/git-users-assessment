import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  repos: Array<any>;

  constructor(private http: HttpClient) {
    this.getUserRepos();
  }

  getUserRepos() {
    // 1.	Repository name - name
    // 2.	Repository description 
    // 3.	Number of stars for the repo. stargazers_count
    // 4.	Number of issues for the repo. open_issues_count
    // 5.	Username and avatar of the owner. login avatar_url
    // 6.	As a User I should be able to keep scrolling and new results should appear (pagination).

    const url = `https://api.github.com/search/repositories?q=created:%3E2020-05-22&sort=stars&order=desc&page=1`;
    return this.http.get(url)
      .subscribe((res: any) => {
        console.log(res);
        this.repos = res.items;
      })
  }
}
