export interface AnalysisResult {

  category:string;

  severity:string;

  department:string;

  confidence:number;

  summary:string;

  recommended_action:string;

  reasoning:string;

  location:string;

  priority_score:number;

  estimated_people_affected:string;

  estimated_resolution_time:string;

  required_departments:string[];

  operational_impact:string;

  resource_recommendation:{

      police_officers:number;

      traffic_marshals:number;

      tow_trucks:number;

      ambulances:number;

      barricades:number;

      estimated_cost:string;

      justification:string;

  };

  operational_forecast:{

      next_6_hours:{

          traffic_increase:string;

          additional_people_affected:string;

          emergency_delay:string;

          risk_level:string;

      };

      next_24_hours:{

          traffic_increase:string;

          additional_people_affected:string;

          risk_level:string;

      };

      ai_summary:string;

  };

}

export interface GeoLocation{

    success:boolean;

    latitude:number;

    longitude:number;

    display_name:string;

}