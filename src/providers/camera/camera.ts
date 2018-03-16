import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Configure } from '../configure/configure';

@Injectable()
export class CameraProvider {

  data: any = null;
  url: string;

  constructor(
  	public http: HttpClient,
  	private camera: Camera,
  	private transfer: FileTransfer,
    public configure: Configure 
    ) {

    this.url = configure.getUrl()

  }

  takePicture() {

  	let options: CameraOptions = {
  	  quality: 50,
  	  destinationType: this.camera.DestinationType.DATA_URL,
  	  encodingType: this.camera.EncodingType.JPEG,
  	  mediaType: this.camera.MediaType.PICTURE
  	}

  	this.camera.getPicture(options).then((imageData) => {
  	 // imageData is either a base64 encoded string or a file URI
  	 // If it's base64:
  	 console.log(imageData)
  	 //let base64Image = 'data:image/jpeg;base64,' + imageData;
  	 this.upload( imageData );
  	}, (err) => {
  	 console.log(err)
  	});

  }

  /* Upload our image
   */
  upload( image ) {

  	let fileTransfer: FileTransferObject = this.transfer.create();

  	let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'myImage.jpg',
       headers: {}
  	}

  	fileTransfer.upload(image, this.url + 'wp-json/app/v1/camera', options)
  	.then((data) => {
  	 console.log(data)
  	}, (err) => {
  	 console.log(err)
  	})

  }

}