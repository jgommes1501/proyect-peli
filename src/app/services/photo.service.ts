import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public foto: string | undefined;
  private readonly fotoPerfilKey = 'foto_perfil';

  constructor(private settingsService: SettingsService) { }

  public async loadSavedPhoto(): Promise<void> {
    this.foto = await this.settingsService.get<string>(this.fotoPerfilKey) || undefined;
  }

  public async addNewToGallery(): Promise<void> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 90
    });

    if (!capturedPhoto.dataUrl) {
      throw new Error('No se pudo obtener la imagen seleccionada.');
    }

    this.foto = capturedPhoto.dataUrl;
    await this.settingsService.set(this.fotoPerfilKey, this.foto);
  }
}