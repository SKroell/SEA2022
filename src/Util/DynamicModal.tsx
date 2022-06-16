import React ,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

class DynamicModal extends Component< {text: string[], onRequestClose: any}>{
    render(){
       const { text, onRequestClose } = this.props;
       return (
          <Modal
             onRequestClose={onRequestClose}
             effect={Effect.Fall}>
               <h2>Here are some hints for this exercise!</h2>
               <p id="p-wrap">{text}</p>
          </Modal>
       );
    }
  }

  export default DynamicModal;