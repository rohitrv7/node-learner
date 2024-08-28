interface LandUpdateFields {
    [key: string]: any;
  }
  
  interface LandAdditionalFields {
    [key: string]: any;
  }
  
  export const getUpdateFields = (data: any): LandUpdateFields => ({
    // Assuming data contains locationDetails, legalInformation, etc.
    "locationDetails.fullAddress": data.locationDetails?.fullAddress,
    "locationDetails.city": data.locationDetails?.city,
    "locationDetails.state": data.locationDetails?.state,
    "locationDetails.zipCode": data.locationDetails?.zipCode,
    "locationDetails.longitude": data.locationDetails?.longitude,
    "locationDetails.latitude": data.locationDetails?.latitude,
    "locationDetails.otherRequirements": data.locationDetails?.otherRequirements,
  
    "legalInformation.ownerName": data.legalInformation?.ownerName,
    "legalInformation.email": data.legalInformation?.email,
    "legalInformation.countryCode": data.legalInformation?.countryCode,
    "legalInformation.phoneNumber": data.legalInformation?.phoneNumber,
    "legalInformation.legalDescription": data.legalInformation?.legalDescription,
    "legalInformation.zoningInformation": data.legalInformation?.zoningInformation,
  
    "physicalChar.lotSize": data.physicalChar?.lotSize,
    "physicalChar.buildingSize": data.physicalChar?.buildingSize,
    "physicalChar.noOfUnit": data.physicalChar?.noOfUnit,
    "physicalChar.constructYear": data.physicalChar?.constructYear,
  
    "financialInfo.purchasePrice": data.financialInfo?.purchasePrice,
    "financialInfo.marketValue": data.financialInfo?.marketValue,
    "financialInfo.taxInfo": data.financialInfo?.taxInfo,
    "financialInfo.rentalIncome": data.financialInfo?.rentalIncome,
  });
  
  
 export interface LandData {
    userId?: number;
    identifyingInformation: {
      propertyID: String;
      propertyName: string;
      propertyType: string;
    };
    locationDetails: {
      address: string;
      city: string;
      state: string;
      zipCode: number;
      longitude: string;
      latitude: string;
      nearByArea: string;
    };
    legalInformation: {
      ownerName: string;
      email: string;
      countryCode: string;
      phoneNumber: string;
      legalDescription: string;
      zoningInformation: string;
    };
    physicalChar: {
      lotSize: string;
      buildingSize: string;
      noOfUnit: string;
      constructYear: string;
    };
    financialInfo: {
      purchasePrice: number;
      marketValue: number;
      taxInfo: number;
      rentalIncome: number;
    };
  }

  export interface LandAdditionalData {
    landId: number; 
    operationalInfo: {
      utilities?: {
        [key: string]: any; 
      };
      maintenanceAndRepairs?: string;
      attachFile?: string;
      currentOccupancyStatus?: string;
      attachTenancyAgreement?: string;
    };
    additionalInfo: {
      pastOwner?: string;
      phoneNumber?: string;
    };
  }
  