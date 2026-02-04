// Official-style Cloud Provider SVG Icons
// These icons are designed to match the visual style of each cloud provider's official architecture icons

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// =====================================================
// AWS ICONS - Orange (#FF9900) with official AWS style
// =====================================================

export const AWSEc2Icon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#FF9900"/>
    <rect x="16" y="16" width="32" height="32" rx="2" fill="white"/>
    <rect x="22" y="22" width="8" height="8" fill="#FF9900"/>
    <rect x="34" y="22" width="8" height="8" fill="#FF9900"/>
    <rect x="22" y="34" width="8" height="8" fill="#FF9900"/>
    <rect x="34" y="34" width="8" height="8" fill="#FF9900"/>
  </svg>
);

export const AWSLambdaIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#FF9900"/>
    <path d="M20 48L32 16L44 48H38L32 32L26 48H20Z" fill="white"/>
  </svg>
);

export const AWSS3Icon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#3F8624"/>
    <path d="M32 16L48 24V40L32 48L16 40V24L32 16Z" fill="white"/>
    <path d="M32 16L48 24L32 32L16 24L32 16Z" fill="#3F8624" fillOpacity="0.3"/>
    <path d="M32 32V48L16 40V24L32 32Z" fill="#3F8624" fillOpacity="0.5"/>
  </svg>
);

export const AWSRDSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#3B48CC"/>
    <ellipse cx="32" cy="20" rx="14" ry="6" fill="white"/>
    <path d="M18 20V44C18 47.31 24.27 50 32 50C39.73 50 46 47.31 46 44V20" stroke="white" strokeWidth="2" fill="none"/>
    <ellipse cx="32" cy="32" rx="14" ry="6" fill="none" stroke="white" strokeWidth="2"/>
    <ellipse cx="32" cy="44" rx="14" ry="6" fill="none" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AWSDynamoDBIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#3B48CC"/>
    <path d="M32 14L50 24V40L32 50L14 40V24L32 14Z" fill="white"/>
    <path d="M32 14L50 24L32 34L14 24L32 14Z" fill="#3B48CC" fillOpacity="0.4"/>
    <circle cx="32" cy="32" r="6" fill="#3B48CC"/>
  </svg>
);

export const AWSVPCIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#8C4FFF"/>
    <rect x="14" y="14" width="36" height="36" rx="2" stroke="white" strokeWidth="3" strokeDasharray="6 3" fill="none"/>
    <rect x="22" y="22" width="20" height="20" rx="2" fill="white" fillOpacity="0.3"/>
  </svg>
);

export const AWSAPIGatewayIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#E7157B"/>
    <path d="M16 32H28M36 32H48M32 16V28M32 36V48" stroke="white" strokeWidth="3"/>
    <circle cx="32" cy="32" r="8" fill="white"/>
    <circle cx="32" cy="32" r="4" fill="#E7157B"/>
  </svg>
);

export const AWSCloudFrontIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#8C4FFF"/>
    <circle cx="32" cy="32" r="16" fill="white"/>
    <circle cx="32" cy="32" r="10" fill="#8C4FFF" fillOpacity="0.3"/>
    <circle cx="32" cy="32" r="4" fill="#8C4FFF"/>
    <path d="M32 16V20M32 44V48M16 32H20M44 32H48M21 21L24 24M40 40L43 43M43 21L40 24M24 40L21 43" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AWSELBIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#8C4FFF"/>
    <circle cx="32" cy="20" r="6" fill="white"/>
    <circle cx="20" cy="44" r="6" fill="white"/>
    <circle cx="44" cy="44" r="6" fill="white"/>
    <path d="M32 26V32M32 32L20 38M32 32L44 38" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AWSIAMIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#DD344C"/>
    <circle cx="32" cy="24" r="8" fill="white"/>
    <path d="M18 50C18 42.27 24.27 36 32 36C39.73 36 46 42.27 46 50" fill="white"/>
    <rect x="28" y="32" width="8" height="6" fill="#DD344C"/>
  </svg>
);

export const AWSSQSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#E7157B"/>
    <rect x="16" y="20" width="32" height="24" rx="2" fill="white"/>
    <rect x="20" y="26" width="24" height="4" fill="#E7157B"/>
    <rect x="20" y="34" width="16" height="4" fill="#E7157B"/>
  </svg>
);

export const AWSSNSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#E7157B"/>
    <path d="M32 16V24M32 40V48M20 32H16M48 32H44" stroke="white" strokeWidth="3"/>
    <circle cx="32" cy="32" r="10" fill="white"/>
    <path d="M26 32L30 36L38 28" stroke="#E7157B" strokeWidth="2"/>
  </svg>
);

export const AWSECSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#FF9900"/>
    <rect x="16" y="16" width="14" height="14" rx="2" fill="white"/>
    <rect x="34" y="16" width="14" height="14" rx="2" fill="white"/>
    <rect x="16" y="34" width="14" height="14" rx="2" fill="white"/>
    <rect x="34" y="34" width="14" height="14" rx="2" fill="white"/>
    <path d="M23 20V26M19 23H27" stroke="#FF9900" strokeWidth="2"/>
    <path d="M41 20V26M37 23H45" stroke="#FF9900" strokeWidth="2"/>
    <path d="M23 38V44M19 41H27" stroke="#FF9900" strokeWidth="2"/>
    <path d="M41 38V44M37 41H45" stroke="#FF9900" strokeWidth="2"/>
  </svg>
);

export const AWSEKSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#FF9900"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <path d="M32 18L44 26V38L32 46L20 38V26L32 18Z" fill="#326CE5"/>
    <circle cx="32" cy="32" r="4" fill="white"/>
  </svg>
);

export const AWSCloudWatchIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#E7157B"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <path d="M32 22V32L40 36" stroke="#E7157B" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const AWSRoute53Icon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#8C4FFF"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <text x="32" y="38" textAnchor="middle" fill="#8C4FFF" fontSize="16" fontWeight="bold">53</text>
  </svg>
);

export const AWSCognitoIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#DD344C"/>
    <circle cx="32" cy="26" r="8" fill="white"/>
    <circle cx="20" cy="38" r="6" fill="white"/>
    <circle cx="44" cy="38" r="6" fill="white"/>
    <path d="M24 32L32 34L40 32" stroke="white" strokeWidth="2"/>
  </svg>
);

// =====================================================
// AZURE ICONS - Blue (#0078D4) with flat design
// =====================================================

export const AzureVMIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="16" y="16" width="32" height="24" rx="2" fill="white"/>
    <rect x="24" y="40" width="16" height="4" fill="white"/>
    <rect x="20" y="44" width="24" height="4" rx="1" fill="white"/>
  </svg>
);

export const AzureFunctionsIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <path d="M24 48L32 16H40L32 32H44L24 48Z" fill="#FCD116"/>
  </svg>
);

export const AzureBlobIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="16" y="20" width="32" height="28" rx="2" fill="white"/>
    <rect x="20" y="24" width="10" height="10" rx="1" fill="#0078D4"/>
    <rect x="34" y="24" width="10" height="10" rx="1" fill="#0078D4"/>
    <rect x="20" y="38" width="10" height="6" rx="1" fill="#0078D4"/>
  </svg>
);

export const AzureSQLIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <ellipse cx="32" cy="20" rx="14" ry="6" fill="white"/>
    <path d="M18 20V44C18 47.31 24.27 50 32 50C39.73 50 46 47.31 46 44V20" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M18 32C18 35.31 24.27 38 32 38C39.73 38 46 35.31 46 32" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AzureCosmosDBIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <ellipse cx="32" cy="32" rx="14" ry="6" stroke="#0078D4" strokeWidth="2" fill="none"/>
    <ellipse cx="32" cy="32" rx="6" ry="14" stroke="#0078D4" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="32" r="4" fill="#0078D4"/>
  </svg>
);

export const AzureVNetIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="14" y="14" width="36" height="36" rx="2" stroke="white" strokeWidth="3" strokeDasharray="6 3" fill="none"/>
    <circle cx="24" cy="24" r="4" fill="white"/>
    <circle cx="40" cy="24" r="4" fill="white"/>
    <circle cx="24" cy="40" r="4" fill="white"/>
    <circle cx="40" cy="40" r="4" fill="white"/>
    <path d="M28 24H36M28 40H36M24 28V36M40 28V36" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AzureLBIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="26" y="14" width="12" height="10" rx="2" fill="white"/>
    <rect x="14" y="40" width="10" height="10" rx="2" fill="white"/>
    <rect x="27" y="40" width="10" height="10" rx="2" fill="white"/>
    <rect x="40" y="40" width="10" height="10" rx="2" fill="white"/>
    <path d="M32 24V32M32 32L19 40M32 32L32 40M32 32L45 40" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AzureADIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <circle cx="32" cy="24" r="8" fill="white"/>
    <path d="M16 50C16 41.16 23.16 34 32 34C40.84 34 48 41.16 48 50" fill="white"/>
  </svg>
);

export const AzureKeyVaultIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="20" y="28" width="24" height="20" rx="2" fill="white"/>
    <circle cx="32" cy="24" r="8" stroke="white" strokeWidth="3" fill="none"/>
    <circle cx="32" cy="38" r="3" fill="#0078D4"/>
    <rect x="30" y="38" width="4" height="6" fill="#0078D4"/>
  </svg>
);

export const AzureServiceBusIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="14" y="26" width="12" height="12" rx="2" fill="white"/>
    <rect x="38" y="20" width="12" height="8" rx="1" fill="white"/>
    <rect x="38" y="32" width="12" height="8" rx="1" fill="white"/>
    <rect x="38" y="44" width="12" height="8" rx="1" fill="white"/>
    <path d="M26 32H38M26 32L38 24M26 32L38 36M26 32L38 48" stroke="white" strokeWidth="2"/>
  </svg>
);

export const AzureAKSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <path d="M32 18L44 26V38L32 46L20 38V26L32 18Z" fill="#326CE5"/>
    <circle cx="32" cy="32" r="4" fill="white"/>
  </svg>
);

export const AzureAppServiceIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#0078D4"/>
    <rect x="16" y="16" width="32" height="32" rx="4" fill="white"/>
    <rect x="20" y="20" width="10" height="10" fill="#0078D4"/>
    <rect x="34" y="20" width="10" height="10" fill="#50E6FF"/>
    <rect x="20" y="34" width="10" height="10" fill="#50E6FF"/>
    <rect x="34" y="34" width="10" height="10" fill="#0078D4"/>
  </svg>
);

// =====================================================
// GCP ICONS - Multi-color with hexagonal style
// =====================================================

export const GCPComputeEngineIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <rect x="16" y="16" width="32" height="32" rx="2" fill="white"/>
    <rect x="20" y="20" width="24" height="6" fill="#4285F4"/>
    <rect x="20" y="29" width="24" height="6" fill="#EA4335"/>
    <rect x="20" y="38" width="24" height="6" fill="#FBBC04"/>
  </svg>
);

export const GCPCloudFunctionsIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <path d="M20 48L32 16H40L30 36H44L20 48Z" fill="white"/>
  </svg>
);

export const GCPCloudStorageIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <path d="M32 14L50 24V40L32 50L14 40V24L32 14Z" fill="white"/>
    <path d="M32 14L50 24L32 34L14 24L32 14Z" fill="#AECBFA"/>
    <path d="M32 34V50L14 40V24L32 34Z" fill="#669DF6"/>
  </svg>
);

export const GCPCloudSQLIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <ellipse cx="32" cy="20" rx="14" ry="6" fill="white"/>
    <path d="M18 20V44C18 47.31 24.27 50 32 50C39.73 50 46 47.31 46 44V20" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M18 32C18 35.31 24.27 38 32 38C39.73 38 46 35.31 46 32" stroke="white" strokeWidth="2"/>
  </svg>
);

export const GCPBigQueryIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <path d="M20 20H44V44H20V20Z" fill="white"/>
    <path d="M20 20H32V32H20V20Z" fill="#AECBFA"/>
    <path d="M32 32H44V44H32V32Z" fill="#AECBFA"/>
    <circle cx="38" cy="38" r="8" stroke="#4285F4" strokeWidth="3" fill="white"/>
    <path d="M44 44L50 50" stroke="#4285F4" strokeWidth="3"/>
  </svg>
);

export const GCPVPCIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <rect x="14" y="14" width="36" height="36" rx="2" stroke="white" strokeWidth="3" strokeDasharray="6 3" fill="none"/>
    <circle cx="32" cy="32" r="8" fill="white"/>
    <circle cx="32" cy="32" r="4" fill="#4285F4"/>
  </svg>
);

export const GCPLoadBalancerIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <circle cx="32" cy="18" r="6" fill="white"/>
    <circle cx="18" cy="46" r="6" fill="white"/>
    <circle cx="32" cy="46" r="6" fill="white"/>
    <circle cx="46" cy="46" r="6" fill="white"/>
    <path d="M32 24V32M32 32L18 40M32 32V40M32 32L46 40" stroke="white" strokeWidth="2"/>
  </svg>
);

export const GCPPubSubIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <circle cx="32" cy="32" r="8" fill="white"/>
    <circle cx="18" cy="20" r="5" fill="white"/>
    <circle cx="46" cy="20" r="5" fill="white"/>
    <circle cx="18" cy="44" r="5" fill="white"/>
    <circle cx="46" cy="44" r="5" fill="white"/>
    <path d="M26 28L22 23M38 28L42 23M26 36L22 41M38 36L42 41" stroke="white" strokeWidth="2"/>
  </svg>
);

export const GCPGKEIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <path d="M32 18L44 26V38L32 46L20 38V26L32 18Z" fill="#326CE5"/>
    <circle cx="32" cy="32" r="4" fill="white"/>
  </svg>
);

export const GCPCloudRunIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#4285F4"/>
    <path d="M20 44V20H36L44 28V44H20Z" fill="white"/>
    <path d="M36 20V28H44" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M26 32L32 38L40 30" stroke="#4285F4" strokeWidth="3"/>
  </svg>
);

// =====================================================
// HUAWEI ICONS - Red (#CF0A2C) with modern style
// =====================================================

export const HuaweiECSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <rect x="16" y="16" width="32" height="32" rx="2" fill="white"/>
    <rect x="20" y="20" width="10" height="10" fill="#CF0A2C"/>
    <rect x="34" y="20" width="10" height="10" fill="#CF0A2C"/>
    <rect x="20" y="34" width="10" height="10" fill="#CF0A2C"/>
    <rect x="34" y="34" width="10" height="10" fill="#CF0A2C"/>
  </svg>
);

export const HuaweiFunctionGraphIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <path d="M20 48L32 16H40L32 32H44L20 48Z" fill="white"/>
  </svg>
);

export const HuaweiOBSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <path d="M32 14L50 24V40L32 50L14 40V24L32 14Z" fill="white"/>
    <path d="M32 14L50 24L32 34L14 24L32 14Z" fill="#CF0A2C" fillOpacity="0.3"/>
  </svg>
);

export const HuaweiRDSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <ellipse cx="32" cy="20" rx="14" ry="6" fill="white"/>
    <path d="M18 20V44C18 47.31 24.27 50 32 50C39.73 50 46 47.31 46 44V20" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M18 32C18 35.31 24.27 38 32 38C39.73 38 46 35.31 46 32" stroke="white" strokeWidth="2"/>
  </svg>
);

export const HuaweiVPCIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <rect x="14" y="14" width="36" height="36" rx="2" stroke="white" strokeWidth="3" strokeDasharray="6 3" fill="none"/>
    <rect x="22" y="22" width="20" height="20" rx="2" fill="white" fillOpacity="0.3"/>
  </svg>
);

export const HuaweiELBIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <circle cx="32" cy="18" r="6" fill="white"/>
    <circle cx="18" cy="46" r="6" fill="white"/>
    <circle cx="32" cy="46" r="6" fill="white"/>
    <circle cx="46" cy="46" r="6" fill="white"/>
    <path d="M32 24V32M32 32L18 40M32 32V40M32 32L46 40" stroke="white" strokeWidth="2"/>
  </svg>
);

export const HuaweiCCEIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <circle cx="32" cy="32" r="14" fill="white"/>
    <path d="M32 18L44 26V38L32 46L20 38V26L32 18Z" fill="#326CE5"/>
    <circle cx="32" cy="32" r="4" fill="white"/>
  </svg>
);

export const HuaweiDMSIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#CF0A2C"/>
    <rect x="16" y="20" width="32" height="24" rx="2" fill="white"/>
    <rect x="20" y="26" width="24" height="4" fill="#CF0A2C"/>
    <rect x="20" y="34" width="16" height="4" fill="#CF0A2C"/>
  </svg>
);

// =====================================================
// GENERIC ICONS
// =====================================================

export const GenericUsersIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#6B7280"/>
    <circle cx="32" cy="24" r="8" fill="white"/>
    <path d="M16 50C16 41.16 23.16 34 32 34C40.84 34 48 41.16 48 50" fill="white"/>
  </svg>
);

export const GenericInternetIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#6B7280"/>
    <circle cx="32" cy="32" r="14" fill="none" stroke="white" strokeWidth="2"/>
    <ellipse cx="32" cy="32" rx="6" ry="14" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M18 32H46M32 18V46" stroke="white" strokeWidth="2"/>
  </svg>
);

export const GenericDatabaseIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#6B7280"/>
    <ellipse cx="32" cy="20" rx="14" ry="6" fill="white"/>
    <path d="M18 20V44C18 47.31 24.27 50 32 50C39.73 50 46 47.31 46 44V20" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M18 32C18 35.31 24.27 38 32 38C39.73 38 46 35.31 46 32" stroke="white" strokeWidth="2"/>
  </svg>
);

export const GenericServerIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="48" height="48" rx="4" fill="#6B7280"/>
    <rect x="16" y="16" width="32" height="12" rx="2" fill="white"/>
    <rect x="16" y="32" width="32" height="12" rx="2" fill="white"/>
    <circle cx="22" cy="22" r="2" fill="#6B7280"/>
    <circle cx="22" cy="38" r="2" fill="#6B7280"/>
    <rect x="28" y="20" width="16" height="4" fill="#6B7280"/>
    <rect x="28" y="36" width="16" height="4" fill="#6B7280"/>
  </svg>
);

// =====================================================
// ICON MAP - For easy lookup by service ID
// =====================================================

export const cloudIconMap: Record<string, React.FC<IconProps>> = {
  // AWS
  'aws-ec2': AWSEc2Icon,
  'aws-lambda': AWSLambdaIcon,
  'aws-s3': AWSS3Icon,
  'aws-rds': AWSRDSIcon,
  'aws-dynamodb': AWSDynamoDBIcon,
  'aws-vpc': AWSVPCIcon,
  'aws-subnet': AWSVPCIcon,
  'aws-apigw': AWSAPIGatewayIcon,
  'aws-cloudfront': AWSCloudFrontIcon,
  'aws-elb': AWSELBIcon,
  'aws-iam': AWSIAMIcon,
  'aws-cognito': AWSCognitoIcon,
  'aws-sqs': AWSSQSIcon,
  'aws-sns': AWSSNSIcon,
  'aws-ecs': AWSECSIcon,
  'aws-eks': AWSEKSIcon,
  'aws-cloudwatch': AWSCloudWatchIcon,
  'aws-route53': AWSRoute53Icon,

  // Azure
  'azure-vm': AzureVMIcon,
  'azure-functions': AzureFunctionsIcon,
  'azure-blob': AzureBlobIcon,
  'azure-sql': AzureSQLIcon,
  'azure-cosmos': AzureCosmosDBIcon,
  'azure-vnet': AzureVNetIcon,
  'azure-subnet': AzureVNetIcon,
  'azure-lb': AzureLBIcon,
  'azure-aad': AzureADIcon,
  'azure-keyvault': AzureKeyVaultIcon,
  'azure-servicebus': AzureServiceBusIcon,
  'azure-aks': AzureAKSIcon,
  'azure-appservice': AzureAppServiceIcon,

  // GCP
  'gcp-gce': GCPComputeEngineIcon,
  'gcp-functions': GCPCloudFunctionsIcon,
  'gcp-gcs': GCPCloudStorageIcon,
  'gcp-cloudsql': GCPCloudSQLIcon,
  'gcp-bigquery': GCPBigQueryIcon,
  'gcp-vpc': GCPVPCIcon,
  'gcp-subnet': GCPVPCIcon,
  'gcp-lb': GCPLoadBalancerIcon,
  'gcp-pubsub': GCPPubSubIcon,
  'gcp-gke': GCPGKEIcon,
  'gcp-run': GCPCloudRunIcon,

  // Huawei
  'huawei-ecs': HuaweiECSIcon,
  'huawei-functiongraph': HuaweiFunctionGraphIcon,
  'huawei-obs': HuaweiOBSIcon,
  'huawei-rds': HuaweiRDSIcon,
  'huawei-vpc': HuaweiVPCIcon,
  'huawei-subnet': HuaweiVPCIcon,
  'huawei-elb': HuaweiELBIcon,
  'huawei-cce': HuaweiCCEIcon,
  'huawei-dms': HuaweiDMSIcon,

  // Generic
  'generic-users': GenericUsersIcon,
  'generic-internet': GenericInternetIcon,
  'generic-database': GenericDatabaseIcon,
  'generic-server': GenericServerIcon,
};

// Helper function to get icon by service ID
export const getCloudIcon = (serviceId: string): React.FC<IconProps> | null => {
  return cloudIconMap[serviceId] || null;
};
