import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "portaletan-34386", appId: "1:728789552027:web:ef3fd1c813552e9e74af3e", databaseURL: "https://portaletan-34386-default-rtdb.firebaseio.com", storageBucket: "portaletan-34386.firebasestorage.app", apiKey: "AIzaSyAcZM3w-kxM-IRqxe_t9fbLZDmO7meFPvQ", authDomain: "portaletan-34386.firebaseapp.com", messagingSenderId: "728789552027", measurementId: "G-SPLP7816M0" })), provideFirestore(() => getFirestore())]
};
