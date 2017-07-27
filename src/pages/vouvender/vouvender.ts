import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Meusclientes } from '../meusclientes/meusclientes';

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

  private clientes:any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService)
  {
    this.getItemsClientes();
  }

  public getItemsClientes()
  {
    this.backand.object.getList('Clientes').then
    ((res: any) =>
        {
          this.clientes = res.data;
          console.log('itens lidos....');
          console.log('Nome ' , this.clientes)
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  addCliente()
  {
    this.navCtrl.push(Meusclientes)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Vouvender: ');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter Meuestoque');
    this.getItemsClientes();
  }
}
