		import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
		import { BrowserModule } from '@angular/platform-browser';
		import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
		import { AppRoutingModule } from './app-routing.module';
		import { AppComponent } from './app.component';
import { JwtInterceptor } from './jwt.interceptor';
import { MyHttpInterceptor } from './my-http-interceptor';

		function initializeKeycloak(keycloak: KeycloakService) {
		  return () =>
		    keycloak.init({
		      config: {
		        url: 'http://localhost:8080',
		        realm: 'tutorial',
		        clientId: 'tutorial-frontend'
		      },
		      initOptions: {
		        onLoad: 'check-sso',
		        silentCheckSsoRedirectUri:
		          window.location.origin + '/assets/verificar-sso.html'
		      },
			  enableBearerInterceptor: true,
			  bearerPrefix: 'Bearer',

		    });
		}

		@NgModule({
		  declarations: [AppComponent],
		  imports: [AppRoutingModule, BrowserModule, KeycloakAngularModule,HttpClientModule		  ],
		  providers: [
			
		    {
		      provide: APP_INITIALIZER,
		      useFactory: initializeKeycloak,
		      multi: true,
		      deps: [KeycloakService]
		    }
			/*,
			{
				provide: HTTP_INTERCEPTORS,
				useClass: MyHttpInterceptor,
				multi: true,
			  },
			  {
				provide: HTTP_INTERCEPTORS,
				useClass: JwtInterceptor,
				multi: true,
			  }*/
		  ],
		  bootstrap: [AppComponent]
		})
		export class AppModule {}
