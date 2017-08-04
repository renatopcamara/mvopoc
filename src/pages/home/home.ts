import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { Usuarios } from '../usuarios/usuarios';
import { Produtos } from '../produtos/produtos';
import { Meuestoque } from '../meuestoque/meuestoque';
import { Meusclientes } from '../meusclientes/meusclientes';
import { Vouvender } from '../vouvender/vouvender';
import { Estoquesegmentado } from '../estoquesegmentado/estoquesegmentado';

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
NomeCliente: string = ' ';
NomedoUsuario: string = 'Rosana';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public backand: BackandService)
  {

  }

  launchModalMeuscliente()
  {
    let modal = this.modalCtrl.create(Meusclientes);

    modal.onDidDismiss((data)=>
    {
      console.log(" recebendo o nome do cliente do modal: " + data);
      this.NomeCliente = data.NomeCliente;
    });
    modal.present();
//    console.log("passei no launchModalPage");
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
    let data =
    {
      Cliente: this.NomeCliente,
      Usuario: this.NomedoUsuario
    };
    console.log ('preparando envio de daddos' + data.Cliente + data.Usuario)
    this.navCtrl.push(Estoquesegmentado, data)
  }

  public abreVouvender()
  {
    let data =
    {
      Cliente: this.NomeCliente,
      Usuario: this.NomedoUsuario
    };
    this.navCtrl.push(Vouvender, data)
  }

  public abreMeusclientes()
  {
    this.navCtrl.push(Meusclientes)
  }

  public abreProdutos()
  {
    this.navCtrl.push(Produtos)
  }

  public abreEstoquesegmentado()
  {
    this.navCtrl.push(Meuestoque)
  }


  public abreCompartilhar()
  {
    let alert = this.alertCtrl.create
      ({
        title: 'Compartilhamento',
        subTitle: 'No momento não está disponível',
        buttons: ['OK']
      });
      alert.present();
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
