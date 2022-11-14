# WxSAPIntegration

WxSAPIntegration is a webMethods Integration Server package that gives a quickstart to develop or demo an integration with SAP ECC. It provides user-friendly custom UI that specifically allows to configure and manage the a SAP connection. It comes with some example REST APIs like Get all customers, Get customer by id, Search customers, Get all equipments, Get equipment by id, Search equipments, Search sales orders and Create sales order.

## Pre-requisites
* webMethods Integration Server
  * Developed and tested on Integration Server 10.11
* webMethods SAP Adapter

## Install WxSAPIntegration package
1. Download the latest release of WxSAPIntegration.zip from Releases section.
2. Copy WxSAPIntegration.zip to /${SAG_HOME}/IntegrationServer/instances/${INSTANCE}/replicate/inbound directory.
3. Login to Integration Server Admin Console http://${HOST_NAME}:5555.
4. Go to Packages > Management in the left side menu and click Install Inbound Releases.
5. Choose WxSAPIntegration.zip from dropdown and click Install.

## Configure SAP Connection
1. Go to http://${HOST_NAME}:5555/WxSAPIntegration/.
2. Login using Administrator user, if not logged in already.
3. Go to Configuration to configure SAP connection parameters.
4. Go to Dashboard to enable the connection.

## Usage
1. Go to http://${HOST_NAME}:5555/WxSAPIntegration/.
2. Login using Administrator user, if not logged in already.
3. Go to OpenAPI tab in the left side menu to see the OpenAPI specification based documentation of all the REST APIs provided by WxSAPIntegration. You can copy the page content to Swagger Editor https://editor-next.swagger.io/ to get user friendly view of APIs.
4. Use any REST client to consume the APIs.
