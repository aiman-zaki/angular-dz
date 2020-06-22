import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../state/branches.service';
import { BranchesQuery } from '../state/branches.query';
import { Branch } from '../state/branch.model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  loading$:Observable<boolean>
  branches$:Observable<Branch[]>

  constructor(private service:BranchesService,private query:BranchesQuery,private route:ActivatedRoute,private router:Router) { }

  onNaviateToStock(branch:Branch){
    this.router.navigateByUrl(`/stocks/${branch.id}`)
  }


  ngOnInit(): void {
    this.service.get().subscribe()
    this.loading$ = this.query.selectLoading()
    this.branches$ = this.query.selectAll()


  }

}
