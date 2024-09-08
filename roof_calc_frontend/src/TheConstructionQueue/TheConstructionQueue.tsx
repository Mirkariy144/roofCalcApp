import React, { useEffect, useState } from 'react';
import { GridItems } from '../shared/GridItems/GridItems';
import { ItemModal } from '../shared/Modal/ItemModal';
import { AddNewItemButton } from '../shared/button/AddNewItemButton';
import '../app/appStyles/App.css';
import { useParams } from 'react-router-dom';
import { DeleteModal } from '../shared/Modal/DeleteModal';
import {
  axiosDeleteQueue,
  axiosGetQueues,
  axiosNewQueue,
  axiosEditQueue,
} from '../shared/API/Api';

interface queueItemsTypes {
  name: string;
  queueId: number;
  projectId: number;
}

export const TheConstructionQueueContainer = () => {
  const { projectId } = useParams<string>();

  const paramsNumber = Number(projectId);

  const [queueItems, setQueueItems] = useState<queueItemsTypes[]>([]);

  const [openNewItem, setOpenNewItem] = useState<boolean>(false);

  const [openEditItemModal, setOpenEditItemModal] = useState<boolean>(false);

  const [elementId, setElementId] = useState<number>(0);

  console.log(elementId);

  const [openDeleteItemModal, setOpenDeleteItemModal] =
    useState<boolean>(false);

  useEffect(() => {
    const getQueues = async () => {
      try {
        const data = await axiosGetQueues(paramsNumber);
        setQueueItems(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getQueues();
  }, [openEditItemModal, openDeleteItemModal, openNewItem, paramsNumber]);

  const handleClickOpen = () => {
    setOpenNewItem(true);
  };

  const handleClose = () => {
    setOpenNewItem(false);
  };

  const handleClickOpenEditItemModal = (elementId: number) => {
    setOpenEditItemModal(true);
    setElementId(elementId);
  };

  const handleCloseEditItemModal = () => {
    setOpenEditItemModal(false);
  };

  const handleClickOpenDeleteItemModal = (elementId: number) => {
    setOpenDeleteItemModal(true);
    setElementId(elementId);
  };

  const handleCloseDeleteItemModal = () => {
    setOpenDeleteItemModal(false);
  };

  const deleteItem = () => {
    axiosDeleteQueue(elementId);
    setOpenDeleteItemModal(false);
  };

  return (
    <div>
      <GridItems
        items={queueItems}
        editAction={handleClickOpenEditItemModal}
        deleteAction={handleClickOpenDeleteItemModal}
      />
      <div className='button'>
        <ItemModal
          Status={openNewItem}
          handler={handleClose}
          Title="Новая очередь строительства"
          Text="Создайте новую очередь строительства"
          projectId={paramsNumber}
          label="Введите название очереди строительства"
          API={axiosNewQueue}
        />
        <ItemModal
          Status={openEditItemModal}
          handler={handleCloseEditItemModal}
          Title="Изменение карточки"
          Text="Изменение карточки очереди строительства"
          label="Введите новое название очереди строительства"
          projectId={elementId}
          API={axiosEditQueue}
        />
        <DeleteModal
          handler={handleCloseDeleteItemModal}
          Title={'Вы действительно хотите удалить очередь?'}
          Text={
            'Это повлечёт за собой удаление всех связанных с ней данных (секции и кровли)'
          }
          Status={openDeleteItemModal}
          deleteItem={deleteItem}
        />
        <AddNewItemButton
          name="Добавить очередь"
          variant="outlined"
          handler={handleClickOpen}
        />
      </div>
    </div>
  );
};
