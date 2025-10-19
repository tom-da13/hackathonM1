import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserPhoto } from '../services/photo.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule]
})
export class PhotoModalComponent {
  @Input() photo!: UserPhoto;

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
