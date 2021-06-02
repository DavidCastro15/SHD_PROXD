import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  albums:any;
  constructor(private userService:UserService,
              private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = +params['id'];
      this.getAlbumsId(id);
  });


  
  }

  getAlbumsId(id: number){
    this.userService.getAlbums(id).subscribe(res =>{
      this.albums = res;
      console.log(res);
      
    })
  }

}
