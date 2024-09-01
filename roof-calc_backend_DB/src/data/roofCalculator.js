function roofCalculator(roofTypes, squareMeters, upperPoint, lowerPoint) {
  let materials = [];

  roofTypes.forEach((item) => {
    if (item.layerId == 1) {
      let averageThickness = (((upperPoint - lowerPoint) / 3) * 2) / 100;
      let keramzitArea = squareMeters * averageThickness;
      let tape = squareMeters * 1.1;
      item.composition.material1 =
        'Керамзит - ' + keramzitArea.toFixed(2).toString() + ' м3';
      item.composition.material2 =
        'Плёнка полиэтиленовая - ' + tape.toFixed(2).toString() + ' м2';
      materials.push(item);
    } else if (item.layerId == 2) {
      let averageThickness = (((upperPoint - lowerPoint) / 3) * 2) / 100;
      let slopeArea = squareMeters * averageThickness;
      let reinforcingMesh = squareMeters / (1.8 * 2.3);
      let retainers = squareMeters * 2.5;
      item.composition.material1 =
        'Раствор - ' + slopeArea.toFixed(2).toString() + ' м3';
      item.composition.material2 =
        'Армирующая сетка - ' +
        Math.ceil(reinforcingMesh).toString() +
        ' листов';
      item.composition.material3 =
        'Фиксаторы - ' + Math.ceil(retainers).toString() + ' шт';
      materials.push(item);
    } else if (item.layerId == 3) {
      let reinforcingMesh = squareMeters / (1.8 * 2.3);
      let retainers = squareMeters * 2.5;
      let screed = squareMeters * 0.06;
      item.composition.material1 =
        'Армирующая сетка - ' +
        Math.ceil(reinforcingMesh).toString() +
        ' листов';
      item.composition.material2 =
        'Фиксаторы - ' + Math.ceil(retainers).toString() + ' шт';
      item.composition.material3 =
        'Стяжка - ' + screed.toFixed(2).toString() + ' м2';
      materials.push(item);
    } else if (item.layerId == 4) {
      let ChCeSh = (squareMeters / 1.5) * 1.1;
      item.composition.material1 = `ХЦЛ - ${ChCeSh.toFixed(2).toString()} листов`;
      materials.push(item);
    } else if (item.layerId == 5) {
      let drainFunnel = Math.ceil(squareMeters / 50);
      item.composition.material1 =
        'Водосточная воронка - ' + drainFunnel.toString() + ' шт';
      materials.push(item);
    } else if (item.layerId == 6) {
      let primer = squareMeters * 0.25;
      let waterproofing = squareMeters / 8.75;
      item.composition.material1 =
        'Праймер - ' + primer.toFixed(2).toString() + ' л';
      item.composition.material2 =
        'Гидроизоляция 1 слой - ' +
        Math.ceil(waterproofing).toString() +
        ' рул.';
      materials.push(item);
    } else if (item.layerId == 7) {
      let insulant = squareMeters * 1.1;
      item.composition.material1 =
        'Утеплитель - ' + insulant.toFixed(2).toString() + ' м2';
      materials.push(item);
    } else if (item.layerId == 8) {
      let rubble = squareMeters * 0.05;
      let Geotextile = squareMeters * 1.1;
      item.composition.material1 =
        'Щебень - ' + rubble.toFixed(2).toString() + ' м3';
      item.composition.material2 =
        'Геотекстиль - ' + Geotextile.toFixed(2).toString() + ' м2';
      materials.push(item);
    }
  });
  return JSON.stringify(Object.assign({}, materials));
}

module.exports = roofCalculator;
