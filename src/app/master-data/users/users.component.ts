import { Observable } from 'rxjs';
import { UsersQuery } from './state/users.query';
import { UsersService } from './state/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from './state/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$:Observable<User[]>

  constructor(private service:UsersService,private query:UsersQuery) { }

  ngOnInit(): void {
    this.service.get().subscribe()
    this.users$ = this.query.selectAll()


  }

}
