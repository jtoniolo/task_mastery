/**
 * API Documentation
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HealthControllerCheckV1200ResponseInfoValue } from './healthControllerCheckV1200ResponseInfoValue';


export interface HealthControllerCheckV1200Response { 
    status?: string;
    info?: { [key: string]: HealthControllerCheckV1200ResponseInfoValue; } | null;
    error?: { [key: string]: HealthControllerCheckV1200ResponseInfoValue; } | null;
    details?: { [key: string]: HealthControllerCheckV1200ResponseInfoValue; };
}

