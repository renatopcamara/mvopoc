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
  IDEstoque: number;
  nome: string;
  email: string;
  whatsapp: string;
  Status: string;
  ProdutoParaVender: string;
  QuantidadeEscolhida: number;
  Quantidadeemestoque: number;
  Datapgto: string = new Date().toISOString();
  Dataentrega: string = new Date().toISOString();
  Preco: number;
  QtdMax: any;
  NomeCliente: string;
  NomedoUsuario: string;
  CodProduto:string;
  private items:any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService,
    public alertCtrl: AlertController,
    private sms: SMS)
  {

  }

  public atualizaEstoques()
  {
    let data =
    {
      Quantidade: this.Quantidadeemestoque - this.QuantidadeEscolhida
    }
    console.log('ID:'+ this.IDEstoque + 'qtd: ' + data.Quantidade)
    this.backand.object.update('Estoques', this.IDEstoque , data, ).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('atualizei a qtd do produto em estoque. Proximo passo gerar o boleto');
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public novaVenda()
  {
    let item =
    {
      Produto: '',
      Qtd: '',
      ValorPago: '',
      DataPagamento: '',
      DataEntrega: '',
      Presente: '',
      CodProduto: '',
      idCliente:'',
      NomeCliente:''
    };
    console.log(item)
    this.backand.object.create('Vendas',item).then
    ((res: any) =>
        {
          console.log('salvei nova venda...');
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public enviaSMS()
  {
    console.log ('Passando pela função de envio de SMS')
    this.sms.send('999971334','Olá. Isso é um teste de envio de SMS pelo MVO')
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
//    console.log('ionViewDidLoad Vouvender: ' + this.navParams.get('ID'));
    this.NomeCliente = this.navParams.get('Cliente');
    this.NomedoUsuario = this.navParams.get('Usuario');
    this.CodProduto = this.navParams.get('IDProd');
    this.IDEstoque = this.navParams.get('ID');
    this.ProdutoParaVender = this.navParams.get('Produto');
    this.QuantidadeEscolhida = this.navParams.get('Qtd');
    this.Quantidadeemestoque = this.navParams.get('Qtd');
    this.Preco = this.navParams.get('Preco');
//    console.log('Cliente: ' + this.NomeCliente + ' Usuario: ' + this.NomedoUsuario);
  }

  ionViewDidEnter() {
//    console.log('ionViewDidEnter Meuestoque');
//    this.getItemsClientes();
  }
}
