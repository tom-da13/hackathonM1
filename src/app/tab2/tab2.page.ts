import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { ModalController } from '@ionic/angular';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {
  constructor(
    public photoService: PhotoService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  async openPhoto(photo: UserPhoto) {
    const modal = await this.modalCtrl.create({
      component: PhotoModalComponent, 
      componentProps: { photo },
      cssClass: 'photo-modal'
    });
    await modal.present();
  }
}

