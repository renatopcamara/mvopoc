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
  CodEstoque: number;
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
  CodCliente: string;
  NomedoCliente: string;
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
    console.log('ID:'+ this.CodEstoque + 'qtd: ' + data.Quantidade)
    this.backand.object.update('Estoques', this.CodEstoque , data).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('atualizei a qtd do item de estoque:' + this.CodEstoque);
          this.novaVenda();
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public apagaItemEstoque()
  {

    console.log('Apagando registro do MEuestoque:' + this.CodEstoque)
    this.backand.object.remove('Estoques', this.CodEstoque).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('apaguei item de estoque:' + this.CodEstoque)
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public validaQtdEstoque()
  {
    let valorFinal = this.Quantidadeemestoque - this.QuantidadeEscolhida;
    if (valorFinal == 0 )
    {
      console.log('valor final = 0');
      this.apagaItemEstoque();
      this.novaVenda();
    }
    else
    {
      console.log('valor final =' + valorFinal);
      this.atualizaEstoques();
    }
  }

  public novaVenda()
  {
    let item =
    {
      IDEstoque: this.CodEstoque,
      Qtd: this.QuantidadeEscolhida,
      ValorPago: this.Preco,
      DataPagamento: this.Datapgto,
      DataEntrega: this.Dataentrega,
      CodProduto: this.ProdutoParaVender,
      idCliente: this.CodCliente,
      NomedoCliente: this.NomeCliente
    };
    console.log('Cliente:' + this.NomeCliente +' ID:' + this.CodCliente)
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
            this.validaQtdEstoque();
            this.enviaSMS();
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present()
  }

  addCliente()
  {
    this.navCtrl.push(Meusclientes)
  }
  ionViewDidLoad() {
//    console.log('ionViewDidLoad Vouvender: ' + this.navParams.get('ID'));
    this.NomeCliente = this.navParams.get('Cliente');
    this.CodCliente = this.navParams.get('CodCliente');
    this.NomedoUsuario = this.navParams.get('Usuario');
    this.CodProduto = this.navParams.get('IDProd');
    this.CodEstoque = this.navParams.get('ID');
    this.ProdutoParaVender = this.navParams.get('Produto');
    this.QuantidadeEscolhida = this.navParams.get('Qtd');
    this.Quantidadeemestoque = this.navParams.get('Qtd');
    this.Preco = this.navParams.get('Preco');
    console.log('Cliente: ' + this.NomeCliente + ' Cod do Cliente: ' + this.CodCliente);
  }

  ionViewDidEnter() {
//    console.log('ionViewDidEnter Meuestoque');
//    this.getItemsClientes();
  }
}
