import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  identity:any;
  users: any;
  constructor(private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    public toastController: ToastController ) {
      this.identity = this.userService.getIdentity();     }

  ngOnInit(): void {

  }

  buscar(form) {
    this.userService.getUser().subscribe(res => {
      this.users = res;
      let busqueda = this.users.find(x => x.username == form.value.name);
      if (busqueda) {
        localStorage.setItem('username', JSON.stringify(busqueda));
       // this.presentAlert('Al toque rey','Si coinciden','Los nombres coinciden rey.');
       this.presentToast('Estas Logeado');
        form.reset();
        //this.router.navigateByUrl('/tabs/tab1');
        this.router.navigate([`/tabs/tab1/${this.identity.id}`]);
      } else {
        //this.presentAlert('Espera rey','No coinciden','Los nombres no coinciden rey, intentalo de nuevo.');
        this.presentToast('El usuario no existe');
        form.reset();
      }

    })
  }
  async presentAlert(header:string,subHeader:string,message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
