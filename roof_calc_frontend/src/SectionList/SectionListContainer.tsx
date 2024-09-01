import React, { useEffect, useState } from 'react';
import { GridItems } from '../shared/GridItems/GridItems';
import { ItemModal } from '../shared/Modal/ItemModal';
import { AddNewItemButton } from '../shared/button/AddNewItemButton';
import s from '../app/appStyles/App.module.css';
import { useParams } from 'react-router-dom';
import { DeleteModal } from '../shared/Modal/DeleteModal';
import {
  axiosDeleteSection,
  axiosEditSection,
  axiosGetSections,
  axiosNewSection,
} from '../shared/API/Api';

interface sectionItemsTypes {
  name: string;
  projectId: number;
  queueId: number;
  sectionId: number;
}

export const SectionsListContainer = () => {
  const { projectId, queueId } = useParams();

  const projectParamsToNumber = Number(projectId);

  const queueParamsToNumber = Number(queueId);

  const [sectionItems, setSectionItems] = useState<sectionItemsTypes[]>([]);

  const [openNewItem, setOpenNewItem] = useState<boolean>(false);

  const [openEditItemModal, setOpenEditItemModal] = useState<boolean>(false);

  const [elementId, setElementId] = useState<number>(0);

  const [openDeleteItemModal, setOpenDeleteItemModal] =
    useState<boolean>(false);

  useEffect(() => {
    const getSections = async () => {
      try {
        const data = await axiosGetSections(queueParamsToNumber);
        setSectionItems(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSections();
  }, [
    openEditItemModal,
    openDeleteItemModal,
    openNewItem,
    queueParamsToNumber,
  ]);

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
    axiosDeleteSection(elementId);
    setOpenDeleteItemModal(false);
  };

  return (
    <div>
      <GridItems
        items={sectionItems}
        editAction={handleClickOpenEditItemModal}
        deleteAction={handleClickOpenDeleteItemModal}
      />
      <div className={s.button}>
        <ItemModal
          Status={openNewItem}
          handler={handleClose}
          Title="Новыя секция"
          Text="Создайте новую секцию"
          label="Обозначьте секцию"
          projectId={projectParamsToNumber}
          queueId={queueParamsToNumber}
          API={axiosNewSection}
        />
        <ItemModal
          Status={openEditItemModal}
          handler={handleCloseEditItemModal}
          Title="Изменение карточки"
          Text="Изменение карточки секции"
          label="Введите новое название секции"
          projectId={elementId}
          API={axiosEditSection}
        />
        <DeleteModal
          handler={handleCloseDeleteItemModal}
          Title={'Вы действительно хотите удалить секцию?'}
          Text={
            'Это повлечёт за собой удаление всех связанных с ней данных (кровли)'
          }
          Status={openDeleteItemModal}
          deleteItem={deleteItem}
        />
        <AddNewItemButton
          name="Добавить секцию"
          variant="outlined"
          handler={handleClickOpen}
        />
      </div>
    </div>
  );
};
