import { environment } from './environments/environment';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const Parse = require('parse');

Parse.initialize(environment.app_id);
Parse.serverURL = environment.server_url;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
