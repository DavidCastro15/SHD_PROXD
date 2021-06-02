import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  identity:any;
  photos:any;
  constructor(private activatedRouter:ActivatedRoute,
              private userService:UserService,
              public actionSheetController:ActionSheetController,
              private router:Router) {
                this.identity = this.userService.getIdentity(); 
              }


    ngOnInit(): void{
      this.activatedRouter.params.subscribe( params =>{
        let id = +params['id'];
        this.getPhotos(id);
        
      })
    }

    getPhotos(id){
      this.userService.getPhotosAlbums(id).subscribe(res =>{
        console.log(res);
        
        this.photos = res;
      })

    }

    returnAlbums(){
      this.router.navigate([`/tabs/tab1/${this.identity.id}`]);

    }
    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Noticia',
        buttons: [{
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            navigator.share({ text: this.photos.title,url:'https://via.placeholder.com'});
          }
        }, {
          text: 'Favoritos',
          icon: 'heart',
          handler: () => {
           
  
  
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },]
      });
      await actionSheet.present();
  
      const { role } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  

}
