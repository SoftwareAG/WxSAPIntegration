import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HomeComponent } from './home/home.component';
import { OpenAPIComponent } from './openapi/openapi.component';
import { KafkaConnectionComponent } from './kafka-connection/kafka-connection.component';
import { LoginComponent } from './login/login.component';
import { SapConnectionComponent } from './sap-connection/sap-connection.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sap-connection', component: SapConnectionComponent },
  { path: 'kafka-connection', component: KafkaConnectionComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'configuration/:id', component: ConfigurationComponent },
  { path: 'openapi', component: OpenAPIComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
