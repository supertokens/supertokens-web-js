import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(){
    console.log("Logging out");
    this.authService.logout().then(() => {
      this.router.navigate(["/login"]);
    }).catch(() => {
      console.log("Enter again or resend code");
    })
  }

}
