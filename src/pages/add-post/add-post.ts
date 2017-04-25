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
      name: '',
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
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        this.presentToast('Error while capturing image');
      });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.pathForImage(this.lastImage);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  private presentToast(text) {
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
      if (img !== undefined) {
        let ImageUrl = cordova.file.dataDirectory + img;
        // this.uploadUrl(ImageUrl);
        console.log(ImageUrl)
        this.addPostObj.img = ImageUrl
        return cordova.file.dataDirectory + img;
      }
    }
  }
  addPost(post) {
    if (!post.valid) {
      console.log('false')
    }
    else {
      this.todo.addPost(this.addPostObj)
        .subscribe(data => {
          let response = data.json();
          if (!response.success) {
            console.log(response.error)
          }
          else {
            this.navCtrl.setRoot(HomePage)
          }
        })
    }

  }











  /* getFileEntry(filePath, cb) {
     window['resolveLocalFileSystemURL'](filePath,
       function (fileEntry) {
         var win = function (file) {
           var reader = new FileReader();
           reader.onloadend = function (evt) {
             let Obj = evt.target['result'];
             cb(Obj, null);
           };
           reader.readAsArrayBuffer(file);
         };
         var fail = function (evt) {
           cb(null, evt);
         };
         fileEntry.file(win, fail);
       }, function (error) {
         cb(null, error);
       });
   }*/
  /*  firebaseUpload(url) {
      this.getFileEntry(url, (data, err) => {
        console.log(data);
        console.log(err);
      });
    }*/


}
