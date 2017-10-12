import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPackPage } from '../../pages/detail-pack/detail-pack';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToDetails(id){
    this.navCtrl.push(DetailPackPage, {id: id });
  }
}
