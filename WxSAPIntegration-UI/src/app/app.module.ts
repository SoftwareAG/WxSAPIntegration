import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SapConnectionComponent } from './sap-connection/sap-connection.component';
import { KafkaConnectionComponent } from './kafka-connection/kafka-connection.component';
import { HeaderComponent } from './header/header.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { OpenAPIComponent } from './openapi/openapi.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SapConnectionComponent,
    KafkaConnectionComponent,
    HeaderComponent,
    SideNavigationComponent,
    HomeComponent,
    ConfigurationComponent,
    OpenAPIComponent,
    MessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
