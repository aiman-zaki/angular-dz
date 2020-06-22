import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(private router:Router) { }

  showHeader():boolean{
   if (this.router.url.search(/(login|register)/g)){
     return false
   }
   return true

  }


  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  ngOnInit(): void {
    console.log("header")
  }

}
