
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera, File, FilePath, Transfer } from 'ionic-native';
import { Todo } from '../../providers/todo';
import { App } from '../../providers/app';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { Login } from '../login/login';

declare var cordova: any;
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPost implements OnInit {
  lastImage: string = null;
  loading: any;
  addPostObj: any;


  constructor(public navParams: NavParams, private auth: Auth, private todo: Todo, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public app: App) {

  }

  ngOnInit() {
    this.addPostObj = {
      title: '',
      description: '',
      img: '',
      category: '',
      isLike: false,
      createBy: this.auth.user._id,
      price: 0,
      feature: false,
    };
  }
  ionViewCanEnter(): boolean {
    if (this.app.userCheck()) {
      console.log('if')
      return true;
    } else {
      console.log('else')
      return false;
    }
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

    Camera.getPicture(options)
      .then((imagePath) => {
        if ((this.platform.is('android') || this.platform.is('ios') || this.platform.is('iphone')) && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          FilePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
        }
        else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        this.app.showToast('Error while capturing image');
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
      this.app.showToast('Error while storing file.');
    });
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
      return this.app.showToast('Incomplete Input Field');
    }
    else {
      var url = "https://classified-app-server.herokuapp.com/api/post/add";
      var targetPath = this.pathForImage(this.lastImage);
      var fileName = this.lastImage;
      var options = {
        fileKey: "postImg",
        fileName: fileName,
        chunkedMode: false,
        httpMethod: 'POST',
        mimeType: "multipart/form-data",
        params: {
          'fileName': fileName,
          'title': this.addPostObj.title,
          'description': this.addPostObj.description,
          'category': this.addPostObj.category,
          'isLike': this.addPostObj.isLike,
          'createBy': this.addPostObj.createBy,
          'price': this.addPostObj.price,
          'feature': this.addPostObj.feature
        }
      };

      const fileTransfer = new Transfer();
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
      fileTransfer.upload(targetPath, url, options)
        .then(data => {
          this.loading.dismissAll()
          this.app.showToast('Image succesful uploaded.');
          this.navCtrl.setRoot(HomePage)
        }, err => {
          this.loading.dismissAll()
          this.app.showToast('Error while uploading file.');
        });
    }
  }
}
