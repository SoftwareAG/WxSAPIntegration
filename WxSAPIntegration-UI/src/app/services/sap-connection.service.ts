import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SapConnectionService {

  constructor(private http: HttpClient) { }

  public getConnectionState(): Observable<SAPConnectionStateResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        "X-wM-AdminUI": "true"
      })
    };
    return this.http.get<SAPConnectionStateResponse>("/wxsapintegration/config/connections/sap/state", httpOptions);
  }

  public updateConnectionState(state: string): Observable<any> {
    let sapConnectionStateRequest: SAPConnectionStateRequest = {
      request: {
        state: state
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "X-wM-AdminUI": "true"
      })
    };
    return this.http.put<any>("/wxsapintegration/config/connections/sap/state", sapConnectionStateRequest, httpOptions);
  }

  public getConnection(): Observable<SAPConnectionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        "X-wM-AdminUI": "true"
      })
    };
    return this.http.get<SAPConnectionResponse>("/wxsapintegration/config/connections/sap", httpOptions);
  }

  public updateConnection(sapConnection: SAPConnection): Observable<any> {
    let sapConnectionRequest: SAPConnectionRequest = {
      request: sapConnection
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "X-wM-AdminUI": "true"
      })
    };
    return this.http.put<any>("/wxsapintegration/config/connections/sap", sapConnectionRequest, httpOptions);
  }

  public createConnection(sapConnection: SAPConnection): Observable<any> {
    let sapConnectionRequest: SAPConnectionRequest = {
      request: sapConnection
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "X-wM-AdminUI": "true"
      })
    };
    return this.http.post<any>("/wxsapintegration/config/connections/sap", sapConnectionRequest, httpOptions);
  }
  
}

export interface SAPConnection {
  connectionManagerSettings: {
    poolable: string;
    minimumPoolSize: string;
    maximumPoolSize: string;
    poolIncrementSize: string;
    blockingTimeout: string;
    expireTimeout: string;
    startupRetryCount: string;
    startupBackoffSecs: string;
  },
  connectionSettings: {
    alias: string;
    user: string;
    password: string;
    repoUser: string;
    repoPassword: string;
    client: string;
    language: string;
    loadBalancing: string;
    appServerHost: string;
    systemNumber: string;
    logonGroup: string;
    messageServerHost: string;
    messageServerService: string;
    systemId: string;
    connectionType: string;
    programId: string;
    gatewayHost: string;
    gatewayService: string;
    repositoryServer: string;
    sncMode: string;
    sncQualityOfService: string;
    sncMyName: string;
    sncPartnerName: string;
    sncAuthentication: string;
    routerString: string;
    sapGui: string;
    rfcTrace: string;
    logTransactionStatus: string;
    storeMsgBody: string;
  }
}

export interface SAPConnectionRequest {
  request: SAPConnection;
}

export interface SAPConnectionResponse {
  response: SAPConnection;
}

export interface SAPConnectionStateResponse {
  response: SAPConnectionState;
  message: string;
}

export interface SAPConnectionState {
  state: string;
}

export interface SAPConnectionStateRequest {
  request: SAPConnectionState;
}