// Report.tsx

import { LaborantType } from "./Laborant";

export type ReportType = {
    id?: number;
    fileNumber: string;
    patientFullName: string;
    patientID: string;
    diagnosisTitle: string;
    diagnosisDetails: string;
    reportDate: Date;
    reportImage: string;
    laborant: LaborantType;
};
