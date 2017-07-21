import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Usuarios } from '../usuarios/usuarios';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public UsuarioNome:string ="";

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
    )
  {

  }

  showUsuario()
  { let alert = this.alertCtrl.create
    ({
      title: 'Entrar',
      subTitle: 'Voce clicou no botão de entrar. No momento não está disponível',
      buttons: ['OK']
    });
    alert.present();
  }
  showRede()
  { let alert = this.alertCtrl.create
    ({
      title: 'Rede',
      subTitle: 'Voce clicou no botão REDE. No momento não está disponível',
      buttons: ['OK']
    });
    alert.present();
  }
}
