import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Apollo } from 'apollo-angular';
import { environment } from './environments/environment';
import { NgZone } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: Apollo,
      useFactory: (ngZone: NgZone) => {
        const apollo = new Apollo(ngZone);
        apollo.create({
          uri: environment.gqlUrl,
          cache: new InMemoryCache()
        });
        return apollo;
      },
      deps: [NgZone]
    }
  ]
}).then(() => {
  console.log('Application bootstrapped');
});
