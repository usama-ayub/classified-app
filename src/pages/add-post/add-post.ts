import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera, File, FilePath, Transfer } from 'ionic-native';
import { Todo } from '../../providers/todo';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

declare var cordova: any;
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPost implements OnInit {
  lastImage: string = null;
  loading: any;
  addPostObj: any;


  constructor(public navParams: NavParams, private auth: Auth, private todo: Todo, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  
  }

  ngOnInit() {
    this.addPostObj = {
      title: '',
      description: '',
      img: '',
      category: '',
      isLike: false,
      createBy: this.auth.uid,
    };
  }

  captureImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'photos',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options)
      .then((imagePath) => {
        // Special handling for Android library
        if ((this.platform.is('android') || this.platform.is('ios') || this.platform.is('iphone')) && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          FilePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
        }
        else {
          console.log('else')
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        this.presentToast('Error while capturing image');
      });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  uploadImage(post) {
    if (!post.valid) {
      return this.presentToast('Please Field Form Field');
    }
    else {
      var url = "https://classified-app-server.herokuapp.com/api/post/add";
      var targetPath = this.pathForImage(this.lastImage);
      var img = this.lastImage;
      var options = {
        fileKey: "img",
        img: img,
        chunkedMode: false,
        httpMethod: 'POST',
        mimeType: "multipart/form-data",
        params: {
          'img': img,
          'title': this.addPostObj.title,
          'description': this.addPostObj.description,
          'category': this.addPostObj.category,
          'isLike': false,
          'createBy': this.auth.uid
        }
      };

      const fileTransfer = new Transfer();
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      fileTransfer.upload(targetPath, url, options).then(data => {
        console.log('data', data)
        this.loading.dismissAll()
        this.presentToast('Image succesful uploaded.');
      }, err => {
        console.log('err', err)
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });
    }
  }
}
