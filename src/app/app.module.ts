import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

//firebase

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/storage';

//ENVIRONMENT
import { environment } from 'src/environments/environment.prod';

// Auth
import { AuthService } from './services/auth.service';

import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

//auth guard
import { AuthGuard } from './guards/auth.guard';

import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Network } from '@awesome-cordova-plugins/network/ngx';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { AdMob } from '@ionic-native/admob-plus';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     FormsModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFirestoreModule,
     AngularFireAuthModule,
     AngularFirestoreModule,
     AngularFireStorageModule,
     BrowserAnimationsModule,
     SuperTabsModule.forRoot(),
    ],
  providers: [
    Network,
    AuthService,
    AuthGuard,
    SplashScreen,
    StatusBar,
    AdMob,
    Clipboard,
    WebView,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuthGuard, FirebaseX,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
