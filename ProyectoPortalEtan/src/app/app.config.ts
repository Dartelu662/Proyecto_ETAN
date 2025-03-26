import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      {
       eventCoalescing: true 
      }
    ), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
  provideHttpClient(), 
  provideFirebaseApp(() => initializeApp(
    { 
      projectId: "portal-escuela-etan", 
      appId: "1:525613967318:web:0a2c544cf9e08702f1a677", 
      storageBucket: "portal-escuela-etan.firebasestorage.app", 
      apiKey: "AIzaSyBy-s8T8A77_02AUNaYPewVSEYT_KmOzCk", 
      authDomain: "portal-escuela-etan.firebaseapp.com", 
      messagingSenderId: "525613967318" 
    }
  )), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "portal-escuela-etan", appId: "1:525613967318:web:0a2c544cf9e08702f1a677", storageBucket: "portal-escuela-etan.firebasestorage.app", apiKey: "AIzaSyBy-s8T8A77_02AUNaYPewVSEYT_KmOzCk", authDomain: "portal-escuela-etan.firebaseapp.com", messagingSenderId: "525613967318" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
]
}