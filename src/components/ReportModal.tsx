import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { reportModalFunc } from "../redux/reportModalSlice";
import { useNavigate } from "react-router-dom";

interface ReportModalProps {
    title: string;
    content: React.ReactNode;
}

const ReportModal: React.FC<ReportModalProps> = ({ title, content }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Report Modal'a güncelleme için de girilebilmektedir. Güncelleme için Navigate kullanılıyor. Bu sebeple önceden 
    // girilmiş satırların silinmesi için / URL'e navigate ediliyor.
    const closeReportModalFunc = () => {
        dispatch(reportModalFunc());
        navigate('/');
    };

    return (
        <div className="modal-overlay">
            <div className="laborant-input-container">
                <div className="header-container">
                    <h2>{title}</h2>
                    <GrClose 
                        size={36} 
                        style={{ cursor: 'pointer' }} 
                        onClick={closeReportModalFunc} 
                    />
                </div>
                <form className="laborant-form">
                    {content}
                </form>
            </div>
        </div>
    );
}

export default ReportModal;
