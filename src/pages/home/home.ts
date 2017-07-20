import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Usuarios } from '../usuarios/usuarios';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public UsuarioNome:string ="";

  constructor(public navCtrl: NavController) {

  }

}
