import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'page-vouvender',
  templateUrl: 'vouvender.html',
})
export class Vouvender {

  /* Campos da Tabela Estoques */
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  Status: string;

  public items:any[] = [];
  searchQuery: string;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  NomedoUsuario: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService)
  {
    this.getItems();
    this.NomedoUsuario="this.items.nome"
  }

  public getItems()
  {
    this.backand.object.getList('Clientes').then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('itens lidos....');
          console.log('Nome ' , this.items)
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Vouvender');
  }

}
