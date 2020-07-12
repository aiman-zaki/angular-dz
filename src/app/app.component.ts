import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationStart } from '@angular/router'
import {BehaviorSubject} from 'rxjs'
import { throws } from 'assert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader$:BehaviorSubject<boolean> = new BehaviorSubject(true)

  showHeader(){
    this.router.events.subscribe( event => {
      if(event instanceof NavigationStart){
        if(event.url.search(/(login|register)/g) > 0  ){
          this.showHeader$.next(false)
        } else {
          this.showHeader$.next(true)
        }
      }
    })
   }

  constructor(private router:Router){

  }
  ngOnInit(): void {
    this.showHeader()
    this.showHeader$.subscribe(res => console.log(res))
  }

  title = 'angular-deZ';

}
