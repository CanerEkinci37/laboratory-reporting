import { Link, useNavigate } from "react-router-dom";
import { ReportType } from '../types/Report';
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteReportFunc } from "../redux/reportDataSlice";
import { reportModalFunc } from "../redux/reportModalSlice";
import Button from "./Button";
import { Card, Group, Image, Text } from "@mantine/core";

interface ReportCardProps {
    dt: ReportType;
}

export const ReportCard: React.FC<ReportCardProps> = ({ dt }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateFunc = () => {
        dispatch(reportModalFunc());
        navigate(`/?update=${dt.id}`);
    };

    return (
        <div>
            <Card shadow='lg' padding='lg' radius='md' style={{margin: '10px', width:'300px', height:'400px', overflow:'hidden'}}>
                <Card.Section>
                    <GrClose 
                        className="delete-button" 
                        style={{cursor:'pointer', position:'absolute', top:'10px', right:'10px', zIndex:1}} 
                        onClick={() => dispatch(deleteReportFunc(Number(dt.id)))}
                    />
                    <Link to={`/details/${dt.id}`}>
                        <Image src={dt.reportImage} height={160} width={160} alt={`Report for ${dt.patientFullName}`} />
                    </Link>
                </Card.Section>

                <Group justify="space-between" mt='md' mb='xs'>
                    <Text fw={500}>{dt.patientFullName}</Text>
                </Group>

                <Text size='sm' c='dimmed'>
                    Hasta Kimlik Numarası: {dt.patientID}
                </Text>
                
                <Text size='sm' c='dimmed'>
                    Konulan Teşhis: {dt.diagnosisTitle}
                </Text>

                <Text size='sm' c='dimmed'>
                    Rapor Tarihi: {new Date(dt.reportDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Text>
                
                <Text size='sm' c='dimmed'>
                    Laborant: {dt.laborant.name.charAt(0).toUpperCase() + dt.laborant.name.slice(1).toLowerCase()} {dt.laborant.surname.charAt(0).toUpperCase() + dt.laborant.surname.slice(1).toLowerCase()}
                </Text>
                
                <Button btnText="Güncelle" color='green.5' onClick={updateFunc}/>
            </Card>
        </div>
    );
};
