import { useDispatch, useSelector } from "react-redux";
import { createReportFunc, updateReportFunc } from "../redux/reportDataSlice";
import { ReportCard } from "../components/ReportCard";
import { RootState } from "../redux/store";
import LaborantModal from "../components/LaborantModal";
import Input from "../components/Input";
import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import { LaborantType } from "../types/Laborant";
import { createLaborantFunc } from "../redux/laborantDataSlice";
import { laborantModalFunc } from "../redux/laborantModalSlice";
import { reportModalFunc } from "../redux/reportModalSlice";
import ReportModal from "../components/ReportModal";
import { ReportType } from "../types/Report";
import Select from "../components/Select";
import { useLocation, useNavigate } from "react-router-dom";

const Report = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const reportData = useSelector((state: RootState) => state.reportData.data);
  const keyword = useSelector((state: RootState) => state.reportData.keyword);
  const laborantData = useSelector((state: RootState) => state.laborantData.data);

  const laborantModalState = useSelector((state: RootState) => state.laborantModal.modal);
  const reportModalState = useSelector((state: RootState) => state.reportModal.modal);

  // { Laborant Section }

  const [laborantInfo, setLaborantInfo] = useState<Partial<LaborantType>>();

  const laborantOnChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLaborantInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const laborantBtnFunc = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!laborantInfo?.name || !laborantInfo.surname || !laborantInfo.hospitalID) {
      console.log("Please fill in all fields for laborant.");
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const hospitalIdPattern = /^[0-9]{7}$/;

    if (!hospitalIdPattern.test(laborantInfo.hospitalID)) {
      alert("Hastane kimlik numarası 7 haneli rakam olmalıdır.");
      return;
    }

    dispatch(createLaborantFunc({...laborantInfo, id:laborantData.length + 1} as LaborantType));
    setReportInfo({});
    dispatch(laborantModalFunc());
    alert("Laborant başarıyla oluşturuldu.");
  }

  const laborantContent = (
    <>
      <Input id='name' type='text' name='name' placeholder='Adınız' onChange={(e) => laborantOnChangeFunc(e)} />
      <Input id='surname' type='text' name='surname' placeholder='Soyadınız' onChange={(e) => laborantOnChangeFunc(e)} />
      <Input id='hospitalID' type='text' name='hospitalID' placeholder='Hastane Kimlik Numaranız' maxLength={7} onChange={e => laborantOnChangeFunc(e)} />
      <Button btnText={"Oluştur"} color="blue.9" onClick={(e) => laborantBtnFunc(e)} />
    </>
  )

  // { Report Section }

  const [reportInfo, setReportInfo] = useState<Partial<ReportType>>();

  const reportOnChangeFunc = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const imageValidExtensions = ['png', 'jpeg', 'jpg'];

    setReportInfo((prevData) => {
      if (name === "laborant") {
        const selectedLaborant = laborantData.find(dt => dt.id === Number(value));
        return { ...prevData, laborant: selectedLaborant };
      } else if (name === "reportImage") {
        const fileInput = e.target as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {
          const fileName = file.name;
          const fileExtension = fileName.split('.').pop()?.toLowerCase();

          if (!imageValidExtensions.includes(`${fileExtension}`)) {
            alert("Lütfen geçerli bir görsel dosyası yükleyin (PNG, JPEG veya JPG).");
            fileInput.value = '';
            return { ...prevData };
          }
        }

        const fileUrl = file ? URL.createObjectURL(file) : '';
        return { ...prevData, reportImage: fileUrl };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  }

  let loc = location?.search.split('=')[1];
  console.log(reportInfo);
  useEffect(() => {
    if (loc) {
      setReportInfo(reportData.find(dt => dt.id === Number(loc)));
    } else {
      setReportInfo({});
    }
  }, [loc]);

  const reportBtnFunc = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !reportInfo?.fileNumber ||
      !reportInfo?.patientFullName ||
      !reportInfo?.patientID ||
      !reportInfo?.diagnosisTitle ||
      !reportInfo?.diagnosisDetails ||
      !reportInfo?.reportDate ||
      !reportInfo?.laborant ||
      !reportInfo?.reportImage
    ) {
      alert("Please fill in all fields for the report.");
      return;
    }

    const fileNumberPattern = /^[0-9]+$/;
    if (!fileNumberPattern.test(reportInfo.fileNumber)) {
      alert("Dosya numarası yalnızca rakamlardan oluşmalıdır.");
      return;
    }

    const patientIdPattern = /^[0-9]{11}$/;
    if (!patientIdPattern.test(reportInfo.patientID)) {
      alert("TC kimlik numarası 11 haneli rakam olmalıdır.");
      return;
    }

    dispatch(createReportFunc({ ...reportInfo, id: reportData.length + 1 } as ReportType));
    setReportInfo({});
    dispatch(reportModalFunc());
  };

  const reportBtnUpdateFunc = () => {
    dispatch(updateReportFunc({ ...reportInfo, id: Number(loc) } as ReportType));
    dispatch(reportModalFunc());
    navigate('/');
  }

  const reportContent = (
    <>
      <Input value={reportInfo?.fileNumber} id='fileNumber' type='text' name='fileNumber' placeholder='Dosya Numarası' onChange={(e) => reportOnChangeFunc(e)} />
      <Input value={reportInfo?.patientFullName} id='patientFullName' type='text' name='patientFullName' placeholder='Hasta Adı ve Soyadı' onChange={(e) => reportOnChangeFunc(e)} />
      <Input value={reportInfo?.patientID} id='patientID' type='text' name='patientID' placeholder='Hasta Kimlik Numarası' maxLength={11} onChange={(e) => reportOnChangeFunc(e)} />
      <Input value={reportInfo?.diagnosisTitle} id='diagnosisTitle' type='text' name='diagnosisTitle' placeholder='Koyulan Tanı Başlığı' onChange={(e) => reportOnChangeFunc(e)} />
      <Input value={reportInfo?.diagnosisDetails} id='diagnosisDetails' type='text' name='diagnosisDetails' placeholder='Tanı Detayları' onChange={(e) => reportOnChangeFunc(e)} />
      <Input value={reportInfo?.reportDate} id='reportDate' type='date' name='reportDate' placeholder='Raporun Tarihi' onChange={(e) => reportOnChangeFunc(e)} />
      <Input id='reportImage' type='file' name='reportImage' placeholder='Rapor Fotoğrafı' onChange={(e) => reportOnChangeFunc(e)} />
      <Select id='laborantSelect' name="laborant" placeholder="Laborant Seçiniz" data={laborantData} onChange={(e) => reportOnChangeFunc(e)} />
      <Button btnText={loc ? 'Güncelle' : 'Oluştur'} color="blue.9" onClick={loc ? reportBtnUpdateFunc : reportBtnFunc} />
    </>
  )

  const filteredReports = reportData.filter(dt => 
    dt.patientID.includes(keyword) || 
    dt.patientFullName.toLowerCase().includes(keyword.toLowerCase()) || 
    dt.laborant.name.toLowerCase().includes(keyword.toLowerCase()) || 
    dt.laborant.surname.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="report-card-container">
      {filteredReports.map((dt:ReportType, i) => (
        <ReportCard key={i} dt={dt} /> 
      ))}
      {laborantModalState && <LaborantModal title='Laborant Oluştur' content={laborantContent} />}
      {reportModalState && <ReportModal title={loc ? 'Rapor Güncelle' : 'Rapor Oluştur'} content={reportContent} />}
    </div>
 
  );
}

export default Report