import React, { useEffect, useState } from 'react';
import s from '../app/appStyles/App.module.css';
import { GridItems } from '../shared/GridItems/GridItems';
import { ItemModal } from '../shared/Modal/ItemModal';
import { AddNewItemButton } from '../shared/button/AddNewItemButton';
import { DeleteModal } from '../shared/Modal/DeleteModal';
import {
  axiosDeleteProject,
  axiosGetProjects,
  axiosEditProject,
  axiosNewProject,
} from '../shared/API/Api';
import { LogoutButton } from '../shared/button/LogoutButton';

interface projectsItems {
  name: string;
  projectId: number;
}

export const ProjectsListContainer = () => {
  const [projects, setProjects] = useState<projectsItems[]>([]);

  const [openNewItem, setOpenNewItem] = useState<boolean>(false);

  const [openEditItemModal, setOpenEditItemModal] = useState<boolean>(false);

  const [openDeleteItemModal, setOpenDeleteItemModal] =
    useState<boolean>(false);

  const [elementId, setElementId] = useState<number>(0);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await axiosGetProjects();
        setProjects(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProjects();
  }, [openEditItemModal, openDeleteItemModal, openNewItem]);

  const handleClickOpenNewItemModal = () => {
    setOpenNewItem(true);
  };

  const handleCloseNewItemModal = () => {
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
    axiosDeleteProject(elementId);
    setOpenDeleteItemModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <LogoutButton />
      <GridItems
        items={projects}
        editAction={handleClickOpenEditItemModal}
        deleteAction={handleClickOpenDeleteItemModal}
      />
      <div className={s.button}>
        <ItemModal
          Status={openNewItem}
          handler={handleCloseNewItemModal}
          Title="Новый проект"
          Text="Создайте новый проект"
          label="Введите название проекта"
          API={axiosNewProject}
        />
        <ItemModal
          Status={openEditItemModal}
          handler={handleCloseEditItemModal}
          Title="Изменение карточки"
          Text="Изменение карточки проекта"
          label="Введите новое название проекта"
          projectId={elementId}
          API={axiosEditProject}
        />
        <DeleteModal
          handler={handleCloseDeleteItemModal}
          Title={'Вы действительно хотите удалить проект?'}
          Text={
            'Это повлечёт за собой удаление всех связанных с ним данных (очереди, секции и кровли)'
          }
          Status={openDeleteItemModal}
          deleteItem={deleteItem}
        />
        <AddNewItemButton
          name="Добавить проект"
          variant="outlined"
          handler={handleClickOpenNewItemModal}
        />
      </div>
    </div>
  );
};
