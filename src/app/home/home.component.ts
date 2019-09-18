import { Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos: any[] = [];
  page: number = 1; 
  
  activemodel = false;
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.getRandomPhotos();
  }

  getRandomPhotos = function() {
    let headers = new HttpHeaders({
      'Authorization': 'Client-ID e4b42a6225d354120f69538d981c718b9de8613bd21e57398e0997c25ed6f9f2'
    });
    let options = {
      headers: headers
    }
  
    return this.http.get('https://api.unsplash.com/photos/?page='+this.page, options).subscribe((data: any) => this.onSuccess(data)
    )
  }

  onSuccess(res) {   
    if (res != undefined) {  
      res.forEach(item => {  
        this.photos.push(item);  
      });  
    }  
  } 

  onScroll()  
  {    
    this.page = this.page + 1;  
    this.getRandomPhotos();  
  }

  openModal(url) {
    const modalRef = this.modalService.open(NgbdModalContent,{ size: 'lg' });
    modalRef.componentInstance.imageSrc = url;
    console.log(url);
  }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `<div>
  <div class="modal-header" style="  background: #4267b2!important;
  color: white; height:50px;">
      <h5 class="modal-title text-white">Image</h5>
      <button type="button" class="close text-white" aria-label="Close" style="  background: #4267b2!important;
      color: white; height:50px;" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="background-color :#DADDE1;
     
    width: 100%; height: 100%; margin: 0 auto;">
      <img src="{{imageSrc}}" class="zoom img-fluid " style="width:800px;height:500px"
      alt="image">
    </div>
  
   <div class="col-lg-12 row bg-default" style="background-color :#DADDE1;
     
   width: 100%; height: 100%; margin: 0 auto;" >
   
   <div class="form-group col-lg-2" style="font-size:19px;">
      <button class="btn btn-link btn-md" (click)="addOrRemoveLike()"><b>Like</b></button>
      <b><button *ngIf="liked"><i title="dislike"  class="fa fa-thumbs-up text-primary" (click)="addOrRemoveLike()"></i></button></b>
      </div>
      <div class="form-group col-lg-2">
      <button class="btn btn-link btn-md h5" ><b>Comment</b></button></div>
      </div>
     
    <div class="modal-footer">
      <input type="text" [(ngModel)]="commentsText" class="form-control" id="comment">
      <span><button (click)="addComments(commentsText)" style="background-color: #4267b2!important;" type="button" class="btn btn-md  text-white">Post</button></span>
      <br/><br/>
    </div>
    <div *ngFor="let text of comments;">
    <div><div class="container"><label style=" font-size: 17px;color: #4267b2!important;">user</label>:&nbsp;&nbsp;
      <span  style="font-size: 17px">{{text.comments}}</span></div></div>
 <hr/> 
    </div>
</div>
    
  `
})
export class NgbdModalContent {
  @Input() imageSrc;
  liked: boolean = false;
  comments: any[] = [];

  constructor(public activeModal: NgbActiveModal) {}

  addOrRemoveLike = function() {
    this.liked = !this.liked;
  }

  addComments = function(text) {
    var data = {
      comments: text,
      date: Date.now()
    }
    this.comments.push(data);
    this.commentsText = null;
    
  }
  keytab(event){
    let element = event.srcElement.nextElementSibling; // get the sibling element
        element.focus();   // focus if not null
}
}