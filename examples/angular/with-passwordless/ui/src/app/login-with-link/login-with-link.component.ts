import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-with-link',
  templateUrl: './login-with-link.component.html',
  styleUrls: ['./login-with-link.component.css']
})
export class LoginWithLinkComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    // Automatically picks the code from the link in address bar and authenticates
    this.authService.consumeCodeFromLink().then((successText) => {
      // User authenticated. Redirect to the next page.
      this.router.navigate(["/dashboard"]);
    }).catch((err) => {
      // Set the error message
      console.log("Error in verifying code");
      console.log(err);
      this.router.navigate(["/login"], { state: { errorText: err }});
    })
  }

}
