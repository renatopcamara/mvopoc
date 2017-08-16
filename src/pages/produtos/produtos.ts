import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, List } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class Produtos {

@ViewChild(List) list: List;

/* Campos da Tabela Produtos */
  id: number;
  Nome: string;
  Preco: number;
  Custo: number;
  Status: string;
  creadetAt: Date;
  updatedAt: Date;
  QtdDesejada: number;

/* Campos da tabela Desejos */
  NomedoProduto: string;
  Quantidade: string;
  CodProduto: string;
  CodUsuario: string;

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

  api_url: string = 'https://api.backand.com';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService,
    public alertCtrl: AlertController)
  {
      this.getItems();
  }

  public filterItemsProdutos(searchbar)
  {
    // set q to the value of the searchbar
    var q = searchbar;

    // if the value is an empty string don't filter the items
    if (!q || q.trim() == '')
    {
      return;
    }
    else
    {
      q = q.trim();
    }
    console.log('busca' + q);

    let params =
    {
      filter: this.backand.helpers.filter.create('Nome', 'contains', q)
    }
    this.backand.object.getList('Produtos', params).then
    ((res: any) =>
      {
        this.items = res.data;
        console.log('passou no getlist com filtro');
        this.navCtrl.getActive()
      },(err: any) =>
      {
        alert(err.data);
      }
    );
  }

  private getItems()
  {
    let params =
    {
      pageSize: 200
    }
    this.backand.object.getList('Produtos', params).then
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

  public selecionaProduto()
  {
    let alert = this.alertCtrl.create
    ({
      title: 'Aviso',
      subTitle: ' No futuro será apresentado a imagem do catálogo do produto selecionado.' ,
      buttons: ['OK']
    });
    alert.present();
  }

  public listadedesejos(nomeProduto)
  {
    this.list.closeSlidingItems()

    let alert = this.alertCtrl.create
    ({
      title: 'Aviso',
      subTitle: 'Qual a quantidade de produtos que você deseja?',
      inputs:
      [{
          name: 'qtd',
          placeholder: 'Quantidade',
          type: 'number'
        },
      ],
      buttons:
      [{
        text: 'Desistir',
        role: 'cancel',
        handler: data =>
          {
            console.log('Cancelou');
          }
        },
        {
          text: 'Salvar',
          handler: data =>
          {
            if (data.qtd == 0 )
            {
//              console.log('Quantidade desejada zero');
            } else
            {
//              console.log('Salvou quantidade desejada:' + data.qtd);
              let item =
              {
                NomedoProduto: nomeProduto.Nome,
                Quantidade: data.qtd,
                CodProduto: nomeProduto.CodigoHinode,
                CodUsuario: this.NomedoUsuario,
                Preco: nomeProduto.Preco
              };
              this.SalvaNovoDesejo(item);
              return true;
            }
          }
        }
      ]
    });
    alert.present();
  }

  public SalvaNovoDesejo(item)
  {
    console.log(item)
    this.backand.object.create('Desejos',item).then
    ((res: any) =>
      {
//        console.log('salvei desejo...');
      },(err: any) =>
      {
        alert(err.data);
      }
    );
  }


  public refreshCatalogo()
  {
      this.searchQuery='';
      this.getItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Produtos');
  }

}
