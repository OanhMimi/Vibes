import { AfterViewInit, Component } from '@angular/core';
import { ElementRef} from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs';
import { ViewChild, HostListener } from '@angular/core';



@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css']
})
export class BackdropComponent implements AfterViewInit {
  @ViewChild('sunLayer') sunLayer! : ElementRef
  @ViewChild('rightMt4') rightMt4!: ElementRef
  @ViewChild('leftMt2') leftMt2!: ElementRef
  @ViewChild('bird1') bird1!: ElementRef
  @ViewChild('bird2') bird2!: ElementRef


  @HostListener('window:scroll')
  ngAfterViewInit() {
  fromEvent(window, 'scroll').pipe(
    throttleTime(100)
  ).subscribe(() => this.onWindowScroll())
}

  onWindowScroll() {
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    this.bird1.nativeElement.style.right = (0 + (scrollPos * 1)) + "px";

    if (scrollPos < 600) {
      this.sunLayer.nativeElement.style.top = -(scrollPos * 0.25) + "px";
      this.sunLayer.nativeElement.style.right = (scrollPos)+ "px";
      this.rightMt4.nativeElement.style.bottom = (0 - (scrollPos * 0.05)) + "px";
    }

    if (scrollPos > 600) {
      this.rightMt4.nativeElement.style.bottom = (0 - (scrollPos * 0.05)) + "px";
      this.leftMt2.nativeElement.style.bottom = (0 - (scrollPos * 0.08)) + "px";
    }

  }
}
