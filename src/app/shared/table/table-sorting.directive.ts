import { TableStateHelper } from './table-state.helper.service';
import { Directive, EventEmitter, Input, Output, HostBinding, HostListener, OnInit, ElementRef, Renderer2 } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: 'asc', '': 'asc' };

export interface SortEvent {
  column: number;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortable]'
})
export class TableSortingDirective implements OnInit {

  @Input() sortable: number = 0;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  @Input() index:number

  constructor(private el: ElementRef,private service:TableStateHelper,private renderer: Renderer2,) {
    this.service.header = {
      index:this.index,
      el:el.nativeElement
    }
  }
  onReset(i:number){
    let arr = [...this.service.headers]
    arr.map((a) => {
      if(i != a.index){
        this.renderer.removeClass(a.el,'asc')
        this.renderer.removeClass(a.el,'desc')
      }

    })
  }
  @HostBinding('class.asc')
  get asc() {
    return this.direction === 'asc';
  }
  @HostBinding('class.desc')
  get desc() {
    return this.direction === 'desc';
  }
  @HostListener('click', ['$event','index'])
  onClick(event:any,i:number) {
    this.onReset(i)
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }

  ngOnInit(): void {
    if(this.index == 1){
      this.direction = 'asc'

    }
  }
}
