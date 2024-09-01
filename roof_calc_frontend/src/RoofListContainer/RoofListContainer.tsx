import React, { Fragment, useEffect, useState } from 'react';
import { RoofModal } from '../shared/NewRoofModal/RoofModal';
import { AddNewItemButton } from '../shared/button/AddNewItemButton';
import s from '../app/appStyles/App.module.css';
import { useParams } from 'react-router-dom';
import { GridRoofTypes } from '../shared/GridItems/GridRoofTypes';
import { DeleteModal } from '../shared/Modal/DeleteModal';
import {
  axiosDeleteJunction,
  axiosDeleteRoofType,
  axiosEditRoofType,
  axiosGetRoofTypes,
  axiosNewRoofType,
} from '../shared/API/Api';
import { JunctionModal } from '../shared/NewRoofModal/Junction/JunctionModal';
import { EditJunctionModal } from '../shared/NewRoofModal/Junction/EditJunctionModal';

interface axiosItemsTypes {
  name: string;
  roofLayers: any;
  projectId: number;
  sectionId: number;
  queueId: number;
  roofId: number;
  squareMeters: number;
}

interface compositionTypes {
  [key: string]: string;
}

interface roofLayersTypes {
  composition: compositionTypes;
  name: string;
  layerId: number;
}

export interface roofItemsTypes {
  name: string;
  roofLayers: roofLayersTypes[];
  projectId: number;
  sectionId: number;
  queueId: number;
  roofId: number;
  squareMeters: number;
}

export const RoofListContainer = () => {
  const { sectionId } = useParams();

  const sectionParamsToNumber = Number(sectionId);

  const [roofItems, setRoofItems] = useState<roofItemsTypes[]>([]);

  const [openNewItem, setOpenNewItem] = useState<boolean>(false);

  const [openEditRoofModal, setOpenEditRoofModal] = useState<boolean>(false);

  const [openDeleteRoofTypeModal, setOpenDeleteRoofTypeModal] =
    useState<boolean>(false);

  const [openJunctionModal, setOpenJunctionModal] = useState<boolean>(false);

  const [openEditJunctionModal, setOpenEditJunctionModal] =
    useState<boolean>(false);

  const [editingJunction, setEditingJunction] = useState<any>({});

  const [openDeleteJunctionModal, setOpenDeleteJunctionModal] =
    useState<boolean>(false);

  const [elementId, setElementId] = useState<number>(0);

  useEffect(() => {
    const getRoofTypes = async () => {
      try {
        const data = await axiosGetRoofTypes(sectionParamsToNumber);
        setRoofItems(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRoofTypes();
  }, [
    openEditRoofModal,
    openDeleteRoofTypeModal,
    sectionParamsToNumber,
    openNewItem,
    openJunctionModal,
    openEditJunctionModal,
    openDeleteJunctionModal,
  ]);

  const handleClickOpen = () => {
    setOpenNewItem(true);
  };

  const handleClose = () => {
    setOpenNewItem(false);
  };

  const [editRoofInfo, setEditRoofInfo] = useState<{
    name?: string;
    squareMeters?: number;
    elementId: number;
  }>({
    name: '',
    squareMeters: 0,
    elementId: 0,
  });

  const handleClickOpenEditRoofModal = (
    elementId: number,
    name?: string,
    squareMeters?: number
  ) => {
    setOpenEditRoofModal(true);
    setEditRoofInfo({ name, squareMeters, elementId });
  };

  const handleCloseEditRoofModal = () => {
    setOpenEditRoofModal(false);
  };

  const handleClickOpenDeleteRoofTypeModal = (elementId: number) => {
    setOpenDeleteRoofTypeModal(true);
    setElementId(elementId);
  };

  const handleCloseDeleteRoofTypeModal = () => {
    setOpenDeleteRoofTypeModal(false);
  };

  const deleteItem = () => {
    axiosDeleteRoofType(elementId);
    setOpenDeleteRoofTypeModal(false);
  };

  const toggleNewJunctionModal = (elementId?: number) => {
    setOpenJunctionModal((prev) => !prev);
    setElementId(elementId ? elementId : 0);
  };

  const handleClickOpenEditJunctionModal = (
    junctionId: number,
    junctionName?: string,
    junctionLength?: number,
    junctionLayer?: any
  ) => {
    setOpenEditJunctionModal(true);
    setElementId(junctionId);
    const junction = {
      junctionId: junctionId,
      junctionName: junctionName,
      junctionLength: junctionLength,
      junctionLayer: junctionLayer,
    };
    setEditingJunction(junction);
  };

  const handleCloseEditJunctionModal = (
    func1: () => void = () => {},
    func2: () => void = () => {}
  ) => {
    setOpenEditJunctionModal(false);
    setEditingJunction(null);
    setElementId(0);
    func1();
    func2();
  };

  const toggleDeleteJunctionModal = (junctionId?: number) => {
    setOpenDeleteJunctionModal((prev) => !prev);
    setElementId(junctionId ? junctionId : 0);
  };

  const deleteJunction = () => {
    axiosDeleteJunction(elementId);
    setOpenDeleteJunctionModal(false);
  };

  return (
    <Fragment>
      <GridRoofTypes
        items={roofItems}
        editAction={handleClickOpenEditRoofModal}
        deleteAction={handleClickOpenDeleteRoofTypeModal}
        newJunctionAction={toggleNewJunctionModal}
        openJunctionModal={openJunctionModal}
        editJunctionAction={handleClickOpenEditJunctionModal}
        deleteJunctionAction={toggleDeleteJunctionModal}
        openEditJunctionModal={openEditJunctionModal}
        openDeleteJunctionModal={openDeleteJunctionModal}
      />
      <div className={s.button}>
        <RoofModal
          Status={openNewItem}
          handler={handleClose}
          API={axiosNewRoofType}
          title="Создание слоя кровли"
          text="Дайте название кровле и укажите квадратуру работ"
        />
        <RoofModal
          Status={openEditRoofModal}
          handler={handleCloseEditRoofModal}
          API={axiosEditRoofType}
          title="Редактирование слоя кровли"
          text="Дайте название кровле и укажите квадратуру работ"
          roofInfo={editRoofInfo}
        />
        <DeleteModal
          Status={openDeleteRoofTypeModal}
          handler={handleCloseDeleteRoofTypeModal}
          deleteItem={deleteItem}
          Title="Удаление слоя кровли"
          Text="Вы действительно хотите удалить слои кровли?"
        />
        <JunctionModal
          status={openJunctionModal}
          handler={toggleNewJunctionModal}
          elementId={elementId}
        />
        <EditJunctionModal
          status={openEditJunctionModal}
          handleClose={handleCloseEditJunctionModal}
          elementId={elementId}
          editingJunction={editingJunction}
        />
        <DeleteModal
          Status={openDeleteJunctionModal}
          handler={toggleDeleteJunctionModal}
          deleteItem={deleteJunction}
          Title="Удаление примыкания к кровле"
          Text="Вы действительно хотите удалить примыкание кровли?"
        />
        <AddNewItemButton
          name="Добавить кровлю"
          variant="outlined"
          handler={handleClickOpen}
        />
      </div>
    </Fragment>
  );
};
