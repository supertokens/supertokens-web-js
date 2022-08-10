import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  errorText: string = "";
  successText: string = "";
  isCodeDelivered: boolean = false;

  constructor(private router: Router, private authService: AuthService) { 
    if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.errorText){
      this.errorText = this.router.getCurrentNavigation().extras.state.errorText;
    }
  }

  ngOnInit(): void {
  }

  onSubmit(inputs: { email?: string }){
      this.authService.sendCode(inputs).then((successText) => {
        this.successText = successText;
        this.errorText = "";
        this.isCodeDelivered = true; // Show popup for login code when this is true
      }).catch((err) => {
        // Set the error message
        this.errorText = err;
        this.successText = "";
        this.isCodeDelivered = false;
      })
  }

}
