var fs = require('fs');

//env config, product type, ptweight,
var fs = require('fs');
var breakPointsNames = ["area", "products", "wareHouses", "orders"];
<<<<<<< HEAD
//When to loop for another values
//WhareHouses
var mapperCutKey = [3];
var mapperData = [];
=======
>>>>>>> 4b078930ccb76693f3fa03501f84b0285ce45100

var area = ["rows", "columns", "drones", "turns", "maxPayload"];

var product = ["typeCount", "typeWeigh"];

var wareHouse = ["count", "location", "itemsStored", "itemsQty"];
//WareHouse is on 3 lines
var wareHousePackCount = 3;
var wareHouseItem = {};

var order = ["deliveryPos", "productsCount", "deliveryItems"];
var orderPackCount = 3;
var orderItem = {};

var mapper = {
  "area": {
    "startLine": 0,
    "endLine": 1,
    "rows": 0,
    "columns": 0,
    "drones": 0,
    "turns": 0,
    "maxPayload": ""
  },
  "products": {
    "startLine": 1,
    "endLine": 3,
    "typeCount": "",
    "typeWeigh": ""
  },
  "wareHouses": {
    "startLine": 3,
    "endLine": 34,
    "count": 0,
    "wareHouse": []
  },
  "orders": {
    "startLine": 34,
    "count": 1250,
    "endLine": 0,
    "orders": []
  }
};
<<<<<<< HEAD
var mapperFile = function() {

  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./instructions/busy_day.in'),
    output: fs.writeFile('output.txt')
  });

  var countLine = 0;
  var breakPoint = 0;
  var breakPointName = "";
  var breakPointNamePoint = 0;
  var endPoint = 0;
  var whatNext = 0;
  lineReader.on('line', function(line) {

    if (countLine == breakPoint) {
      console.log("Count line " + countLine + " == " + breakPoint)
        //Get break point name & obj
      breakPointName = breakPointsNames[breakPointNamePoint];
      console.log("Break point name " + breakPointName)
      breakPointObj = mapper[breakPointName];

      //Get actual break point end
      endPoint = breakPointObj.endLine;
      breakPointNamePoint++;
      whatNext = 0;
    }
=======
var mapperFile = function(){

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./instructions/busy_day.in')
    });

    var countLine=0;
    var breakPoint=0;
    var breakPointName="";
    var breakPointNamePoint=0;
    var endPoint=0;
    var whatNext=0;
    lineReader.on('line', function (line) {

          if(countLine==breakPoint){
              //console.log("Count line "+countLine+" == "+breakPoint)
              //Get break point name & obj
              breakPointName = breakPointsNames[breakPointNamePoint];
              //console.log("Break point name "+breakPointName)
              breakPointObj = mapper[breakPointName];

              //Get actual break point end
              endPoint = breakPointObj.endLine;
              breakPointNamePoint++;
              whatNext=0;
          }

          //Send line value to section manager
          //console.log(breakPointName+"Mapper('"+line+"', "+whatNext+")");
          whatNext = eval(breakPointName+"Mapper('"+line+"', "+whatNext+", "+countLine+")");

          //End of section set next section auth
          if(countLine==(endPoint-1)){
            //console.log('EndPoint '+endPoint);
            //New section will come
            breakPoint = endPoint;
           // console.log('Break point '+breakPoint)
          }

          //console.log(breakPointObj)
          //console.log('Line from file:', line);

      countLine++;
    }).on('close', function() {
        fs.writeFile("output.json", JSON.stringify(mapper))
     });
}
>>>>>>> 4b078930ccb76693f3fa03501f84b0285ce45100

    //Send line value to section manager
    //console.log(breakPointName+"Mapper('"+line+"', "+whatNext+")");
    whatNext = eval(breakPointName + "Mapper('" + line + "', " + whatNext + ", " + countLine + ")");

    //End of section set next section auth
    if (countLine == (endPoint - 1)) {
      console.log('EndPoint ' + endPoint);
      //New section will come
      breakPoint = endPoint;
      console.log('Break point ' + breakPoint)
    }

    //console.log(breakPointObj)
    //console.log('Line from file:', line);

    countLine++;
  });
}

var areaMapper = function(lines, count, currentLine) {
  //console.log(count);
  var areaValue = lines.split(" ");
  for (var i = 0; i < areaValue.length; i++) {
    mapper.area[area[i]] = areaValue[i];
  }
  //console.log(mapper.area);
  return 0;
}

var productsMapper = function(lines, count, currentLine) {
  mapper.products[product[count]] = lines;
  count++;
  //console.log(mapper.products);
  return count;
}

var wareHousesMapper = function(lines, count, currentLine) {

  if (count == 0) {
    mapper.wareHouses.endLine = parseInt(currentLine) + (parseInt(lines) * wareHousePackCount);
    mapper.wareHouses[wareHouse[count]] = lines;
  } else {
    wareHouseItem[wareHouse[count]] = lines;
  }

  count++;

  if (count == wareHousePackCount) {
    mapper.wareHouses.wareHouse.push(wareHouseItem)
    wareHouseItem = {};
    count = 1;
  }
  //console.log(mapper.wareHouses);
  return count;
}

<<<<<<< HEAD
var ordersMapper = function(lines, count, currentLine) {

  orderItem[order[count]] = lines;
  count++;
  if (count == orderPackCount) {
    mapper.orders.orders.push(orderItem)
    console.log(orderItem);
    orderItem = {};
    count = 0;
  }
  //console.log(mapper.wareHouses);
  return count;
=======
    orderItem[order[count]]=lines;
    count++;
    if(count==orderPackCount){
        mapper.orders.orders.push(orderItem)
        //console.log(orderItem);
        orderItem={};
        count=0;
    }
    //console.log(mapper.wareHouses);
    return count;
>>>>>>> 4b078930ccb76693f3fa03501f84b0285ce45100
}

mapperFile();
