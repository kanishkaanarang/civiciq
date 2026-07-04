export interface Incident {

    id:string;

    description:string;

    category:string;

    severity:string;

    department:string;

    confidence:number;

    summary:string;

    reasoning:string;

    recommended_action:string;

    location:string;

    priority_score:number;

    estimated_people_affected:string;

    estimated_resolution_time:string;

    operational_impact:string;

    required_departments:string[];

    resource_recommendation:any;

    operational_forecast:any;

    status:"Pending"|"Assigned"|"Resolved";

    assignedDepartment:string|null;

    assignedAt:any;

    createdAt:any;

}