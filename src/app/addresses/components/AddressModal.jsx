import Modal from 'react-modal';

import { useAddress } from '../../../hooks/address';
import { useCustomSearchParams } from '../../../hooks/useCustomSearchParams'
import { AddressForm } from './AddressForm';

export function AddressModal({ visible, onClose }) {

  const [search] = useCustomSearchParams();
  const { mode, id } = search || {};
  const { data: address } = useAddress(id);

  const isEditMode = !!visible && mode === 'edit' && !!id;
  const isAddMode = !!visible && mode === 'add';

  if (isEditMode || isAddMode) {
    return (
      <Modal
        isOpen
        onRequestClose={onClose}
        appElement={document.getElementById('root')}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="modal"
      >
        <header className="flex items-center justify-between">
          <h2 className="uppercase">add address</h2>
          <button onClick={onClose} className="text-4xl p-2 px-4 leading-none">x</button>
        </header>
        <AddressForm address={address} submitMode={mode} afterSubmit={onClose} />
      </Modal>
    );
  }
  return null;
}
