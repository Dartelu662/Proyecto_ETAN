import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      {
       eventCoalescing: true 
      }
    ), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => initializeApp(
      { 
        apiKey: "AIzaSyAuVH2rIod-p2YKbHWGML0WVBHqYpC5pjc",
        authDomain: "portal-etan.firebaseapp.com",
        projectId: "portal-etan",
        storageBucket: "portal-etan.firebasestorage.app",
        messagingSenderId: "832244242801",
        appId: "1:832244242801:web:f80fb71f331a9983e67ed0"
      }
    )
  ), 
    provideFirestore(() => getFirestore()
  ),
  provideAuth(() => getAuth()
  ),
  provideHttpClient()
]
};
