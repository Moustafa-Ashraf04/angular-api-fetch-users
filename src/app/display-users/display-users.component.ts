import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from '../user-card/user-card.component';
import { FetchUsersService } from '../fetch-users.service';
import { User } from '../interface/fetch-users';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-users',
  standalone: true,
  imports: [FormsModule, UserCardComponent, LoadingComponent, CommonModule],
  templateUrl: './display-users.component.html',
  styleUrl: './display-users.component.css',
})
export class DisplayUsersComponent implements OnInit {
  isloading: boolean = true;
  users: User[] = [];
  filteredUsers: User[] = [];
  pagedUsers: User[] = [];
  searchTerm: string = '';
  sortCriteria: string = 'name';

  totalItems: number = 0;
  pageSize: number = 3;
  currentPage: number = 0;

  constructor(private usersService: FetchUsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = this.users;
      this.totalItems = this.filteredUsers.length;
      this.updatePagedUsers();
      this.isloading = false;
    });
  }

  filterUsers() {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
    this.totalItems = this.filteredUsers.length;
    this.currentPage = 0;
    this.updatePagedUsers();
  }

  updatePagedUsers() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.getPageNumbers().length) {
      this.currentPage = page;
      this.updatePagedUsers();
    }
  }
}
