import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KafkaConnection, KafkaConnectionResponse, KafkaConnectionService } from '../services/kafka-connection.service';
import { MessageService } from '../services/message.service';
import { SAPConnection, SAPConnectionResponse, SapConnectionService } from '../services/sap-connection.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public selectedSection: string = "sap-adapter";

  private sapConnectionConfigured: boolean = false;
  private kafkaConnectionConfigured: boolean = false;

  public sapConnection = {
    connectionManagerSettings: {
      poolable: "true",
      minimumPoolSize: 1,
      maximumPoolSize: 10,
      poolIncrementSize: 1,
      blockingTimeout: 1000,
      expireTimeout: 1000,
      startupRetryCount: 0,
      startupBackoffSecs: 10,
    },
    connectionSettings: {
      alias: "",
      user: "",
      password: "",
      repoUser: "",
      repoPassword: "",
      client: 0,
      language: "",
      loadBalancing: "Off",
      appServerHost: "",
      systemNumber: "",
      logonGroup: "",
      messageServerHost: "",
      messageServerService: "",
      systemId: "",
      connectionType: "No",
      programId: "",
      gatewayHost: "",
      gatewayService: "",
      repositoryServer: "",
      sncMode: "No",
      sncQualityOfService: "",
      sncMyName: "",
      sncPartnerName: "",
      sncAuthentication: "",
      routerString: "",
      sapGui: "Off",
      rfcTrace: "Off",
      logTransactionStatus: "Off",
      storeMsgBody: "Off"
    }
  }

  public kafkaConnection = {
    connectionProperties: {
      ackIndicator: "0",
      batchSize: 0,
      clientID: "",
      compressionType: "",
      kafkaVersion: "",
      keySerializerClass: "",
      maxRetry: 0,
      otherProperties: "",
      partitionerClass: "",
      requestTimeOut: 0,
      sendBufferSize: 0,
      serverList: "",
      valueSerializerClass: ""
    },
    connectionManagerProperties: {
      poolable: "true",
      minimumPoolSize: 1,
      maximumPoolSize: 10,
      poolIncrementSize: 1,
      blockingTimeout: 1000,
      expireTimeout: 1000,
      startupRetryCount: 0,
      startupBackoffSecs: 10
    }
  };

  constructor(private route: ActivatedRoute, private kafkaConnectionService: KafkaConnectionService, private sapConnectionService: SapConnectionService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe({next: (params: Params) => {
      if(params['id'] !== undefined && params['id'] === "kafka" ) {
        this.selectSection("kafka-adapter");
      } else {
        this.selectSection("sap-adapter");
      }
    }});
  }

  public selectSection(name: string): void {
    this.selectedSection = name;
    if(this.selectedSection === "sap-adapter" && !this.sapConnectionConfigured) {
      this.getSAPConnection();
    }
    /*if(this.selectedSection === "kafka-adapter" && !this.kafkaConnectionConfigured) {
      this.getKafkaConnection();
    }*/
  }

  private getKafkaConnection(): void {
    this.kafkaConnectionService.getConnection().subscribe({next: (resp: KafkaConnectionResponse) => {
      this.kafkaConnection.connectionProperties.serverList = resp.response.connectionProperties.serverList;
      this.kafkaConnection.connectionProperties.ackIndicator = resp.response.connectionProperties.ackIndicator === "" ? "0" : resp.response.connectionProperties.ackIndicator;
      this.kafkaConnection.connectionProperties.requestTimeOut = resp.response.connectionProperties.requestTimeOut === "" ? 0 : Number(resp.response.connectionProperties.requestTimeOut);
      this.kafkaConnection.connectionProperties.valueSerializerClass = resp.response.connectionProperties.valueSerializerClass;
      this.kafkaConnection.connectionProperties.keySerializerClass = resp.response.connectionProperties.keySerializerClass;
      this.kafkaConnection.connectionProperties.partitionerClass = resp.response.connectionProperties.partitionerClass;
      this.kafkaConnection.connectionProperties.compressionType = resp.response.connectionProperties.compressionType;
      this.kafkaConnection.connectionProperties.maxRetry = resp.response.connectionProperties.maxRetry === "" ? 0 : Number(resp.response.connectionProperties.maxRetry);
      this.kafkaConnection.connectionProperties.batchSize = resp.response.connectionProperties.batchSize === "" ? 0 : Number(resp.response.connectionProperties.batchSize);
      this.kafkaConnection.connectionProperties.sendBufferSize = resp.response.connectionProperties.sendBufferSize === "" ? 0 : Number(resp.response.connectionProperties.sendBufferSize);
      this.kafkaConnection.connectionProperties.clientID = resp.response.connectionProperties.clientID;
      this.kafkaConnection.connectionProperties.kafkaVersion = resp.response.connectionProperties.kafkaVersion === "" ? "v9" : resp.response.connectionProperties.kafkaVersion;
      this.kafkaConnection.connectionProperties.otherProperties = resp.response.connectionProperties.otherProperties;
      this.kafkaConnection.connectionManagerProperties.poolable = resp.response.connectionManagerProperties.poolable === "" ? "true" : resp.response.connectionManagerProperties.poolable;
      this.kafkaConnection.connectionManagerProperties.minimumPoolSize = resp.response.connectionManagerProperties.minimumPoolSize === "" ? 0 : Number(resp.response.connectionManagerProperties.minimumPoolSize);
      this.kafkaConnection.connectionManagerProperties.maximumPoolSize = resp.response.connectionManagerProperties.maximumPoolSize === "" ? 10 : Number(resp.response.connectionManagerProperties.maximumPoolSize);
      this.kafkaConnection.connectionManagerProperties.poolIncrementSize = resp.response.connectionManagerProperties.poolIncrementSize === "" ? 1 : Number(resp.response.connectionManagerProperties.poolIncrementSize);
      this.kafkaConnection.connectionManagerProperties.blockingTimeout = resp.response.connectionManagerProperties.blockingTimeout === "" ? 1000 : Number(resp.response.connectionManagerProperties.blockingTimeout);
      this.kafkaConnection.connectionManagerProperties.expireTimeout = resp.response.connectionManagerProperties.expireTimeout === "" ? 1000 : Number(resp.response.connectionManagerProperties.expireTimeout);
      this.kafkaConnection.connectionManagerProperties.startupRetryCount = resp.response.connectionManagerProperties.startupRetryCount === "" ? 0 : Number(resp.response.connectionManagerProperties.startupRetryCount);
      this.kafkaConnection.connectionManagerProperties.startupBackoffSecs = resp.response.connectionManagerProperties.startupBackoffSecs === "" ? 10 : Number(resp.response.connectionManagerProperties.startupBackoffSecs);

      if(this.kafkaConnection.connectionProperties.serverList === undefined || this.kafkaConnection.connectionProperties.serverList === "") {
        this.kafkaConnectionConfigured = false;
      } else {
        this.kafkaConnectionConfigured = true;
      }
    }, error: (error: HttpErrorResponse) => {
      this.messageService.errorMessage(error.error.message);
    }});
  }

  private getSAPConnection(): void {
    this.sapConnectionService.getConnection().subscribe({ next: (resp: SAPConnectionResponse) => {
      this.sapConnection.connectionSettings.alias = resp.response.connectionSettings.alias;
      this.sapConnection.connectionSettings.user = resp.response.connectionSettings.user;
      this.sapConnection.connectionSettings.password = resp.response.connectionSettings.password;
      this.sapConnection.connectionSettings.repoUser = resp.response.connectionSettings.repoUser;
      this.sapConnection.connectionSettings.repoPassword = resp.response.connectionSettings.repoPassword;
      this.sapConnection.connectionSettings.client = Number(resp.response.connectionSettings.client);
      this.sapConnection.connectionSettings.language = resp.response.connectionSettings.language;
      this.sapConnection.connectionSettings.loadBalancing = resp.response.connectionSettings.loadBalancing === "" ? "Off" : resp.response.connectionSettings.loadBalancing;
      this.sapConnection.connectionSettings.appServerHost = resp.response.connectionSettings.appServerHost;
      this.sapConnection.connectionSettings.systemNumber = resp.response.connectionSettings.systemNumber;
      this.sapConnection.connectionSettings.logonGroup = resp.response.connectionSettings.logonGroup;
      this.sapConnection.connectionSettings.messageServerHost = resp.response.connectionSettings.messageServerHost;
      this.sapConnection.connectionSettings.messageServerService = resp.response.connectionSettings.messageServerService;
      this.sapConnection.connectionSettings.systemId = resp.response.connectionSettings.systemId;
      this.sapConnection.connectionSettings.connectionType = resp.response.connectionSettings.connectionType === "" ? "No" : resp.response.connectionSettings.connectionType;
      this.sapConnection.connectionSettings.programId = resp.response.connectionSettings.programId;
      this.sapConnection.connectionSettings.gatewayHost = resp.response.connectionSettings.gatewayHost;
      this.sapConnection.connectionSettings.gatewayService = resp.response.connectionSettings.gatewayService;
      this.sapConnection.connectionSettings.repositoryServer = resp.response.connectionSettings.repositoryServer;
      this.sapConnection.connectionSettings.sncMode = resp.response.connectionSettings.sncMode === "" ? "No" : resp.response.connectionSettings.sncMode;
      this.sapConnection.connectionSettings.sncQualityOfService = resp.response.connectionSettings.sncQualityOfService;
      this.sapConnection.connectionSettings.sncMyName = resp.response.connectionSettings.sncMyName;
      this.sapConnection.connectionSettings.sncPartnerName = resp.response.connectionSettings.sncPartnerName;
      this.sapConnection.connectionSettings.sncAuthentication = resp.response.connectionSettings.sncAuthentication;
      this.sapConnection.connectionSettings.routerString = resp.response.connectionSettings.routerString;
      this.sapConnection.connectionSettings.sapGui = resp.response.connectionSettings.sapGui === "" ? "Off" : resp.response.connectionSettings.sapGui;
      this.sapConnection.connectionSettings.rfcTrace = resp.response.connectionSettings.rfcTrace === "" ? "Off" : resp.response.connectionSettings.rfcTrace;
      this.sapConnection.connectionSettings.logTransactionStatus = resp.response.connectionSettings.logTransactionStatus === "" ? "Off" : resp.response.connectionSettings.logTransactionStatus;
      this.sapConnection.connectionSettings.storeMsgBody = resp.response.connectionSettings.storeMsgBody === "" ? "Off" : resp.response.connectionSettings.storeMsgBody;
      this.sapConnection.connectionManagerSettings.poolable = resp.response.connectionManagerSettings.poolable === "" ? "true" : resp.response.connectionManagerSettings.poolable;
      this.sapConnection.connectionManagerSettings.minimumPoolSize = resp.response.connectionManagerSettings.minimumPoolSize === "" ? 0 : Number(resp.response.connectionManagerSettings.minimumPoolSize);
      this.sapConnection.connectionManagerSettings.maximumPoolSize = resp.response.connectionManagerSettings.maximumPoolSize === "" ? 10 : Number(resp.response.connectionManagerSettings.maximumPoolSize);
      this.sapConnection.connectionManagerSettings.poolIncrementSize = resp.response.connectionManagerSettings.poolIncrementSize === "" ? 1 : Number(resp.response.connectionManagerSettings.poolIncrementSize);
      this.sapConnection.connectionManagerSettings.blockingTimeout = resp.response.connectionManagerSettings.blockingTimeout === "" ? 1000 : Number(resp.response.connectionManagerSettings.blockingTimeout);
      this.sapConnection.connectionManagerSettings.expireTimeout = resp.response.connectionManagerSettings.expireTimeout === "" ? 1000 : Number(resp.response.connectionManagerSettings.expireTimeout);
      this.sapConnection.connectionManagerSettings.startupRetryCount = resp.response.connectionManagerSettings.startupRetryCount === "" ? 0 : Number(resp.response.connectionManagerSettings.startupRetryCount);
      this.sapConnection.connectionManagerSettings.startupBackoffSecs = resp.response.connectionManagerSettings.startupBackoffSecs === "" ? 10 : Number(resp.response.connectionManagerSettings.startupBackoffSecs);

      if(this.sapConnection.connectionSettings.alias === undefined || this.sapConnection.connectionSettings.alias === "") {
        this.sapConnectionConfigured = false;
      } else {
        this.sapConnectionConfigured = true;
      }
    }, error: (error: HttpErrorResponse) => {
      if(error.status === 401) {
        this.router.navigate(['/login']);
        this.messageService.errorMessage("Your session has expired.");
      } else {
        this.messageService.errorMessage(error.error.message);
      }
    }});
  }

  public updateKafkaConnection() {
    let updatedKafkaConnection: KafkaConnection = {
      connectionProperties: {
        serverList: this.kafkaConnection.connectionProperties.serverList,
        ackIndicator: this.kafkaConnection.connectionProperties.ackIndicator,
        requestTimeOut: this.kafkaConnection.connectionProperties.requestTimeOut.toString(),
        valueSerializerClass: this.kafkaConnection.connectionProperties.valueSerializerClass,
        keySerializerClass: this.kafkaConnection.connectionProperties.keySerializerClass,
        partitionerClass: this.kafkaConnection.connectionProperties.partitionerClass,
        compressionType: this.kafkaConnection.connectionProperties.compressionType,
        maxRetry: this.kafkaConnection.connectionProperties.maxRetry.toString(),
        batchSize: this.kafkaConnection.connectionProperties.batchSize.toString(),
        sendBufferSize: this.kafkaConnection.connectionProperties.sendBufferSize.toString(),
        clientID: this.kafkaConnection.connectionProperties.clientID,
        kafkaVersion: this.kafkaConnection.connectionProperties.kafkaVersion,
        otherProperties: this.kafkaConnection.connectionProperties.otherProperties
      },
      connectionManagerProperties: {
        poolable: this.kafkaConnection.connectionManagerProperties.poolable,
        minimumPoolSize: this.kafkaConnection.connectionManagerProperties.minimumPoolSize.toString(),
        maximumPoolSize: this.kafkaConnection.connectionManagerProperties.maximumPoolSize.toString(),
        poolIncrementSize: this.kafkaConnection.connectionManagerProperties.poolIncrementSize.toString(),
        blockingTimeout: this.kafkaConnection.connectionManagerProperties.blockingTimeout.toString(),
        expireTimeout: this.kafkaConnection.connectionManagerProperties.expireTimeout.toString(),
        startupRetryCount: this.kafkaConnection.connectionManagerProperties.startupRetryCount.toString(),
        startupBackoffSecs: this.kafkaConnection.connectionManagerProperties.startupBackoffSecs.toString()        
      }
    }

    if(this.kafkaConnectionConfigured) {
      this.kafkaConnectionService.updateConnection(updatedKafkaConnection).subscribe((resp) => {
        this.messageService.successMessage("Kafka connection updated.");
      });
    } else {
      this.kafkaConnectionService.createConnection(updatedKafkaConnection).subscribe((resp) => {
        this.messageService.successMessage("Kafka connection created.");
        this.kafkaConnectionConfigured = true;
      });
    }
    
  }

  public updateSAPConnection() {
    let updatedSAPConnection: SAPConnection = {
      connectionSettings: {
        alias: this.sapConnection.connectionSettings.alias,
        user: this.sapConnection.connectionSettings.user,
        password: this.sapConnection.connectionSettings.password,
        repoUser: this.sapConnection.connectionSettings.repoUser,
        repoPassword: this.sapConnection.connectionSettings.repoPassword,
        client: this.sapConnection.connectionSettings.client.toString(),
        language: this.sapConnection.connectionSettings.language,
        loadBalancing: this.sapConnection.connectionSettings.loadBalancing,
        appServerHost: this.sapConnection.connectionSettings.appServerHost,
        systemNumber: this.sapConnection.connectionSettings.systemNumber,
        logonGroup: this.sapConnection.connectionSettings.logonGroup,
        messageServerHost: this.sapConnection.connectionSettings.messageServerHost,
        messageServerService: this.sapConnection.connectionSettings.messageServerService,
        systemId: this.sapConnection.connectionSettings.systemId,
        connectionType: this.sapConnection.connectionSettings.connectionType,
        programId: this.sapConnection.connectionSettings.programId,
        gatewayHost: this.sapConnection.connectionSettings.gatewayHost,
        gatewayService: this.sapConnection.connectionSettings.gatewayService,
        repositoryServer: this.sapConnection.connectionSettings.repositoryServer,
        sncMode: this.sapConnection.connectionSettings.sncMode,
        sncQualityOfService: this.sapConnection.connectionSettings.sncQualityOfService,
        sncMyName: this.sapConnection.connectionSettings.sncMyName,
        sncPartnerName: this.sapConnection.connectionSettings.sncPartnerName,
        sncAuthentication: this.sapConnection.connectionSettings.sncAuthentication,
        routerString: this.sapConnection.connectionSettings.routerString,
        sapGui: this.sapConnection.connectionSettings.sapGui,
        rfcTrace: this.sapConnection.connectionSettings.rfcTrace,
        logTransactionStatus: this.sapConnection.connectionSettings.logTransactionStatus,
        storeMsgBody: this.sapConnection.connectionSettings.storeMsgBody
      },
      connectionManagerSettings: {
        poolable: this.sapConnection.connectionManagerSettings.poolable,
        minimumPoolSize: this.sapConnection.connectionManagerSettings.minimumPoolSize.toString(),
        maximumPoolSize: this.sapConnection.connectionManagerSettings.maximumPoolSize.toString(),
        poolIncrementSize: this.sapConnection.connectionManagerSettings.poolIncrementSize.toString(),
        blockingTimeout: this.sapConnection.connectionManagerSettings.blockingTimeout.toString(),
        expireTimeout: this.sapConnection.connectionManagerSettings.expireTimeout.toString(),
        startupRetryCount: this.sapConnection.connectionManagerSettings.startupRetryCount.toString(),
        startupBackoffSecs: this.sapConnection.connectionManagerSettings.startupBackoffSecs.toString()
      }
    };

    if(this.sapConnectionConfigured) {
      this.sapConnectionService.updateConnection(updatedSAPConnection).subscribe({next: (resp) => {
        this.messageService.successMessage("SAP connection updated.");
      }, error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
          this.messageService.errorMessage("Your session has expired.");
        } else {
          this.messageService.errorMessage(error.error.message);
        }
      }});
    } else {
      this.sapConnectionService.createConnection(updatedSAPConnection).subscribe({next: (resp) => {
        this.messageService.successMessage("SAP connection created.");
      }, error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.router.navigate(['/login']);
          this.messageService.errorMessage("Your session has expired.");
        } else {
          this.messageService.errorMessage(error.error.message);
        }
      }});
    }
  }

}
