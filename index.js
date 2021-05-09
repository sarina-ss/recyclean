
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const vgmUrl = 'https://www.peelregion.ca/scripts/waste/how-to-sort-your-waste.pl?action=category&query=Recycle';
const vgm2Url= 'https://www.peelregion.ca/scripts/waste/how-to-sort-your-waste.pl?action=category&query=Garbage';
const vgm3Url= 'https://www.peelregion.ca/scripts/waste/how-to-sort-your-waste.pl?action=category&query=Organics';
const vgm4Url = 'https://www.peelregion.ca/scripts/waste/how-to-sort-your-waste.pl?action=category&query=Yard%20Waste';
const vgm5Url = 'https://www.peelregion.ca/scripts/waste/how-to-sort-your-waste.pl?action=category&query=CRC';
const vgm6Url = 'https://www.peelregion.ca/scripts/waste/how-to-sort-your-waste.pl?action=category&query=Special%20Services';

const noParens = (link) => {
  // Regular expression to determine if the text has parentheses.
  const parensRegex = /^((?!\().)*$/;
  return parensRegex.test(link.textContent);
};

(async () => {
  const response = await got(vgmUrl);
  const dom = new JSDOM(response.body);

  // Create an Array out of the HTML Elements for filtering using spread syntax.
  const nodeList = [...dom.window.document.querySelectorAll('a.titleLink')];

  let recycleableItems = [];
  let i = 0;

  nodeList.filter(noParens).forEach(link => {
    //console.log(link.textContent);
    recycleableItems[i] = link.textContent.toLowerCase().trim();
    i++;
  });

    const response2 = await got(vgm2Url);
    const dom2 = new JSDOM(response2.body);
    const nodeList2 = [...dom2.window.document.querySelectorAll('a.titleLink')];
  
    let garbageItems = [];
    let j = 0;
  
    nodeList2.filter(noParens).forEach(link => {
      //console.log(link.textContent);
      garbageItems[j] = link.textContent.toLowerCase().trim();
      j++;
    });

    const response3 = await got(vgm3Url);
  const dom3 = new JSDOM(response3.body);

  // Create an Array out of the HTML Elements for filtering using spread syntax.
  const nodeList3 = [...dom3.window.document.querySelectorAll('a.titleLink')];

  let organicItems = [];
  let k = 0;

  nodeList3.filter(noParens).forEach(link => {
    //console.log(link.textContent);
    organicItems[k] = link.textContent.toLowerCase().trim();
    k++;
  });

  const response4 = await got(vgm4Url);
    const dom4 = new JSDOM(response4.body);
    const nodeList4 = [...dom4.window.document.querySelectorAll('a.titleLink')];
  
    let yardItems = [];
    let l = 0;
  
    nodeList4.filter(noParens).forEach(link => {
      //console.log(link.textContent);
      yardItems[l] = link.textContent.toLowerCase().trim();
      l++;
    });

    const response5 = await got(vgm5Url);
  const dom5 = new JSDOM(response5.body);

  // Create an Array out of the HTML Elements for filtering using spread syntax.
  const nodeList5 = [...dom5.window.document.querySelectorAll('a.titleLink')];

  let crcItems = [];
  let m = 0;

  nodeList5.filter(noParens).forEach(link => {
    //console.log(link.textContent);
    crcItems[m] = link.textContent.toLowerCase().trim();
    m++;
  });

  const response6 = await got(vgm6Url);
    const dom6 = new JSDOM(response6.body);
    const nodeList6 = [...dom6.window.document.querySelectorAll('a.titleLink')];
  
    let specialItems = [];
    let n = 0;
  
    nodeList6.filter(noParens).forEach(link => {
      //console.log(link.textContent);
      specialItems[n] = link.textContent.toLowerCase().trim();
      n++;
    });
    
  /*const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });*/
  
  let found = false;
  
  
  function checkItem() {

    var item = document.getElementById("item").value;
    
    for(let i = 0; i < recycleableItems.length; i++){
      if(recycleableItems[i].includes(item.toLowerCase().trim())) {
          console.log("This item is recycleable!");
          document.write("This item is recycleable!");
          found = true;
          break;
      }
  }

  if(found === false) {
      for(let k = 0; k < organicItems.length; k++){
          if(organicItems[k].includes(item.toLowerCase().trim())) {
              console.log("This item is NOT recycleable! BUT you can compost it instead!");
              document.write("This item is NOT recycleable! BUT you can compost it instead!");
              found = true;
              break;
          }
      }
  }
  
  if(found === false) {
      for(let l = 0; l < yardItems.length; l++){
          if(yardItems[l].includes(item.toLowerCase().trim())) {
              console.log("This item is NOT recycleable! Throw it in yard waste instead!");
              document.write("This item is NOT recycleable! Throw it in yard waste instead!");
              found = true;
              break;
          }
      }
  }
  
  if(found === false) {
      for(let m = 0; m < crcItems.length; m++){
          if(crcItems[m].includes(item.toLowerCase().trim())) {
              console.log("This item is NOT recycleable! Please take it to your local recycling center to be disposed of, it CANNOT be picked up at the curb!");
              document.write("This item is NOT recycleable! Please take it to your local recycling center to be disposed of, it CANNOT be picked up at the curb!");
              found = true;
              break;
          }
      }
  }
  
  if(found === false) {
      for(let n = 0; n < specialItems.length; n++){
          if(specialItems[n].includes(item.toLowerCase().trim())) {
              console.log("This item is NOT recycleable! Please take it to special services!");
              document.write("This item is NOT recycleable! Please take it to special services!");
              found = true;
              break;
          }
      }
  }
  
  if(found === false) {
      for(let j = 0; j < garbageItems.length; j++){
          if(garbageItems[j].includes(item.toLowerCase().trim())) {
              console.log("This item is NOT recycleable! Throw it in the garbage instead!");
              document.write("This item is NOT recycleable! Throw it in the garbage instead!");
              found = true;
              break;
          }
      }
  }

  if(found === false) {
      console.log("This item was not found. Please try refining your search.");
      document.write("This item was not found. Please try refining your search.");
  }
  
  }
})();

