import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import styles from './AnalyzeModal.module.css'

const AnalyzeModal = ({show}) => {
    return ( 
      <Modal
        keyboard={false}
        fullscreen={true}
        show={show}
        centered={true}
        className={styles.modal}
      >
        <Modal.Body className={styles.body}>
          <Spinner animation="border"/>
          <p>Đang phân tích</p>
        </Modal.Body>
      </Modal>
    );
}
 
export default AnalyzeModal;