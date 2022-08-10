import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: { email?: string, userId?: string } = {};

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.getUserIdAndPayload().then((userAndPayloadInfo) => {
      console.log(JSON.stringify(userAndPayloadInfo));
      Object.assign(this.user, userAndPayloadInfo);
    }).catch((err) => {
      console.log(err);
      this.router.navigate["/login"];
    })
    // this.userService.getUser().subscribe({
    //   next: (user: Object) => {
    //     console.log(user);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // })
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
