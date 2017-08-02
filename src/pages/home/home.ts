import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { Usuarios } from '../usuarios/usuarios';
import { Produtos } from '../produtos/produtos';
import { Meuestoque } from '../meuestoque/meuestoque';
import { Meusclientes } from '../meusclientes/meusclientes';
import { Vouvender } from '../vouvender/vouvender';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public items:any[] = [];
searchQuery: string;
username:string = '';
password:string = '';
auth_type:string = "N/A";
is_auth_error:boolean = false;
auth_status:string = null;
loggedInUser: string = '';

public UsuarioLogado: string;

NomedoUsuario: string = '';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public backand: BackandService)
  {

  }

  showUsuarios()
  { let alert = this.alertCtrl.create
    ({
      title: 'Aviso',
      subTitle: 'Usuários carregados com sucesso.',
      buttons: ['OK']
    });
    alert.present();
  }

  private getItemsUsuarios()
  {
    this.backand.object.getList('users').then
    ((res: any) =>
        {
          this.items = res.data
          console.log(this.items)
          this.showUsuarios()
        },(err: any) =>
        {
          alert(err.data);
        }
    );
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

  public abreMeuestoque()
  {
    this.navCtrl.push(Meuestoque)
  }

  public abreVouvender()
  {
    this.navCtrl.push(Vouvender)
  }

  public abreMeusclientes()
  {
    this.navCtrl.push(Meusclientes)
  }

  public abreProdutos()
  {
    this.navCtrl.push(Produtos)
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad Home');
  }
  ionViewDidEnter()
  {
    console.log('ionViewDidEnter Home');
  }
}
