import { useState, useRef, useEffect, MouseEvent } from 'react';
import {
  Database, Server, Globe, Shield, Lock, Users,
  Layers, Box, HardDrive, Cpu, Network, Zap, MessageSquare,
  Trash2, Download, RotateCcw, Search, X, Maximize2,
  Minimize2, Square, Monitor, Wifi, Key,
  Activity, BarChart, FileText, GitBranch, Container, Eye,
  Cog, Send, Bell, Play, Gauge, Binary, Workflow, Radio,
  Timer, FileCode, Folder, Archive, RefreshCw, CloudCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCloudIcon } from './CloudIcons';

const THEME_PRIMARY = "#1E9AD6";

// Cloud provider definitions
type CloudProvider = 'aws' | 'azure' | 'gcp' | 'huawei' | 'generic';

const cloudProviders: Record<CloudProvider, { name: string; color: string; shortName: string }> = {
  aws: { name: 'Amazon Web Services', color: '#FF9900', shortName: 'AWS' },
  azure: { name: 'Microsoft Azure', color: '#0078D4', shortName: 'Azure' },
  gcp: { name: 'Google Cloud Platform', color: '#4285F4', shortName: 'GCP' },
  huawei: { name: 'Huawei Cloud', color: '#CF0A2C', shortName: 'Huawei' },
  generic: { name: 'Generic / Multi-Cloud', color: '#6b7280', shortName: 'Generic' },
};

// Service component interface
interface CloudService {
  id: string;
  name: string;
  shortName: string;
  category: string;
  icon: any;
  color: string;
  isContainer?: boolean;
  keywords: string[]; // For search
}

// =====================================================
// COMPREHENSIVE CLOUD SERVICE CATALOGS
// =====================================================

const awsServices: CloudService[] = [
  // Compute
  { id: 'aws-ec2', name: 'Elastic Compute Cloud', shortName: 'EC2', category: 'Compute', icon: Server, color: '#FF9900', keywords: ['ec2', 'instance', 'virtual machine', 'vm', 'server', 'compute'] },
  { id: 'aws-lambda', name: 'Lambda', shortName: 'Lambda', category: 'Compute', icon: Zap, color: '#FF9900', keywords: ['lambda', 'function', 'serverless', 'faas'] },
  { id: 'aws-ecs', name: 'Elastic Container Service', shortName: 'ECS', category: 'Compute', icon: Box, color: '#FF9900', keywords: ['ecs', 'container', 'docker', 'fargate'] },
  { id: 'aws-eks', name: 'Elastic Kubernetes Service', shortName: 'EKS', category: 'Compute', icon: Container, color: '#FF9900', keywords: ['eks', 'kubernetes', 'k8s', 'container'] },
  { id: 'aws-batch', name: 'Batch', shortName: 'Batch', category: 'Compute', icon: Workflow, color: '#FF9900', keywords: ['batch', 'job', 'compute'] },
  { id: 'aws-lightsail', name: 'Lightsail', shortName: 'Lightsail', category: 'Compute', icon: Monitor, color: '#FF9900', keywords: ['lightsail', 'vps', 'simple'] },
  { id: 'aws-outposts', name: 'Outposts', shortName: 'Outposts', category: 'Compute', icon: Server, color: '#FF9900', keywords: ['outposts', 'hybrid', 'on-premises'] },

  // Storage
  { id: 'aws-s3', name: 'Simple Storage Service', shortName: 'S3', category: 'Storage', icon: HardDrive, color: '#3F8624', keywords: ['s3', 'storage', 'bucket', 'object', 'blob'] },
  { id: 'aws-ebs', name: 'Elastic Block Store', shortName: 'EBS', category: 'Storage', icon: HardDrive, color: '#3F8624', keywords: ['ebs', 'block', 'volume', 'disk'] },
  { id: 'aws-efs', name: 'Elastic File System', shortName: 'EFS', category: 'Storage', icon: Folder, color: '#3F8624', keywords: ['efs', 'file', 'nfs', 'shared'] },
  { id: 'aws-fsx', name: 'FSx', shortName: 'FSx', category: 'Storage', icon: Folder, color: '#3F8624', keywords: ['fsx', 'lustre', 'windows', 'file'] },
  { id: 'aws-glacier', name: 'S3 Glacier', shortName: 'Glacier', category: 'Storage', icon: Archive, color: '#3F8624', keywords: ['glacier', 'archive', 'cold', 'backup'] },
  { id: 'aws-backup', name: 'Backup', shortName: 'Backup', category: 'Storage', icon: RefreshCw, color: '#3F8624', keywords: ['backup', 'recovery', 'restore'] },

  // Database
  { id: 'aws-rds', name: 'Relational Database Service', shortName: 'RDS', category: 'Database', icon: Database, color: '#3B48CC', keywords: ['rds', 'mysql', 'postgres', 'sql', 'database', 'relational'] },
  { id: 'aws-dynamodb', name: 'DynamoDB', shortName: 'DynamoDB', category: 'Database', icon: Database, color: '#3B48CC', keywords: ['dynamodb', 'nosql', 'key-value', 'document'] },
  { id: 'aws-aurora', name: 'Aurora', shortName: 'Aurora', category: 'Database', icon: Database, color: '#3B48CC', keywords: ['aurora', 'mysql', 'postgres', 'serverless'] },
  { id: 'aws-redshift', name: 'Redshift', shortName: 'Redshift', category: 'Database', icon: Database, color: '#3B48CC', keywords: ['redshift', 'warehouse', 'analytics', 'olap'] },
  { id: 'aws-elasticache', name: 'ElastiCache', shortName: 'ElastiCache', category: 'Database', icon: Activity, color: '#3B48CC', keywords: ['elasticache', 'redis', 'memcached', 'cache'] },
  { id: 'aws-neptune', name: 'Neptune', shortName: 'Neptune', category: 'Database', icon: Database, color: '#3B48CC', keywords: ['neptune', 'graph', 'database'] },
  { id: 'aws-documentdb', name: 'DocumentDB', shortName: 'DocumentDB', category: 'Database', icon: Database, color: '#3B48CC', keywords: ['documentdb', 'mongodb', 'document', 'nosql'] },

  // Networking
  { id: 'aws-vpc', name: 'Virtual Private Cloud', shortName: 'VPC', category: 'Networking', icon: Square, color: '#8C4FFF', isContainer: true, keywords: ['vpc', 'network', 'virtual', 'private'] },
  { id: 'aws-subnet', name: 'Subnet', shortName: 'Subnet', category: 'Networking', icon: Square, color: '#8C4FFF', isContainer: true, keywords: ['subnet', 'network', 'cidr'] },
  { id: 'aws-elb', name: 'Elastic Load Balancing', shortName: 'ELB/ALB', category: 'Networking', icon: Layers, color: '#8C4FFF', keywords: ['elb', 'alb', 'nlb', 'load balancer'] },
  { id: 'aws-apigw', name: 'API Gateway', shortName: 'API Gateway', category: 'Networking', icon: Globe, color: '#8C4FFF', keywords: ['api gateway', 'rest', 'websocket', 'http'] },
  { id: 'aws-cloudfront', name: 'CloudFront', shortName: 'CloudFront', category: 'Networking', icon: Globe, color: '#8C4FFF', keywords: ['cloudfront', 'cdn', 'edge', 'cache'] },
  { id: 'aws-route53', name: 'Route 53', shortName: 'Route 53', category: 'Networking', icon: Globe, color: '#8C4FFF', keywords: ['route53', 'dns', 'domain'] },
  { id: 'aws-directconnect', name: 'Direct Connect', shortName: 'Direct Connect', category: 'Networking', icon: Network, color: '#8C4FFF', keywords: ['direct connect', 'dedicated', 'connection'] },
  { id: 'aws-nat', name: 'NAT Gateway', shortName: 'NAT Gateway', category: 'Networking', icon: Network, color: '#8C4FFF', keywords: ['nat', 'gateway', 'private'] },
  { id: 'aws-igw', name: 'Internet Gateway', shortName: 'IGW', category: 'Networking', icon: Globe, color: '#8C4FFF', keywords: ['igw', 'internet', 'gateway'] },
  { id: 'aws-transit', name: 'Transit Gateway', shortName: 'Transit GW', category: 'Networking', icon: Network, color: '#8C4FFF', keywords: ['transit', 'gateway', 'hub'] },

  // Security
  { id: 'aws-iam', name: 'Identity & Access Management', shortName: 'IAM', category: 'Security', icon: Key, color: '#DD344C', keywords: ['iam', 'identity', 'access', 'role', 'policy'] },
  { id: 'aws-cognito', name: 'Cognito', shortName: 'Cognito', category: 'Security', icon: Users, color: '#DD344C', keywords: ['cognito', 'auth', 'user', 'identity'] },
  { id: 'aws-waf', name: 'Web Application Firewall', shortName: 'WAF', category: 'Security', icon: Shield, color: '#DD344C', keywords: ['waf', 'firewall', 'web', 'protection'] },
  { id: 'aws-shield', name: 'Shield', shortName: 'Shield', category: 'Security', icon: Shield, color: '#DD344C', keywords: ['shield', 'ddos', 'protection'] },
  { id: 'aws-kms', name: 'Key Management Service', shortName: 'KMS', category: 'Security', icon: Lock, color: '#DD344C', keywords: ['kms', 'key', 'encryption', 'secrets'] },
  { id: 'aws-secrets', name: 'Secrets Manager', shortName: 'Secrets Manager', category: 'Security', icon: Lock, color: '#DD344C', keywords: ['secrets', 'manager', 'credentials'] },
  { id: 'aws-sg', name: 'Security Group', shortName: 'Security Group', category: 'Security', icon: Shield, color: '#DD344C', keywords: ['security group', 'firewall', 'inbound', 'outbound'] },
  { id: 'aws-acm', name: 'Certificate Manager', shortName: 'ACM', category: 'Security', icon: Lock, color: '#DD344C', keywords: ['acm', 'certificate', 'ssl', 'tls'] },

  // Integration
  { id: 'aws-sqs', name: 'Simple Queue Service', shortName: 'SQS', category: 'Integration', icon: MessageSquare, color: '#E7157B', keywords: ['sqs', 'queue', 'message', 'async'] },
  { id: 'aws-sns', name: 'Simple Notification Service', shortName: 'SNS', category: 'Integration', icon: Bell, color: '#E7157B', keywords: ['sns', 'notification', 'pub/sub', 'topic'] },
  { id: 'aws-eventbridge', name: 'EventBridge', shortName: 'EventBridge', category: 'Integration', icon: Activity, color: '#E7157B', keywords: ['eventbridge', 'event', 'bus', 'rule'] },
  { id: 'aws-stepfunctions', name: 'Step Functions', shortName: 'Step Functions', category: 'Integration', icon: Workflow, color: '#E7157B', keywords: ['step functions', 'workflow', 'state machine'] },
  { id: 'aws-mq', name: 'Amazon MQ', shortName: 'Amazon MQ', category: 'Integration', icon: MessageSquare, color: '#E7157B', keywords: ['mq', 'rabbitmq', 'activemq', 'message'] },

  // Analytics
  { id: 'aws-kinesis', name: 'Kinesis', shortName: 'Kinesis', category: 'Analytics', icon: Activity, color: '#8C4FFF', keywords: ['kinesis', 'stream', 'real-time', 'data'] },
  { id: 'aws-athena', name: 'Athena', shortName: 'Athena', category: 'Analytics', icon: BarChart, color: '#8C4FFF', keywords: ['athena', 'query', 's3', 'sql'] },
  { id: 'aws-emr', name: 'EMR', shortName: 'EMR', category: 'Analytics', icon: Cpu, color: '#8C4FFF', keywords: ['emr', 'hadoop', 'spark', 'big data'] },
  { id: 'aws-glue', name: 'Glue', shortName: 'Glue', category: 'Analytics', icon: Workflow, color: '#8C4FFF', keywords: ['glue', 'etl', 'catalog', 'data'] },
  { id: 'aws-quicksight', name: 'QuickSight', shortName: 'QuickSight', category: 'Analytics', icon: BarChart, color: '#8C4FFF', keywords: ['quicksight', 'bi', 'visualization', 'dashboard'] },

  // AI/ML
  { id: 'aws-sagemaker', name: 'SageMaker', shortName: 'SageMaker', category: 'AI/ML', icon: Binary, color: '#01A88D', keywords: ['sagemaker', 'ml', 'machine learning', 'training'] },
  { id: 'aws-bedrock', name: 'Bedrock', shortName: 'Bedrock', category: 'AI/ML', icon: Binary, color: '#01A88D', keywords: ['bedrock', 'ai', 'foundation', 'llm', 'generative'] },
  { id: 'aws-rekognition', name: 'Rekognition', shortName: 'Rekognition', category: 'AI/ML', icon: Eye, color: '#01A88D', keywords: ['rekognition', 'image', 'video', 'vision'] },
  { id: 'aws-comprehend', name: 'Comprehend', shortName: 'Comprehend', category: 'AI/ML', icon: FileText, color: '#01A88D', keywords: ['comprehend', 'nlp', 'text', 'language'] },
  { id: 'aws-polly', name: 'Polly', shortName: 'Polly', category: 'AI/ML', icon: Radio, color: '#01A88D', keywords: ['polly', 'speech', 'tts', 'voice'] },
  { id: 'aws-lex', name: 'Lex', shortName: 'Lex', category: 'AI/ML', icon: MessageSquare, color: '#01A88D', keywords: ['lex', 'chatbot', 'conversation', 'bot'] },

  // DevOps
  { id: 'aws-codepipeline', name: 'CodePipeline', shortName: 'CodePipeline', category: 'DevOps', icon: Workflow, color: '#3B48CC', keywords: ['codepipeline', 'ci/cd', 'pipeline', 'deploy'] },
  { id: 'aws-codebuild', name: 'CodeBuild', shortName: 'CodeBuild', category: 'DevOps', icon: Cog, color: '#3B48CC', keywords: ['codebuild', 'build', 'compile', 'test'] },
  { id: 'aws-codecommit', name: 'CodeCommit', shortName: 'CodeCommit', category: 'DevOps', icon: GitBranch, color: '#3B48CC', keywords: ['codecommit', 'git', 'repository', 'source'] },
  { id: 'aws-cloudwatch', name: 'CloudWatch', shortName: 'CloudWatch', category: 'DevOps', icon: Gauge, color: '#E7157B', keywords: ['cloudwatch', 'monitoring', 'logs', 'metrics', 'alarms'] },
  { id: 'aws-xray', name: 'X-Ray', shortName: 'X-Ray', category: 'DevOps', icon: Activity, color: '#E7157B', keywords: ['xray', 'tracing', 'debug', 'distributed'] },
  { id: 'aws-cloudformation', name: 'CloudFormation', shortName: 'CloudFormation', category: 'DevOps', icon: FileCode, color: '#E7157B', keywords: ['cloudformation', 'iac', 'infrastructure', 'template'] },
];

const azureServices: CloudService[] = [
  // Compute
  { id: 'azure-vm', name: 'Virtual Machines', shortName: 'VM', category: 'Compute', icon: Server, color: '#0078D4', keywords: ['vm', 'virtual machine', 'compute', 'instance'] },
  { id: 'azure-functions', name: 'Functions', shortName: 'Functions', category: 'Compute', icon: Zap, color: '#0078D4', keywords: ['functions', 'serverless', 'faas'] },
  { id: 'azure-aks', name: 'Azure Kubernetes Service', shortName: 'AKS', category: 'Compute', icon: Container, color: '#0078D4', keywords: ['aks', 'kubernetes', 'k8s', 'container'] },
  { id: 'azure-container', name: 'Container Instances', shortName: 'ACI', category: 'Compute', icon: Box, color: '#0078D4', keywords: ['aci', 'container', 'docker'] },
  { id: 'azure-appservice', name: 'App Service', shortName: 'App Service', category: 'Compute', icon: Play, color: '#0078D4', keywords: ['app service', 'web app', 'paas'] },
  { id: 'azure-batch', name: 'Batch', shortName: 'Batch', category: 'Compute', icon: Workflow, color: '#0078D4', keywords: ['batch', 'job', 'hpc'] },
  { id: 'azure-vmss', name: 'VM Scale Sets', shortName: 'VMSS', category: 'Compute', icon: Server, color: '#0078D4', keywords: ['vmss', 'scale set', 'autoscale'] },

  // Storage
  { id: 'azure-blob', name: 'Blob Storage', shortName: 'Blob', category: 'Storage', icon: HardDrive, color: '#0078D4', keywords: ['blob', 'storage', 'object', 's3'] },
  { id: 'azure-files', name: 'Azure Files', shortName: 'Files', category: 'Storage', icon: Folder, color: '#0078D4', keywords: ['files', 'smb', 'nfs', 'share'] },
  { id: 'azure-disk', name: 'Managed Disks', shortName: 'Disks', category: 'Storage', icon: HardDrive, color: '#0078D4', keywords: ['disk', 'managed', 'block', 'ssd'] },
  { id: 'azure-archive', name: 'Archive Storage', shortName: 'Archive', category: 'Storage', icon: Archive, color: '#0078D4', keywords: ['archive', 'cold', 'backup'] },
  { id: 'azure-datalake', name: 'Data Lake Storage', shortName: 'ADLS', category: 'Storage', icon: Database, color: '#0078D4', keywords: ['data lake', 'adls', 'analytics', 'big data'] },

  // Database
  { id: 'azure-sql', name: 'Azure SQL Database', shortName: 'SQL Database', category: 'Database', icon: Database, color: '#0078D4', keywords: ['sql', 'database', 'relational', 'mssql'] },
  { id: 'azure-cosmos', name: 'Cosmos DB', shortName: 'Cosmos DB', category: 'Database', icon: Database, color: '#0078D4', keywords: ['cosmos', 'nosql', 'global', 'multi-model'] },
  { id: 'azure-mysql', name: 'Database for MySQL', shortName: 'MySQL', category: 'Database', icon: Database, color: '#0078D4', keywords: ['mysql', 'database', 'open source'] },
  { id: 'azure-postgres', name: 'Database for PostgreSQL', shortName: 'PostgreSQL', category: 'Database', icon: Database, color: '#0078D4', keywords: ['postgres', 'postgresql', 'database'] },
  { id: 'azure-redis', name: 'Azure Cache for Redis', shortName: 'Redis', category: 'Database', icon: Activity, color: '#0078D4', keywords: ['redis', 'cache', 'in-memory'] },
  { id: 'azure-synapse', name: 'Synapse Analytics', shortName: 'Synapse', category: 'Database', icon: Database, color: '#0078D4', keywords: ['synapse', 'warehouse', 'analytics', 'sql'] },

  // Networking
  { id: 'azure-vnet', name: 'Virtual Network', shortName: 'VNet', category: 'Networking', icon: Square, color: '#0078D4', isContainer: true, keywords: ['vnet', 'virtual network', 'vpc'] },
  { id: 'azure-subnet', name: 'Subnet', shortName: 'Subnet', category: 'Networking', icon: Square, color: '#0078D4', isContainer: true, keywords: ['subnet', 'network'] },
  { id: 'azure-lb', name: 'Load Balancer', shortName: 'Load Balancer', category: 'Networking', icon: Layers, color: '#0078D4', keywords: ['load balancer', 'lb', 'traffic'] },
  { id: 'azure-appgw', name: 'Application Gateway', shortName: 'App Gateway', category: 'Networking', icon: Layers, color: '#0078D4', keywords: ['application gateway', 'waf', 'layer 7'] },
  { id: 'azure-frontdoor', name: 'Front Door', shortName: 'Front Door', category: 'Networking', icon: Globe, color: '#0078D4', keywords: ['front door', 'cdn', 'global', 'load balancer'] },
  { id: 'azure-cdn', name: 'CDN', shortName: 'CDN', category: 'Networking', icon: Globe, color: '#0078D4', keywords: ['cdn', 'content delivery', 'edge'] },
  { id: 'azure-dns', name: 'DNS', shortName: 'DNS', category: 'Networking', icon: Globe, color: '#0078D4', keywords: ['dns', 'domain', 'zone'] },
  { id: 'azure-expressroute', name: 'ExpressRoute', shortName: 'ExpressRoute', category: 'Networking', icon: Network, color: '#0078D4', keywords: ['expressroute', 'dedicated', 'private'] },
  { id: 'azure-vpngw', name: 'VPN Gateway', shortName: 'VPN Gateway', category: 'Networking', icon: Lock, color: '#0078D4', keywords: ['vpn', 'gateway', 'site-to-site'] },
  { id: 'azure-bastion', name: 'Bastion', shortName: 'Bastion', category: 'Networking', icon: Shield, color: '#0078D4', keywords: ['bastion', 'jump', 'rdp', 'ssh'] },

  // Security
  { id: 'azure-aad', name: 'Azure Active Directory', shortName: 'Azure AD', category: 'Security', icon: Users, color: '#0078D4', keywords: ['aad', 'active directory', 'identity', 'entra'] },
  { id: 'azure-keyvault', name: 'Key Vault', shortName: 'Key Vault', category: 'Security', icon: Lock, color: '#0078D4', keywords: ['key vault', 'secrets', 'keys', 'certificates'] },
  { id: 'azure-sentinel', name: 'Sentinel', shortName: 'Sentinel', category: 'Security', icon: Shield, color: '#0078D4', keywords: ['sentinel', 'siem', 'security', 'threat'] },
  { id: 'azure-defender', name: 'Defender for Cloud', shortName: 'Defender', category: 'Security', icon: Shield, color: '#0078D4', keywords: ['defender', 'security center', 'protection'] },
  { id: 'azure-firewall', name: 'Azure Firewall', shortName: 'Firewall', category: 'Security', icon: Shield, color: '#0078D4', keywords: ['firewall', 'network', 'security'] },
  { id: 'azure-nsg', name: 'Network Security Group', shortName: 'NSG', category: 'Security', icon: Shield, color: '#0078D4', keywords: ['nsg', 'security group', 'firewall', 'rules'] },

  // Integration
  { id: 'azure-servicebus', name: 'Service Bus', shortName: 'Service Bus', category: 'Integration', icon: MessageSquare, color: '#0078D4', keywords: ['service bus', 'queue', 'topic', 'message'] },
  { id: 'azure-eventgrid', name: 'Event Grid', shortName: 'Event Grid', category: 'Integration', icon: Activity, color: '#0078D4', keywords: ['event grid', 'event', 'pub/sub'] },
  { id: 'azure-eventhubs', name: 'Event Hubs', shortName: 'Event Hubs', category: 'Integration', icon: Activity, color: '#0078D4', keywords: ['event hubs', 'kafka', 'streaming', 'ingestion'] },
  { id: 'azure-logicapps', name: 'Logic Apps', shortName: 'Logic Apps', category: 'Integration', icon: Workflow, color: '#0078D4', keywords: ['logic apps', 'workflow', 'automation', 'integration'] },
  { id: 'azure-apim', name: 'API Management', shortName: 'APIM', category: 'Integration', icon: Globe, color: '#0078D4', keywords: ['apim', 'api management', 'gateway', 'portal'] },

  // AI/ML
  { id: 'azure-ml', name: 'Machine Learning', shortName: 'Azure ML', category: 'AI/ML', icon: Binary, color: '#0078D4', keywords: ['machine learning', 'ml', 'training', 'model'] },
  { id: 'azure-openai', name: 'Azure OpenAI', shortName: 'OpenAI', category: 'AI/ML', icon: Binary, color: '#0078D4', keywords: ['openai', 'gpt', 'ai', 'llm', 'generative'] },
  { id: 'azure-cognitive', name: 'Cognitive Services', shortName: 'Cognitive', category: 'AI/ML', icon: Eye, color: '#0078D4', keywords: ['cognitive', 'vision', 'speech', 'language'] },
  { id: 'azure-botservice', name: 'Bot Service', shortName: 'Bot Service', category: 'AI/ML', icon: MessageSquare, color: '#0078D4', keywords: ['bot', 'chatbot', 'conversation'] },

  // DevOps
  { id: 'azure-devops', name: 'Azure DevOps', shortName: 'DevOps', category: 'DevOps', icon: Workflow, color: '#0078D4', keywords: ['devops', 'ci/cd', 'pipeline', 'boards'] },
  { id: 'azure-monitor', name: 'Monitor', shortName: 'Monitor', category: 'DevOps', icon: Gauge, color: '#0078D4', keywords: ['monitor', 'metrics', 'logs', 'insights'] },
  { id: 'azure-appinsights', name: 'Application Insights', shortName: 'App Insights', category: 'DevOps', icon: Eye, color: '#0078D4', keywords: ['application insights', 'apm', 'tracing', 'telemetry'] },
  { id: 'azure-arm', name: 'ARM Templates', shortName: 'ARM', category: 'DevOps', icon: FileCode, color: '#0078D4', keywords: ['arm', 'template', 'iac', 'bicep'] },
];

const gcpServices: CloudService[] = [
  // Compute
  { id: 'gcp-gce', name: 'Compute Engine', shortName: 'GCE', category: 'Compute', icon: Server, color: '#4285F4', keywords: ['gce', 'compute engine', 'vm', 'instance'] },
  { id: 'gcp-functions', name: 'Cloud Functions', shortName: 'Functions', category: 'Compute', icon: Zap, color: '#4285F4', keywords: ['functions', 'serverless', 'faas'] },
  { id: 'gcp-run', name: 'Cloud Run', shortName: 'Cloud Run', category: 'Compute', icon: Play, color: '#4285F4', keywords: ['cloud run', 'serverless', 'container'] },
  { id: 'gcp-gke', name: 'Google Kubernetes Engine', shortName: 'GKE', category: 'Compute', icon: Container, color: '#4285F4', keywords: ['gke', 'kubernetes', 'k8s', 'container'] },
  { id: 'gcp-appengine', name: 'App Engine', shortName: 'App Engine', category: 'Compute', icon: Play, color: '#4285F4', keywords: ['app engine', 'paas', 'managed'] },

  // Storage
  { id: 'gcp-gcs', name: 'Cloud Storage', shortName: 'GCS', category: 'Storage', icon: HardDrive, color: '#4285F4', keywords: ['gcs', 'cloud storage', 'bucket', 'object'] },
  { id: 'gcp-filestore', name: 'Filestore', shortName: 'Filestore', category: 'Storage', icon: Folder, color: '#4285F4', keywords: ['filestore', 'nfs', 'file', 'share'] },
  { id: 'gcp-disk', name: 'Persistent Disk', shortName: 'Persistent Disk', category: 'Storage', icon: HardDrive, color: '#4285F4', keywords: ['persistent disk', 'block', 'ssd', 'storage'] },

  // Database
  { id: 'gcp-cloudsql', name: 'Cloud SQL', shortName: 'Cloud SQL', category: 'Database', icon: Database, color: '#4285F4', keywords: ['cloud sql', 'mysql', 'postgres', 'sql server'] },
  { id: 'gcp-spanner', name: 'Cloud Spanner', shortName: 'Spanner', category: 'Database', icon: Database, color: '#4285F4', keywords: ['spanner', 'global', 'relational', 'distributed'] },
  { id: 'gcp-firestore', name: 'Firestore', shortName: 'Firestore', category: 'Database', icon: Database, color: '#4285F4', keywords: ['firestore', 'nosql', 'document', 'realtime'] },
  { id: 'gcp-bigtable', name: 'Bigtable', shortName: 'Bigtable', category: 'Database', icon: Database, color: '#4285F4', keywords: ['bigtable', 'nosql', 'wide-column', 'hbase'] },
  { id: 'gcp-memorystore', name: 'Memorystore', shortName: 'Memorystore', category: 'Database', icon: Activity, color: '#4285F4', keywords: ['memorystore', 'redis', 'memcached', 'cache'] },
  { id: 'gcp-bigquery', name: 'BigQuery', shortName: 'BigQuery', category: 'Database', icon: Database, color: '#4285F4', keywords: ['bigquery', 'warehouse', 'analytics', 'sql'] },

  // Networking
  { id: 'gcp-vpc', name: 'VPC Network', shortName: 'VPC', category: 'Networking', icon: Square, color: '#4285F4', isContainer: true, keywords: ['vpc', 'network', 'virtual'] },
  { id: 'gcp-subnet', name: 'Subnet', shortName: 'Subnet', category: 'Networking', icon: Square, color: '#4285F4', isContainer: true, keywords: ['subnet', 'network', 'cidr'] },
  { id: 'gcp-lb', name: 'Cloud Load Balancing', shortName: 'Load Balancer', category: 'Networking', icon: Layers, color: '#4285F4', keywords: ['load balancer', 'lb', 'global', 'http'] },
  { id: 'gcp-cdn', name: 'Cloud CDN', shortName: 'CDN', category: 'Networking', icon: Globe, color: '#4285F4', keywords: ['cdn', 'cache', 'edge', 'content'] },
  { id: 'gcp-dns', name: 'Cloud DNS', shortName: 'DNS', category: 'Networking', icon: Globe, color: '#4285F4', keywords: ['dns', 'domain', 'zone'] },
  { id: 'gcp-armor', name: 'Cloud Armor', shortName: 'Armor', category: 'Networking', icon: Shield, color: '#4285F4', keywords: ['armor', 'waf', 'ddos', 'protection'] },
  { id: 'gcp-interconnect', name: 'Cloud Interconnect', shortName: 'Interconnect', category: 'Networking', icon: Network, color: '#4285F4', keywords: ['interconnect', 'dedicated', 'partner'] },
  { id: 'gcp-nat', name: 'Cloud NAT', shortName: 'NAT', category: 'Networking', icon: Network, color: '#4285F4', keywords: ['nat', 'gateway', 'egress'] },

  // Security
  { id: 'gcp-iam', name: 'IAM', shortName: 'IAM', category: 'Security', icon: Key, color: '#4285F4', keywords: ['iam', 'identity', 'access', 'role'] },
  { id: 'gcp-kms', name: 'Cloud KMS', shortName: 'KMS', category: 'Security', icon: Lock, color: '#4285F4', keywords: ['kms', 'key', 'encryption', 'hsm'] },
  { id: 'gcp-secrets', name: 'Secret Manager', shortName: 'Secret Manager', category: 'Security', icon: Lock, color: '#4285F4', keywords: ['secret', 'manager', 'credentials'] },
  { id: 'gcp-scc', name: 'Security Command Center', shortName: 'SCC', category: 'Security', icon: Shield, color: '#4285F4', keywords: ['scc', 'security', 'posture', 'findings'] },

  // Integration
  { id: 'gcp-pubsub', name: 'Pub/Sub', shortName: 'Pub/Sub', category: 'Integration', icon: MessageSquare, color: '#4285F4', keywords: ['pubsub', 'pub/sub', 'message', 'queue', 'topic'] },
  { id: 'gcp-apigee', name: 'Apigee', shortName: 'Apigee', category: 'Integration', icon: Globe, color: '#4285F4', keywords: ['apigee', 'api', 'gateway', 'management'] },
  { id: 'gcp-workflows', name: 'Workflows', shortName: 'Workflows', category: 'Integration', icon: Workflow, color: '#4285F4', keywords: ['workflows', 'orchestration', 'automation'] },
  { id: 'gcp-tasks', name: 'Cloud Tasks', shortName: 'Tasks', category: 'Integration', icon: Timer, color: '#4285F4', keywords: ['tasks', 'queue', 'async', 'schedule'] },
  { id: 'gcp-scheduler', name: 'Cloud Scheduler', shortName: 'Scheduler', category: 'Integration', icon: Timer, color: '#4285F4', keywords: ['scheduler', 'cron', 'job'] },

  // AI/ML
  { id: 'gcp-vertexai', name: 'Vertex AI', shortName: 'Vertex AI', category: 'AI/ML', icon: Binary, color: '#4285F4', keywords: ['vertex', 'ai', 'ml', 'platform', 'training'] },
  { id: 'gcp-aiplatform', name: 'AI Platform', shortName: 'AI Platform', category: 'AI/ML', icon: Binary, color: '#4285F4', keywords: ['ai platform', 'ml', 'training', 'prediction'] },
  { id: 'gcp-vision', name: 'Cloud Vision', shortName: 'Vision', category: 'AI/ML', icon: Eye, color: '#4285F4', keywords: ['vision', 'image', 'ocr', 'detection'] },
  { id: 'gcp-speech', name: 'Cloud Speech', shortName: 'Speech', category: 'AI/ML', icon: Radio, color: '#4285F4', keywords: ['speech', 'stt', 'tts', 'voice'] },
  { id: 'gcp-language', name: 'Cloud Natural Language', shortName: 'NLP', category: 'AI/ML', icon: FileText, color: '#4285F4', keywords: ['nlp', 'language', 'text', 'sentiment'] },
  { id: 'gcp-dialogflow', name: 'Dialogflow', shortName: 'Dialogflow', category: 'AI/ML', icon: MessageSquare, color: '#4285F4', keywords: ['dialogflow', 'chatbot', 'cx', 'conversation'] },

  // DevOps
  { id: 'gcp-cloudbuild', name: 'Cloud Build', shortName: 'Cloud Build', category: 'DevOps', icon: Cog, color: '#4285F4', keywords: ['cloud build', 'ci/cd', 'build', 'deploy'] },
  { id: 'gcp-monitoring', name: 'Cloud Monitoring', shortName: 'Monitoring', category: 'DevOps', icon: Gauge, color: '#4285F4', keywords: ['monitoring', 'metrics', 'stackdriver', 'alerts'] },
  { id: 'gcp-logging', name: 'Cloud Logging', shortName: 'Logging', category: 'DevOps', icon: FileText, color: '#4285F4', keywords: ['logging', 'logs', 'stackdriver'] },
  { id: 'gcp-trace', name: 'Cloud Trace', shortName: 'Trace', category: 'DevOps', icon: Activity, color: '#4285F4', keywords: ['trace', 'tracing', 'distributed', 'latency'] },
  { id: 'gcp-deploy', name: 'Cloud Deploy', shortName: 'Deploy', category: 'DevOps', icon: Send, color: '#4285F4', keywords: ['deploy', 'cd', 'continuous', 'delivery'] },
];

const huaweiServices: CloudService[] = [
  // Compute
  { id: 'huawei-ecs', name: 'Elastic Cloud Server', shortName: 'ECS', category: 'Compute', icon: Server, color: '#CF0A2C', keywords: ['ecs', 'server', 'vm', 'instance'] },
  { id: 'huawei-functiongraph', name: 'FunctionGraph', shortName: 'FunctionGraph', category: 'Compute', icon: Zap, color: '#CF0A2C', keywords: ['functiongraph', 'serverless', 'function'] },
  { id: 'huawei-cce', name: 'Cloud Container Engine', shortName: 'CCE', category: 'Compute', icon: Container, color: '#CF0A2C', keywords: ['cce', 'kubernetes', 'container', 'k8s'] },
  { id: 'huawei-cci', name: 'Cloud Container Instance', shortName: 'CCI', category: 'Compute', icon: Box, color: '#CF0A2C', keywords: ['cci', 'container', 'serverless'] },
  { id: 'huawei-bms', name: 'Bare Metal Server', shortName: 'BMS', category: 'Compute', icon: Server, color: '#CF0A2C', keywords: ['bms', 'bare metal', 'dedicated'] },

  // Storage
  { id: 'huawei-obs', name: 'Object Storage Service', shortName: 'OBS', category: 'Storage', icon: HardDrive, color: '#CF0A2C', keywords: ['obs', 'object', 'storage', 'bucket'] },
  { id: 'huawei-evs', name: 'Elastic Volume Service', shortName: 'EVS', category: 'Storage', icon: HardDrive, color: '#CF0A2C', keywords: ['evs', 'volume', 'block', 'disk'] },
  { id: 'huawei-sfs', name: 'Scalable File Service', shortName: 'SFS', category: 'Storage', icon: Folder, color: '#CF0A2C', keywords: ['sfs', 'file', 'nfs', 'share'] },
  { id: 'huawei-cbr', name: 'Cloud Backup and Recovery', shortName: 'CBR', category: 'Storage', icon: RefreshCw, color: '#CF0A2C', keywords: ['cbr', 'backup', 'recovery', 'disaster'] },

  // Database
  { id: 'huawei-rds', name: 'Relational Database Service', shortName: 'RDS', category: 'Database', icon: Database, color: '#CF0A2C', keywords: ['rds', 'mysql', 'postgres', 'sql'] },
  { id: 'huawei-gaussdb', name: 'GaussDB', shortName: 'GaussDB', category: 'Database', icon: Database, color: '#CF0A2C', keywords: ['gaussdb', 'database', 'distributed'] },
  { id: 'huawei-dds', name: 'Document Database Service', shortName: 'DDS', category: 'Database', icon: Database, color: '#CF0A2C', keywords: ['dds', 'mongodb', 'document', 'nosql'] },
  { id: 'huawei-dcs', name: 'Distributed Cache Service', shortName: 'DCS', category: 'Database', icon: Activity, color: '#CF0A2C', keywords: ['dcs', 'redis', 'memcached', 'cache'] },
  { id: 'huawei-dws', name: 'Data Warehouse Service', shortName: 'DWS', category: 'Database', icon: Database, color: '#CF0A2C', keywords: ['dws', 'warehouse', 'analytics'] },

  // Networking
  { id: 'huawei-vpc', name: 'Virtual Private Cloud', shortName: 'VPC', category: 'Networking', icon: Square, color: '#CF0A2C', isContainer: true, keywords: ['vpc', 'network', 'virtual'] },
  { id: 'huawei-subnet', name: 'Subnet', shortName: 'Subnet', category: 'Networking', icon: Square, color: '#CF0A2C', isContainer: true, keywords: ['subnet', 'network'] },
  { id: 'huawei-elb', name: 'Elastic Load Balance', shortName: 'ELB', category: 'Networking', icon: Layers, color: '#CF0A2C', keywords: ['elb', 'load balancer', 'traffic'] },
  { id: 'huawei-apig', name: 'API Gateway', shortName: 'APIG', category: 'Networking', icon: Globe, color: '#CF0A2C', keywords: ['apig', 'api', 'gateway'] },
  { id: 'huawei-cdn', name: 'Content Delivery Network', shortName: 'CDN', category: 'Networking', icon: Globe, color: '#CF0A2C', keywords: ['cdn', 'content', 'edge', 'cache'] },
  { id: 'huawei-dns', name: 'Domain Name Service', shortName: 'DNS', category: 'Networking', icon: Globe, color: '#CF0A2C', keywords: ['dns', 'domain', 'resolution'] },
  { id: 'huawei-nat', name: 'NAT Gateway', shortName: 'NAT', category: 'Networking', icon: Network, color: '#CF0A2C', keywords: ['nat', 'gateway', 'egress'] },
  { id: 'huawei-dc', name: 'Direct Connect', shortName: 'DC', category: 'Networking', icon: Network, color: '#CF0A2C', keywords: ['direct connect', 'dedicated', 'private'] },

  // Security
  { id: 'huawei-iam', name: 'Identity & Access Management', shortName: 'IAM', category: 'Security', icon: Key, color: '#CF0A2C', keywords: ['iam', 'identity', 'access', 'user'] },
  { id: 'huawei-kms', name: 'Key Management Service', shortName: 'KMS', category: 'Security', icon: Lock, color: '#CF0A2C', keywords: ['kms', 'key', 'encryption'] },
  { id: 'huawei-waf', name: 'Web Application Firewall', shortName: 'WAF', category: 'Security', icon: Shield, color: '#CF0A2C', keywords: ['waf', 'firewall', 'web', 'protection'] },
  { id: 'huawei-aad', name: 'Anti-DDoS', shortName: 'AAD', category: 'Security', icon: Shield, color: '#CF0A2C', keywords: ['aad', 'ddos', 'protection', 'attack'] },
  { id: 'huawei-sg', name: 'Security Group', shortName: 'Security Group', category: 'Security', icon: Shield, color: '#CF0A2C', keywords: ['security group', 'firewall', 'rules'] },

  // Integration
  { id: 'huawei-smn', name: 'Simple Message Notification', shortName: 'SMN', category: 'Integration', icon: Bell, color: '#CF0A2C', keywords: ['smn', 'notification', 'message', 'topic'] },
  { id: 'huawei-dms', name: 'Distributed Message Service', shortName: 'DMS', category: 'Integration', icon: MessageSquare, color: '#CF0A2C', keywords: ['dms', 'kafka', 'rabbitmq', 'queue'] },
  { id: 'huawei-fgs', name: 'Function Graph', shortName: 'FGS', category: 'Integration', icon: Workflow, color: '#CF0A2C', keywords: ['fgs', 'function', 'workflow'] },

  // AI/ML
  { id: 'huawei-modelarts', name: 'ModelArts', shortName: 'ModelArts', category: 'AI/ML', icon: Binary, color: '#CF0A2C', keywords: ['modelarts', 'ai', 'ml', 'training', 'model'] },
  { id: 'huawei-ocr', name: 'Optical Character Recognition', shortName: 'OCR', category: 'AI/ML', icon: Eye, color: '#CF0A2C', keywords: ['ocr', 'text', 'recognition', 'vision'] },
  { id: 'huawei-face', name: 'Face Recognition Service', shortName: 'FRS', category: 'AI/ML', icon: Eye, color: '#CF0A2C', keywords: ['frs', 'face', 'recognition', 'biometric'] },
  { id: 'huawei-nlp', name: 'Natural Language Processing', shortName: 'NLP', category: 'AI/ML', icon: FileText, color: '#CF0A2C', keywords: ['nlp', 'language', 'text', 'processing'] },

  // DevOps
  { id: 'huawei-devcloud', name: 'DevCloud', shortName: 'DevCloud', category: 'DevOps', icon: Workflow, color: '#CF0A2C', keywords: ['devcloud', 'ci/cd', 'devops', 'pipeline'] },
  { id: 'huawei-aom', name: 'Application Operations Management', shortName: 'AOM', category: 'DevOps', icon: Gauge, color: '#CF0A2C', keywords: ['aom', 'monitoring', 'operations', 'metrics'] },
  { id: 'huawei-lts', name: 'Log Tank Service', shortName: 'LTS', category: 'DevOps', icon: FileText, color: '#CF0A2C', keywords: ['lts', 'logs', 'logging', 'analysis'] },
  { id: 'huawei-cts', name: 'Cloud Trace Service', shortName: 'CTS', category: 'DevOps', icon: Activity, color: '#CF0A2C', keywords: ['cts', 'trace', 'audit', 'tracking'] },
];

const genericServices: CloudService[] = [
  // Common icons for multi-cloud or generic diagrams
  { id: 'generic-users', name: 'Users / Clients', shortName: 'Users', category: 'External', icon: Users, color: '#6b7280', keywords: ['users', 'clients', 'customers', 'people'] },
  { id: 'generic-internet', name: 'Internet / WWW', shortName: 'Internet', category: 'External', icon: Globe, color: '#6b7280', keywords: ['internet', 'www', 'web', 'external'] },
  { id: 'generic-mobile', name: 'Mobile App', shortName: 'Mobile', category: 'External', icon: Monitor, color: '#6b7280', keywords: ['mobile', 'app', 'ios', 'android', 'phone'] },
  { id: 'generic-iot', name: 'IoT Devices', shortName: 'IoT', category: 'External', icon: Wifi, color: '#6b7280', keywords: ['iot', 'device', 'sensor', 'edge'] },
  { id: 'generic-onprem', name: 'On-Premises', shortName: 'On-Prem', category: 'External', icon: Server, color: '#6b7280', keywords: ['on-premises', 'on-prem', 'datacenter', 'local'] },
  { id: 'generic-desktop', name: 'Desktop App', shortName: 'Desktop', category: 'External', icon: Monitor, color: '#6b7280', keywords: ['desktop', 'app', 'windows', 'mac'] },

  // Generic cloud concepts
  { id: 'generic-region', name: 'Region', shortName: 'Region', category: 'Infrastructure', icon: Square, color: '#6b7280', isContainer: true, keywords: ['region', 'zone', 'location'] },
  { id: 'generic-az', name: 'Availability Zone', shortName: 'AZ', category: 'Infrastructure', icon: Square, color: '#6b7280', isContainer: true, keywords: ['az', 'availability zone', 'zone'] },
  { id: 'generic-server', name: 'Server', shortName: 'Server', category: 'Compute', icon: Server, color: '#6b7280', keywords: ['server', 'vm', 'instance'] },
  { id: 'generic-container', name: 'Container', shortName: 'Container', category: 'Compute', icon: Box, color: '#6b7280', keywords: ['container', 'docker', 'pod'] },
  { id: 'generic-function', name: 'Function', shortName: 'Function', category: 'Compute', icon: Zap, color: '#6b7280', keywords: ['function', 'serverless', 'lambda'] },
  { id: 'generic-database', name: 'Database', shortName: 'Database', category: 'Database', icon: Database, color: '#6b7280', keywords: ['database', 'db', 'sql', 'nosql'] },
  { id: 'generic-storage', name: 'Storage', shortName: 'Storage', category: 'Storage', icon: HardDrive, color: '#6b7280', keywords: ['storage', 'bucket', 'object', 'file'] },
  { id: 'generic-cache', name: 'Cache', shortName: 'Cache', category: 'Database', icon: Activity, color: '#6b7280', keywords: ['cache', 'redis', 'memory'] },
  { id: 'generic-queue', name: 'Message Queue', shortName: 'Queue', category: 'Integration', icon: MessageSquare, color: '#6b7280', keywords: ['queue', 'message', 'async'] },
  { id: 'generic-lb', name: 'Load Balancer', shortName: 'LB', category: 'Networking', icon: Layers, color: '#6b7280', keywords: ['load balancer', 'lb', 'traffic'] },
  { id: 'generic-api', name: 'API Gateway', shortName: 'API GW', category: 'Networking', icon: Globe, color: '#6b7280', keywords: ['api', 'gateway', 'rest'] },
  { id: 'generic-cdn', name: 'CDN', shortName: 'CDN', category: 'Networking', icon: Globe, color: '#6b7280', keywords: ['cdn', 'edge', 'cache'] },
  { id: 'generic-firewall', name: 'Firewall', shortName: 'Firewall', category: 'Security', icon: Shield, color: '#6b7280', keywords: ['firewall', 'waf', 'security'] },
  { id: 'generic-identity', name: 'Identity Provider', shortName: 'IdP', category: 'Security', icon: Key, color: '#6b7280', keywords: ['identity', 'idp', 'sso', 'auth'] },
  { id: 'generic-ml', name: 'ML / AI Service', shortName: 'ML/AI', category: 'AI/ML', icon: Binary, color: '#6b7280', keywords: ['ml', 'ai', 'machine learning', 'model'] },
  { id: 'generic-monitoring', name: 'Monitoring', shortName: 'Monitoring', category: 'DevOps', icon: Gauge, color: '#6b7280', keywords: ['monitoring', 'metrics', 'alerts'] },
  { id: 'generic-cicd', name: 'CI/CD Pipeline', shortName: 'CI/CD', category: 'DevOps', icon: Workflow, color: '#6b7280', keywords: ['cicd', 'ci/cd', 'pipeline', 'deploy'] },
];

// Service catalog by provider
const servicesByProvider: Record<CloudProvider, CloudService[]> = {
  aws: awsServices,
  azure: azureServices,
  gcp: gcpServices,
  huawei: huaweiServices,
  generic: genericServices,
};

// Get all categories for a provider
const getCategoriesForProvider = (provider: CloudProvider): string[] => {
  const services = servicesByProvider[provider];
  return Array.from(new Set(services.map(s => s.category)));
};

interface DiagramNode {
  id: string;
  type: string;
  serviceId: string;
  x: number;
  y: number;
  label: string;
  color?: string;
  width?: number;
  height?: number;
  isContainer?: boolean;
  provider?: CloudProvider;
}

interface DiagramConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  style?: 'solid' | 'dashed';
}

interface ArchitectureDiagramProps {
  title?: string;
  initialNodes?: DiagramNode[];
  initialConnections?: DiagramConnection[];
  readOnly?: boolean;
  className?: string;
}

export function ArchitectureDiagram({
  title = "Architecture Diagram",
  initialNodes = [],
  initialConnections = [],
  readOnly = false,
  className = "",
}: ArchitectureDiagramProps) {
  const [nodes, setNodes] = useState<DiagramNode[]>(initialNodes);
  const [connections, setConnections] = useState<DiagramConnection[]>(initialConnections);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState<string | null>(null);
  const [zoom] = useState(1);
  const [pan] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // New state for enhanced features
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider>('aws');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Compute');
  const [isExpanded, setIsExpanded] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get filtered services based on search and category
  const getFilteredServices = () => {
    const services = servicesByProvider[selectedProvider];
    let filtered = services;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = services.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.shortName.toLowerCase().includes(query) ||
        s.keywords.some(k => k.includes(query))
      );
    } else if (activeCategory) {
      filtered = services.filter(s => s.category === activeCategory);
    }

    return filtered;
  };

  // Add a new node
  const addNode = (service: CloudService) => {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type: service.id,
      serviceId: service.id,
      x: 150 + Math.random() * 150,
      y: 100 + Math.random() * 100,
      label: service.shortName,
      color: service.color,
      width: service.isContainer ? 200 : 80,
      height: service.isContainer ? 150 : 80,
      isContainer: service.isContainer,
      provider: selectedProvider,
    };
    setNodes([...nodes, newNode]);
  };

  // Get icon for a node - prioritize custom cloud icons
  const getNodeIcon = (node: DiagramNode) => {
    // First try to get a custom cloud icon
    const customIcon = getCloudIcon(node.serviceId);
    if (customIcon) {
      return customIcon;
    }

    // Fall back to Lucide icons from service definition
    const provider = node.provider || 'generic';
    const services = servicesByProvider[provider];
    const service = services.find(s => s.id === node.serviceId);
    return service?.icon || Box;
  };

  // Check if node has custom icon
  const hasCustomIcon = (node: DiagramNode) => {
    return getCloudIcon(node.serviceId) !== null;
  };

  // Delete selected node
  const deleteSelected = () => {
    if (selectedNode) {
      setNodes(nodes.filter(n => n.id !== selectedNode));
      setConnections(connections.filter(c => c.from !== selectedNode && c.to !== selectedNode));
      setSelectedNode(null);
    }
  };

  // Start connection from port
  const handlePortDragStart = (e: MouseEvent, nodeId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setConnectingFrom(nodeId);
  };

  // Complete connection
  const completeConnection = (targetNodeId: string) => {
    if (connectingFrom && connectingFrom !== targetNodeId) {
      const exists = connections.some(
        c => (c.from === connectingFrom && c.to === targetNodeId) ||
             (c.from === targetNodeId && c.to === connectingFrom)
      );
      if (!exists) {
        const newConnection: DiagramConnection = {
          id: `conn-${Date.now()}`,
          from: connectingFrom,
          to: targetNodeId,
          style: 'solid',
        };
        setConnections([...connections, newConnection]);
      }
    }
    setConnectingFrom(null);
  };

  // Get node center position
  const getNodeCenter = (node: DiagramNode) => {
    const width = node.width || 80;
    const height = node.height || 80;
    return {
      x: node.x * zoom + pan.x + width / 2,
      y: node.y * zoom + pan.y + height / 2,
    };
  };

  // Calculate bezier curve path
  const getBezierPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const curvature = Math.min(distance * 0.3, 80);
    const cx1 = from.x + curvature;
    const cy1 = from.y;
    const cx2 = to.x - curvature;
    const cy2 = to.y;
    return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;
  };

  // Handle node mouse down
  const handleNodeMouseDown = (e: MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
    setDragging(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - node.x * zoom - pan.x,
        y: e.clientY - rect.top - node.y * zoom - pan.y,
      });
    }
  };

  const handleNodeMouseEnter = (nodeId: string) => {
    setHoveredNode(nodeId);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
  };

  const handleNodeMouseUp = (e: MouseEvent, nodeId: string) => {
    if (connectingFrom && connectingFrom !== nodeId) {
      e.stopPropagation();
      completeConnection(nodeId);
    }
  };

  const handleResizeMouseDown = (e: MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setResizing(nodeId);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    if (dragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - dragOffset.x - pan.x) / zoom;
      const y = (e.clientY - rect.top - dragOffset.y - pan.y) / zoom;
      setNodes(nodes.map(n =>
        n.id === dragging ? { ...n, x: Math.max(0, x), y: Math.max(0, y) } : n
      ));
    }

    if (resizing && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const node = nodes.find(n => n.id === resizing);
      if (node) {
        const newWidth = Math.max(100, (e.clientX - rect.left - pan.x) / zoom - node.x);
        const newHeight = Math.max(80, (e.clientY - rect.top - pan.y) / zoom - node.y);
        setNodes(nodes.map(n =>
          n.id === resizing ? { ...n, width: newWidth, height: newHeight } : n
        ));
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
    if (connectingFrom && !hoveredNode) {
      setConnectingFrom(null);
    }
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
    setConnectingFrom(null);
  };

  const deleteConnection = (connId: string) => {
    setConnections(connections.filter(c => c.id !== connId));
  };

  const updateNodeLabel = (nodeId: string, label: string) => {
    setNodes(nodes.map(n => n.id === nodeId ? { ...n, label } : n));
  };

  const clearDiagram = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
  };

  const exportAsSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateSVG = () => {
    const width = 1000;
    const height = 700;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    svg += `<defs><marker id="export-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>`;
    svg += `<rect width="100%" height="100%" fill="#1e293b"/>`;

    nodes.filter(n => n.isContainer).forEach(node => {
      svg += `<rect x="${node.x}" y="${node.y}" width="${node.width || 200}" height="${node.height || 150}" rx="8" fill="${node.color}10" stroke="${node.color}" stroke-width="2" stroke-dasharray="5,5"/>`;
      svg += `<text x="${node.x + 10}" y="${node.y + 20}" fill="${node.color}" font-size="12" font-weight="bold">${node.label}</text>`;
    });

    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (fromNode && toNode) {
        const x1 = fromNode.x + (fromNode.width || 80) / 2;
        const y1 = fromNode.y + (fromNode.height || 80) / 2;
        const x2 = toNode.x + (toNode.width || 80) / 2;
        const y2 = toNode.y + (toNode.height || 80) / 2;
        const dx = x2 - x1;
        const distance = Math.sqrt(dx * dx + (y2 - y1) * (y2 - y1));
        const curvature = Math.min(distance * 0.3, 80);
        svg += `<path d="M ${x1} ${y1} C ${x1 + curvature} ${y1}, ${x2 - curvature} ${y2}, ${x2} ${y2}" stroke="#94a3b8" stroke-width="2" fill="none" ${conn.style === 'dashed' ? 'stroke-dasharray="8,4"' : ''} marker-end="url(#export-arrowhead)"/>`;
      }
    });

    nodes.filter(n => !n.isContainer).forEach(node => {
      svg += `<rect x="${node.x}" y="${node.y}" width="80" height="80" rx="8" fill="${node.color}20" stroke="${node.color}" stroke-width="2"/>`;
      svg += `<text x="${node.x + 40}" y="${node.y + 95}" text-anchor="middle" fill="#e2e8f0" font-size="11">${node.label}</text>`;
    });

    svg += '</svg>';
    return svg;
  };

  // Handle provider change
  const handleProviderChange = (provider: CloudProvider) => {
    setSelectedProvider(provider);
    setSearchQuery('');
    const categories = getCategoriesForProvider(provider);
    setActiveCategory(categories[0] || 'Compute');
  };

  const categories = getCategoriesForProvider(selectedProvider);
  const filteredServices = getFilteredServices();
  const providerInfo = cloudProviders[selectedProvider];

  // Fullscreen effect
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const containerClass = isExpanded
    ? 'fixed inset-0 z-50 bg-slate-900'
    : `bg-slate-800 rounded-lg border border-slate-600 overflow-hidden ${className}`;

  return (
    <div ref={containerRef} className={containerClass}>
      {/* Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-700 border-b border-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <CloudCog className="w-5 h-5 text-white" />
          <span className="font-medium text-white">{title}</span>

          {/* Cloud Provider Selector */}
          <div className="flex items-center gap-1 ml-4 border-l border-slate-500 pl-4">
            {(Object.keys(cloudProviders) as CloudProvider[]).map(provider => (
              <button
                key={provider}
                onClick={() => handleProviderChange(provider)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  selectedProvider === provider
                    ? 'text-white shadow-lg'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
                style={selectedProvider === provider ? { backgroundColor: cloudProviders[provider].color } : {}}
                title={cloudProviders[provider].name}
              >
                {cloudProviders[provider].shortName}
              </button>
            ))}
          </div>
        </div>

        {!readOnly && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 px-3 bg-slate-600 text-white border-slate-500 hover:bg-slate-500"
                title={isExpanded ? "Exit fullscreen" : "Fullscreen"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={clearDiagram} className="h-8 px-3 bg-red-900/50 text-red-300 border-red-700 hover:bg-red-800" title="Clear">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={exportAsSVG} className="h-8 px-3 bg-green-900/50 text-green-300 border-green-700 hover:bg-green-800" title="Export SVG">
                <Download className="w-4 h-4" />
              </Button>
              {selectedNode && (
                <Button size="sm" variant="outline" onClick={deleteSelected} className="h-8 px-3 bg-red-900/50 text-red-300 border-red-700 hover:bg-red-800" title="Delete Selected">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Component Palette */}
      {!readOnly && (
        <div className="bg-slate-700/50 border-b border-slate-600">
          {/* Search Bar */}
          <div className="px-4 py-2 border-b border-slate-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${providerInfo.shortName} services... (e.g., EC2, Lambda, S3)`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#1E9AD6] focus:ring-1 focus:ring-[#1E9AD6]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs (hidden when searching) */}
          {!searchQuery && (
            <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto border-b border-slate-600">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                  style={activeCategory === cat ? { backgroundColor: providerInfo.color } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Service Grid */}
          <div className="px-4 py-3 overflow-x-auto">
            <div className="flex items-start gap-2 flex-wrap" style={{ maxHeight: isExpanded ? '200px' : '100px', overflowY: 'auto' }}>
              {filteredServices.length > 0 ? (
                filteredServices.map(service => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => addNode(service)}
                      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors min-w-[90px] max-w-[90px]"
                      title={`${service.name}\n${service.keywords.join(', ')}`}
                    >
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}30` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: service.color }} />
                      </div>
                      <span className="text-[10px] text-slate-300 text-center leading-tight truncate w-full">{service.shortName}</span>
                    </button>
                  );
                })
              ) : (
                <div className="text-sm text-slate-400 py-4 w-full text-center">
                  No services found for "{searchQuery}"
                </div>
              )}
            </div>
            {searchQuery && filteredServices.length > 0 && (
              <div className="mt-2 text-xs text-slate-400">
                Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`relative overflow-hidden cursor-crosshair bg-slate-900 ${isExpanded ? 'flex-1' : 'h-[450px]'}`}
        style={{
          backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          height: isExpanded ? 'calc(100vh - 200px)' : '450px',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker id="arrowhead-preview" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={THEME_PRIMARY} />
            </marker>
            <marker id="arrowhead-hover" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Connections */}
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const from = getNodeCenter(fromNode);
            const to = getNodeCenter(toNode);
            const path = getBezierPath(from, to);

            return (
              <g key={conn.id}>
                <path d={path} stroke="transparent" strokeWidth="20" fill="none" style={{ pointerEvents: 'stroke', cursor: 'pointer' }} onClick={() => deleteConnection(conn.id)} />
                <path d={path} stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray={conn.style === 'dashed' ? '8,4' : 'none'} markerEnd="url(#arrowhead)" className="transition-all duration-150" />
              </g>
            );
          })}

          {/* Preview line */}
          {connectingFrom && (() => {
            const fromNode = nodes.find(n => n.id === connectingFrom);
            if (!fromNode) return null;
            const from = getNodeCenter(fromNode);
            const to = hoveredNode && hoveredNode !== connectingFrom ? getNodeCenter(nodes.find(n => n.id === hoveredNode)!) : mousePos;
            const isValidTarget = hoveredNode && hoveredNode !== connectingFrom;
            const path = getBezierPath(from, to);

            return (
              <g>
                <path d={path} stroke={isValidTarget ? '#22c55e' : THEME_PRIMARY} strokeWidth="3" fill="none" opacity="0.5" filter="url(#glow)" />
                <path d={path} stroke={isValidTarget ? '#22c55e' : THEME_PRIMARY} strokeWidth="2" fill="none" strokeDasharray="8,4" markerEnd={isValidTarget ? 'url(#arrowhead-hover)' : 'url(#arrowhead-preview)'} />
                <circle r="4" fill={isValidTarget ? '#22c55e' : THEME_PRIMARY}>
                  <animateMotion dur="1s" repeatCount="indefinite" path={path} />
                </circle>
              </g>
            );
          })()}
        </svg>

        {/* Container Nodes */}
        {nodes.filter(n => n.isContainer).map(node => {
          const isSelected = selectedNode === node.id;
          const isConnecting = connectingFrom === node.id;
          const isDropTarget = connectingFrom && hoveredNode === node.id && connectingFrom !== node.id;

          return (
            <div
              key={node.id}
              className={`absolute cursor-move transition-shadow group ${isSelected ? 'z-10' : 'z-0'}`}
              style={{ left: node.x * zoom + pan.x, top: node.y * zoom + pan.y, width: (node.width || 200) * zoom, height: (node.height || 150) * zoom }}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onMouseEnter={() => handleNodeMouseEnter(node.id)}
              onMouseLeave={handleNodeMouseLeave}
              onMouseUp={(e) => handleNodeMouseUp(e, node.id)}
            >
              <div
                className={`relative w-full h-full rounded-xl transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''} ${isDropTarget ? 'ring-2 ring-green-500' : ''}`}
                style={{ backgroundColor: `${node.color}10`, borderWidth: 2, borderStyle: 'dashed', borderColor: isDropTarget ? '#22c55e' : (isSelected ? THEME_PRIMARY : node.color), boxShadow: isDropTarget ? '0 0 20px rgba(34, 197, 94, 0.3)' : 'none' }}
              >
                <div className="absolute top-2 left-3 flex items-center gap-2">
                  {!readOnly && isSelected ? (
                    <input type="text" value={node.label} onChange={(e) => updateNodeLabel(node.id, e.target.value)} onClick={(e) => e.stopPropagation()} className="px-2 py-0.5 text-xs bg-slate-800 border border-slate-600 rounded text-white font-medium" />
                  ) : (
                    <span className="text-xs font-semibold" style={{ color: node.color }}>{node.label}</span>
                  )}
                </div>
                {!readOnly && (
                  <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 cursor-crosshair transition-all ${isConnecting || connectingFrom ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100'}`} style={{ backgroundColor: isConnecting ? THEME_PRIMARY : '#475569', borderColor: isConnecting ? THEME_PRIMARY : '#64748b' }} onMouseDown={(e) => handlePortDragStart(e, node.id)} title="Drag to connect" />
                )}
                {!readOnly && isSelected && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" style={{ backgroundColor: THEME_PRIMARY }} onMouseDown={(e) => handleResizeMouseDown(e, node.id)} />
                )}
              </div>
            </div>
          );
        })}

        {/* Regular Nodes */}
        {nodes.filter(n => !n.isContainer).map(node => {
          const Icon = getNodeIcon(node);
          const isSelected = selectedNode === node.id;
          const isConnecting = connectingFrom === node.id;
          const isDropTarget = connectingFrom && hoveredNode === node.id && connectingFrom !== node.id;
          const isCustomIcon = hasCustomIcon(node);

          return (
            <div
              key={node.id}
              className={`absolute flex flex-col items-center cursor-move transition-shadow group ${isSelected ? 'z-20' : 'z-10'}`}
              style={{ left: node.x * zoom + pan.x, top: node.y * zoom + pan.y, transform: `scale(${zoom})`, transformOrigin: 'top left' }}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onMouseEnter={() => handleNodeMouseEnter(node.id)}
              onMouseLeave={handleNodeMouseLeave}
              onMouseUp={(e) => handleNodeMouseUp(e, node.id)}
            >
              <div
                className={`relative w-20 h-20 rounded-xl flex items-center justify-center transition-all overflow-hidden ${isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''} ${isConnecting ? 'ring-2 ring-[#1E9AD6]' : ''} ${isDropTarget ? 'ring-2 ring-green-500 scale-110' : ''}`}
                style={{
                  backgroundColor: isCustomIcon ? 'transparent' : `${node.color}20`,
                  borderWidth: isCustomIcon ? 0 : 2,
                  borderColor: isDropTarget ? '#22c55e' : (isSelected ? THEME_PRIMARY : node.color),
                  boxShadow: isDropTarget ? '0 0 20px rgba(34, 197, 94, 0.5)' : (isSelected ? `0 0 20px ${THEME_PRIMARY}40` : 'none')
                }}
              >
                {isCustomIcon ? (
                  <Icon size={80} />
                ) : (
                  <Icon className="w-8 h-8" style={{ color: node.color }} />
                )}

                {/* Connection ports */}
                {!readOnly && (
                  <>
                    {['right', 'bottom', 'left', 'top'].map(pos => (
                      <div
                        key={pos}
                        className={`absolute w-4 h-4 rounded-full border-2 cursor-crosshair transition-all ${isConnecting || connectingFrom ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100'} ${
                          pos === 'right' ? '-right-2 top-1/2 -translate-y-1/2' :
                          pos === 'bottom' ? 'left-1/2 -bottom-2 -translate-x-1/2' :
                          pos === 'left' ? '-left-2 top-1/2 -translate-y-1/2' :
                          'left-1/2 -top-2 -translate-x-1/2'
                        }`}
                        style={{ backgroundColor: isConnecting ? THEME_PRIMARY : '#475569', borderColor: isConnecting ? THEME_PRIMARY : '#64748b' }}
                        onMouseDown={(e) => handlePortDragStart(e, node.id)}
                        title="Drag to connect"
                      />
                    ))}
                  </>
                )}
              </div>
              {!readOnly && isSelected ? (
                <input type="text" value={node.label} onChange={(e) => updateNodeLabel(node.id, e.target.value)} onClick={(e) => e.stopPropagation()} className="mt-1 px-2 py-0.5 text-xs text-center bg-slate-800 border border-slate-600 rounded text-white w-24" />
              ) : (
                <span className="mt-1 text-xs text-slate-300 text-center max-w-24 truncate font-medium">{node.label}</span>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {nodes.length === 0 && !readOnly && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
            <div className="text-center text-slate-400">
              <CloudCog className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-base font-medium">Select a cloud provider and search for services</p>
              <p className="text-sm mt-2 opacity-75">Click on services to add them to your diagram</p>
              <p className="text-xs mt-3 opacity-60">Drag from connection ports to link components</p>
            </div>
          </div>
        )}

        {/* Connection indicator */}
        {connectingFrom && (
          <div className="absolute bottom-4 left-4 px-4 py-2 bg-slate-800/90 rounded-lg border border-[#1E9AD6] text-sm text-white font-medium flex items-center gap-2 shadow-lg" style={{ zIndex: 30 }}>
            <div className="w-2 h-2 rounded-full bg-[#1E9AD6] animate-pulse" />
            Drag to target node or click to cancel
          </div>
        )}

        {/* Help tooltip */}
        {!readOnly && nodes.length > 0 && !connectingFrom && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-slate-800/80 rounded-lg text-xs text-slate-400" style={{ zIndex: 30 }}>
            Hover nodes for ports • Click connections to delete • {isExpanded ? 'ESC to exit fullscreen' : 'Click expand for fullscreen'}
          </div>
        )}
      </div>
    </div>
  );
}
