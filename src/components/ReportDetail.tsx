import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { Card, Text, Title, Image } from '@mantine/core';

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const reportData = useSelector((state: RootState) => state.reportData.data);
  
  // URL'den gelen id slug ile report verisini elde etme
  const report = reportData.find(dt => dt.id === Number(id));

  if (!report) {
    return <div>Report Not Found.</div>;
  }

  return (
    <Card className="report-detail-container" padding="lg" shadow="sm" radius="md">
      <Title order={2}>Report Details of {report.patientFullName}</Title>
      <Image
        src={report.reportImage}
        alt={`Report for ${report.patientFullName}`}
        className="report-image"
        radius="md"
        mb="md"
      />
      <Text className="report-title" style={{ fontWeight: 1000, fontSize: '1.5rem', marginBottom: '8px', color: '#2c3e50' }}>
        Tanı Başlığı: {report.diagnosisTitle}
      </Text>
      <Text className="report-details" style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px', color: '#34495e' }}>
        Tanı Detayları: {report.diagnosisDetails}
      </Text>
      <Text className="report-patient-id" style={{ fontSize: '1rem', marginBottom: '4px', color: '#34495e' }}>
        Hasta ID: <span style={{ fontWeight: 500 }}>{report.patientID}</span>
      </Text>
      <Text className="report-file-number" style={{ fontSize: '1rem', marginBottom: '4px', color: '#34495e' }}>
        Dosya Numarası: <span style={{ fontWeight: 500 }}>{report.fileNumber}</span>
      </Text>
      <Text className="report-date" style={{ fontSize: '1rem', marginBottom: '4px', color: '#34495e' }}>
        Rapor Tarihi: {report.reportDate ? new Date(report.reportDate).toLocaleDateString() : 'Tarih bulunamadı'}
      </Text>
      <Text className="report-laborant" style={{ fontSize: '1rem', marginBottom: '4px', color: '#34495e' }}>
        Laborant: <span style={{ fontWeight: 500 }}>{report.laborant.name} {report.laborant.surname}</span>
      </Text>
    </Card>
  );
}

export default ReportDetail;
