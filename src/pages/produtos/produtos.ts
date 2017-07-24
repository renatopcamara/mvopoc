import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class Produtos {

/* Campos da Tabela Produtos */
  id: number;
  Nome: string;
  Preco: number;
  Custo: number;
  Status: string;
  creadetAt: Date;
  updatedAt: Date;

  items:any[] = [];
  searchQuery: string;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  NomedoUsuario: string = '';
  email: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService)
  {

    this.getItems();

  }

  public getItems()
  {
    this.backand.object.getList('Produtos').then
    ((res: any) =>
        {
          this.items = res.data;
          console.log(this.items);
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  selecionaUsuario(nome:string)
  {
    console.log(nome)
    this.NomedoUsuario = '' + nome ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Produtos');
  }

}
