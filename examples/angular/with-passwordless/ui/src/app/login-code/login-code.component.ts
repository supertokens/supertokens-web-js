import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-code',
  templateUrl: './login-code.component.html',
  styleUrls: ['./login-code.component.css']
})
export class LoginCodeComponent implements OnInit {


userInputCode: string = "";
  successText: string = "";
  errorText: string = "";
  isValidCode: boolean = false;

  constructor(private router: Router, private authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  onSubmit(inputs: { userInputCode?: string }){
    this.authService.consumeCode(inputs).then((successText) => {
      // User authenticated. Redirect to the next page.
      this.successText = successText;
      this.errorText = "";
      this.isValidCode = true;
      this.router.navigate(["/dashboard"]);
    }).catch((err) => {
      // Set the error message
      this.errorText = err;
      this.successText = "";
      this.isValidCode = false;
    })
  }

}
