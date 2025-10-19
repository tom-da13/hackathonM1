import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  liked?: boolean;   
  likesCount?: number; 
  timestamp?: string; 
  location?: {
    latitude: number;
    longitude: number;
  }; 
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(private platform: Platform) {} 

  // Prendre une photo et l'enregistrer
  public async addNewToGallery() {
    // 1️⃣ Prendre une photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

        let coords: { latitude: number; longitude: number } | undefined = undefined;

    try {
      const position = await Geolocation.getCurrentPosition();
      coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    } catch (err) {
      console.warn('Impossible de récupérer la localisation', err);
    }

    // 💾 Sauvegarder la photo
    const savedImageFile = await this.savePicture(capturedPhoto);

    // ⏰ Ajouter heure + position
    savedImageFile.timestamp = new Date().toLocaleString();
    savedImageFile.location = coords;

    // ➕ Ajouter à la galerie
    this.photos.unshift(savedImageFile);
        
    // 🔒 Sauvegarder dans Preferences
    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  // Sauvegarde la photo dans le filesystem
  private async savePicture(photo: Photo): Promise<UserPhoto> {
    // Convertir la photo en base64
    const base64Data = await this.readAsBase64(photo);

    // Créer un nom de fichier unique
    const fileName = Date.now() + '.jpeg';

    // Écrire le fichier dans le répertoire des données
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

  if (this.platform.is('hybrid')) {
    // Mobile : convertir le chemin 'file://' pour l'affichage
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  } else {
    // Web : utiliser le webPath déjà présent
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }
}

private async readAsBase64(photo: Photo) {
  if (this.platform.is('hybrid')) {
    // Mobile : lire directement le fichier photo
    const file = await Filesystem.readFile({
      path: photo.path!
    });
    return file.data;
  } else {
    // Web : récupérer la photo via fetch et convertir en base64
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }
}
public async loadSaved() {
  const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
  this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

  // Sur le web seulement : lire chaque fichier en base64
  if (!this.platform.is('hybrid')) {
    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
      });
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
}

public toggleLike(photo: UserPhoto) {
  photo.liked = !photo.liked;          
  if (photo.liked) {
    photo.likesCount = (photo.likesCount || 0) + 1;
  } else {
    photo.likesCount = (photo.likesCount || 1) - 1;
  }

  // Sauvegarder les modifications dans Preferences pour persistance
  Preferences.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos),
  });
}

  // Fonction utilitaire pour convertir un blob en base64
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}