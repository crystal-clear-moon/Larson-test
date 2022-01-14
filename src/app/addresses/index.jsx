import { useState } from 'react';
import { useAllAddresses } from '../../hooks/address';
import { AddressesTable } from './components/AddressesTable';
import { useNavigate } from 'react-router-dom'
import './styles.scss';
import { AddressModal } from './components/AddressModal';

export function AddressesPage() {
  const [modalIsVisible, setModalVisible] = useState(false);

  const { isLoading, error, data } = useAllAddresses();
  const navigate = useNavigate();

  const handleClickAdd = () => {
    setModalVisible(true);
    navigate({
      search: `mode=add`
    })
  }
  const handleRowClick = (id) => {
    navigate({
      search: `mode=edit&id=${id}`
    })
    setModalVisible(true);
  }
  const onCloseModal = () => {
    setModalVisible(false);
    navigate({ search: "" })
  }

  if (isLoading) return <p>Loading...</p>;
  if (!!error) {
    console.error(error)
    return <p>Failed to fetch data!</p>;
  }
  return (
    <>
      <header className="flex flex-row items-center justify-between">
        <h1>Addresses Table</h1>
        <button className="add-address-btn" onClick={handleClickAdd}>+ New Address</button>
      </header>
      <AddressesTable data={data} onRowClick={handleRowClick} />
      <AddressModal visible={modalIsVisible} onClose={onCloseModal} />
    </>
  );
}
