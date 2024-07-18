import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../interface/fetch-users';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: User;
}
