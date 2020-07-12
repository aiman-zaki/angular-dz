import { AuthService } from './../../core/auth/state/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(private router:Router,private authService:AuthService,private route:Router) { }

  onLogout(){
    this.authService.logout()
    this.router.navigateByUrl("/login")
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  ngOnInit(): void {
  }

}
