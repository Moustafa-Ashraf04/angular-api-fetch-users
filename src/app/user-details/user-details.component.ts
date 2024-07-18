import { ActivatedRoute, Route } from '@angular/router';
import { FetchUsersService } from './../fetch-users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interface/fetch-users';
import { UserCardComponent } from '../user-card/user-card.component';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [UserCardComponent, LoadingComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;
  id?: number;
  isloading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: FetchUsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.userService.getSingleUserDetails(this.id).subscribe((data) => {
        this.userDetails = data;
        this.isloading = false;
      });
    });
  }
}
