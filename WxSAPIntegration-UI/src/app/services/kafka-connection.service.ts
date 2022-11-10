import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KafkaConnectionService {

  constructor(private http: HttpClient) { }

  public getConnectionState(): Observable<KafkaConnectionStateResponse> {
    return this.http.get<KafkaConnectionStateResponse>("/wxsapintegration/config/connections/kafka/state");
  }

  public updateConnectionState(state: string): Observable<any> {
    let kafkaConnectionStateRequest: KafkaConnectionStateRequest = {
      request: {
        state: state
      }
    }
    return this.http.put<any>("/wxsapintegration/config/connections/kafka/state", kafkaConnectionStateRequest);
  }

  public getConnection(): Observable<KafkaConnectionResponse> {
    return this.http.get<KafkaConnectionResponse>("/wxsapintegration/config/connections/kafka")
  }

  public updateConnection(kafkaConnection: KafkaConnection): Observable<any> {
    let kafkaConnectionRequest: KafkaConnectionRequest = {
      request: kafkaConnection
    };
    return this.http.put<any>("/wxsapintegration/config/connections/kafka", kafkaConnectionRequest);
  }

  public createConnection(kafkaConnection: KafkaConnection): Observable<any> {
    let kafkaConnectionRequest: KafkaConnectionRequest = {
      request: kafkaConnection
    };
    return this.http.post<any>("/wxsapintegration/config/connections/kafka", kafkaConnectionRequest);
  }

}

export interface KafkaConnection {
  connectionProperties: {
    serverList: string;
    ackIndicator: string;
    requestTimeOut: string;
    valueSerializerClass: string;
    keySerializerClass: string;
    partitionerClass: string;
    compressionType: string;
    maxRetry: string;
    batchSize: string;
    sendBufferSize: string;
    clientID: string;
    kafkaVersion: string;
    otherProperties: string;
  },
  connectionManagerProperties: {
    poolable: string;
    minimumPoolSize: string;
    maximumPoolSize: string;
    poolIncrementSize: string;
    blockingTimeout: string;
    expireTimeout: string;
    startupRetryCount: string;
    startupBackoffSecs: string;
  }
}

export interface KafkaConnectionRequest {
  request: KafkaConnection;
}

export interface KafkaConnectionResponse {
  response: KafkaConnection;
}

export interface KafkaConnectionStateRequest {
  request: KafkaConnectionState;
}

export interface KafkaConnectionStateResponse {
  response: KafkaConnectionState;
  message: string;
}

export interface KafkaConnectionState {
  state: string;
}