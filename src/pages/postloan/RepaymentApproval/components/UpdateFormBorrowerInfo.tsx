import BorrowerInfoDifference from '@/pages/borrower/BorrowerList_Approval/Components/BorrowerInfoDifference';
import {parse} from 'querystring'

const UpdateFormBorrowerInfo : React.FC = () => {

    let urlParams = parse(window.location.href.split('?')[1])
    const borrower_key = urlParams.borrower_key;
    return (
        <BorrowerInfoDifference borrower_key={borrower_key} show_documents = {true}/>
    );
}

export default UpdateFormBorrowerInfo;
