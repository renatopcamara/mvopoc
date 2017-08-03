import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Meusclientes } from '../meusclientes/meusclientes';
import { SMS } from '@ionic-native/sms';

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
    public backand: BackandService,
    public alertCtrl: AlertController,
    private sms: SMS)
  {
    this.getItemsClientes();
  }

  public enviaSMS()
  {
    console.log ('Passando pela função de envio de SMS')
    this.sms.send('999971334','Olá. Isso é um teste de envio de SMS pelo MVO')
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

  fechamentoVenda()
  { let alert = this.alertCtrl.create
    ({
      title: 'ATENÇÂO',
      subTitle: 'Os dados da venda estão corretos? Depois da confirmação a venda não poderá ser cancelada.',
      buttons:
      [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Sim clicked');
            this.validacaoVenda()
          }
        }
      ]
    });
    alert.present()
  }

  validacaoVenda()
  { let alert = this.alertCtrl.create
    ({
      title: 'PRÓXIMOS PASSOS',
      subTitle: '1-A quantidade em estoque é atualizada. 2-O valor pago é registrado. 3-Se a data de entrega for futura então agenda o compromisso. 4-Envia texto RECIBO para o cliente via ZAP ou EMAIL',
      buttons:
      [
        {
          text: 'OK',
          handler: () => {
            console.log('aceitei o OK');
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present();
    this.enviaSMS();
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
