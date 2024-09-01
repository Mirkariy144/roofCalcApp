function junctionCalculator(junctionLayers, perimeter) {
  let materials = [];

  junctionLayers.forEach((item) => {
    if (item.layerId == 1) {
      let insulant = item.height * perimeter;
      item.composition.material1 = `Утеплитель - ${insulant.toFixed(2).toString()} м2`;
      item.composition.material2 = `Дюбеля-зонты - ${Math.ceil(perimeter * 5)} шт`;
      materials.push(item);
    } else if (item.layerId == 2) {
      let insulant = item.height * perimeter;
      item.composition.material1 = `Утеплитель - ${insulant.toFixed(2).toString()} м2`;
      item.composition.material2 = `Дюбеля-зонты - ${Math.ceil(perimeter * 5)} шт`;
      materials.push(item);
    } else if (item.layerId == 3) {
      let insulant = item.height * perimeter;
      item.composition.material1 = `Утеплитель - ${insulant.toFixed(2).toString()} м2`;
      item.composition.material2 = `Дюбеля-зонты - ${Math.ceil(perimeter * 5)} шт`;
      materials.push(item);
    } else if (item.layerId == 4) {
      let ChCeSh;
      if ((1.5 % item.height).toFixed(2) < (1 % item.height).toFixed(2)) {
        ChCeSh = Math.ceil(
          Math.ceil(perimeter / 1) / Math.floor(1.5 / item.height),
        );
        item.composition.material1 = `ХЦЛ - ${ChCeSh.toString()} листов`;
        item.composition.material2 = `Дюбеля стена-4 - ${Math.ceil(perimeter * 5)} шт`;
      } else {
        ChCeSh = Math.ceil(
          Math.ceil(perimeter / 1.5) / Math.floor(1 / item.height),
        );
        item.composition.material1 = `ХЦЛ - ${ChCeSh.toString()} листов`;
        item.composition.material2 = `Дюбеля стена-4 - ${Math.ceil(perimeter * 5)} шт`;
      }
      materials.push(item);
    } else if (item.layerId == 5) {
      let quantity = Math.floor(10 / item.height);
      let waterproofing = perimeter / 0.9 / quantity;
      let squareMeters = perimeter * item.height;
      let primer = squareMeters * 0.25;
      item.composition.material1 = `Гидроизоляция 1 слой - ${Math.ceil(waterproofing)} рул.`;
      item.composition.material2 = `Праймер - ${primer.toFixed(2).toString()} л`;
      materials.push(item);
    }
  });
  return JSON.stringify(Object.assign({}, materials));
}

module.exports = junctionCalculator;
