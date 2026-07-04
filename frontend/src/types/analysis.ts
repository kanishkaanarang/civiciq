export interface AnalysisResult {
  category: string;
  severity: string;
  department: string;
  confidence: number;

  summary: string;
  recommended_action: string;
  reasoning: string;

  location: string;

  priority_score: number;

  estimated_people_affected: string;

  estimated_resolution_time: string;

  required_departments: string[];

  operational_impact: string;
}

export interface GeoLocation {
    success: boolean;
    latitude: number;
    longitude: number;
    display_name: string;
}