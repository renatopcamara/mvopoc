import { Component } from '@angular/core';
import { App, ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { Vouvender } from '../vouvender/vouvender';

@Component({
  selector: 'page-meuestoque',
  templateUrl: 'meuestoque.html',
})

export class Meuestoque {
  /* Campos da Tabela Estoques */
  id: number;
  creadetAt: Date;
  updatedAt: Date;
  NumeroPedido: string = '';
  NomeProduto: string;
  QtdProduto: number;
  DataChegada: Date;
  DataPrevistaChegada: Date;
  CodProduto: string;
  CodUsuario: string;
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
  email: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService,
    public alertCtrl: AlertController)
    {

      this.searchQuery = '';
      let that = this;
      this.backand.on("items_updated", (res: any) =>
      {
        let a = res.data as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.items.unshift(newItem);
      });
      this.backand.user.getUserDetails().then
      ((res: any) =>
      {
        if(res.data)
        {
          this.loggedInUser = res.data.username;
          this.email = res.data.username;
          this.auth_status = 'OK';
          this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        }
      },(err: any) =>
        {
          this.loggedInUser = null;
          this.auth_status = null;
          this.auth_type = null;
        }
      );
      this.getItems();
    }

    public getItems()
    {
      this.backand.object.getList('Estoques').then
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

  VouVender(nomeProduto)
  {
    this.navCtrl.push(Vouvender,'nome')
  }

  Chegou(nomeProduto)
  {
    let alert = this.alertCtrl.create
    ({
      title: 'Chegou',
      subTitle: ' ' + nomeProduto,
      buttons: ['OK']
    });
    alert.present();
    this.getItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Meuestoque');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter Meuestoque');
    this.getItems();
  }



}
