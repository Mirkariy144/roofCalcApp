export const roofLayers: any = [
  {
    name: 'Уклонообразующий слой из керамзита',
    layerId: 1,
    composition: {
      material1: '',
      material2: '',
    },
  },
  {
    name: 'Уклонообразующий слой из раствора/бетона/керамзитобетона',
    layerId: 2,
    composition: {
      material1: '',
      material2: '',
      material3: '',
    },
  },
  {
    name: 'Стяжка',
    layerId: 3,
    composition: {
      material1: '',
      material2: '',
      material3: '',
    },
  },
  { name: 'ХЦЛ', layerId: 4, composition: { material1: '' } },
  { name: 'Водосточная воронка', layerId: 5, composition: { material1: '' } },
  {
    name: 'Гидроизоляция',
    layerId: 6,
    composition: {
      material1: '',
      material2: '',
    },
  },
  { name: 'Утеплитель', layerId: 7, composition: { material1: '' } },

  {
    name: 'Балластный слой',
    layerId: 8,
    composition: {
      material1: '',
      material2: '',
    },
  },
];

// <Typography
//   sx={{ fontSize: 14 }}
//   color="text.secondary"
//   gutterBottom
//   key={item.layerId}
// >
//   {item.composition
//     ? item.composition.name1 + '  ' + item.composition.name1Value
//     : item.name}
//   {item.composition
//     ? item.composition.name2 + ' ' + item.composition.name2Value
//     : null}
// </Typography>;
