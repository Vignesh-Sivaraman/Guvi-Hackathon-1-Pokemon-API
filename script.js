"use strict";
const body = document.body;
const contentDiv = document.createElement("div");
contentDiv.classList.add("content-responsive");
body.append(contentDiv);

// // Creating table function
// function addItems(dataArray, page) {
//   let table = document.createElement("table");
//   table.classList.add("table", "table-bordered");
//   table.innerHTML = `<thead>
//    <tr>
//      <th>S.no</th>
//      <th>Name</th>
//      <th>Email</th>
//    </tr>
//  </thead>
// `;
//   let tableBody = document.createElement("TBODY");
//   tableBody.setAttribute("id", "t-body");
//   table.append(tableBody);
//   let start = page * 10 - 10;
//   let end = page * 10;
//   for (let i = start; i < end; i++) {
//     let currentData = dataArray[i];
//     let currentRow = document.createElement("TR");
//     let data1 = document.createElement("TD");
//     let data2 = document.createElement("TD");
//     let data3 = document.createElement("TD");
//     data1.innerText = `${currentData.id}`;
//     data2.innerText = `${currentData.name}`;
//     data3.innerText = `${currentData.email}`;
//     currentRow.append(data1, data2, data3);
//     tableBody.append(currentRow);
//     table.append(tableBody);
//     tableDiv.append(table);
//   }
// }

// Section 1:-  To get the 50 pokemon Names from pokeapi
async function getPokemonNames(page) {
  try {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    let data = await res.json();
    let start = page * 5 - 5;
    let end = page * 5;
    let pageContent = data.results;
    pageContent = pageContent.slice(start, end);
    pageContent.forEach((element) => {
      getPokemonData(element.name);
    });
  } catch (err) {
    console.error(err);
  }
}

// Section-2:- To get the data for each pokemon data
async function getPokemonData(pokemonName) {
  try {
    // contentDiv.innerHTML = ``;
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    let data = await res.json();
    // let name = PokemonName;
    let pokemonImageSource = data.sprites.front_default;
    let pokemonAbilities = [];
    let pokemonWeight = data.weight;
    let pokemonMoves = [];
    data.abilities.forEach((element) => {
      pokemonAbilities.push(element.ability.name);
    });
    data.moves.forEach((element) => {
      pokemonMoves.push(element.move.name);
    });
    const card = document.createElement("div");
    card.classList.add("card");
    const details = document.createElement("div");
    details.classList.add("details");
    const image = document.createElement("img");
    image.setAttribute("src", `${pokemonImageSource}`);
    image.setAttribute("alt", `${pokemonName}`);
    card.append(image, details);
    const abilities = document.createElement("div");
    abilities.classList.add("abilities");
    abilities.innerText = "Abilities:";
    pokemonAbilities.forEach((ele) => {
      const listItem = document.createElement("li");
      listItem.innerText = ele;
      abilities.append(listItem);
    });
    const weight = document.createElement("div");
    weight.classList.add("weight");
    weight.innerText = `Weight: ${pokemonWeight} hg`;
    details.append(abilities, weight);
    contentDiv.append(card);
  } catch (err) {
    console.error(err);
  }
}

//  To create page buttons
function createButtons(name) {
  let ButtonName = name;
  ButtonName = document.createElement("button");
  ButtonName.setAttribute("id", `${name}`);
  ButtonName.setAttribute("name", "pageButtons");
  ButtonName.innerText = `${name}`;
  return ButtonName;
}

getPokemonNames(1);
let buttonBox = document.createElement("div");
buttonBox.classList.add("buttons");
buttonBox.setAttribute("id", "allButtons");
const pages = ["First", "Previous"];
for (let i = 1; i <= 10; i++) pages.push(i);
pages.push("Next");
pages.push("Last");
for (let buttons of pages) {
  buttons = createButtons(buttons);
  buttonBox.append(buttons);
}
body.append(buttonBox);
// adding page click functionality
const btngroup = document.getElementsByName("pageButtons");
let currentPage = 1;
for (let buttons of btngroup) {
  buttons.addEventListener("click", () => {
    // console.log(buttons.id);
    let temp = document.getElementById(currentPage.toString());
    console.log(temp);
    let pageNumber;
    contentDiv.innerHTML = ``;
    switch (buttons.id) {
      case "First":
        pageNumber = 1;
        currentPage = 1;
        break;
      case "Last":
        pageNumber = 10;
        currentPage = 10;
        break;
      case "Previous":
        if (currentPage > 1) {
          pageNumber = currentPage - 1;
          currentPage = currentPage - 1;
        } else {
          pageNumber = currentPage;
        }
        break;
      case "Next":
        if (currentPage < 10) {
          pageNumber = currentPage + 1;
          currentPage = currentPage + 1;
        } else {
          pageNumber = currentPage;
        }
        break;
      default:
        currentPage = parseInt(buttons.id);
        pageNumber = currentPage;
    }
    let finish = document.getElementById(pageNumber);
    temp.classList.remove("active");
    finish.classList.add("active");
    getPokemonNames(pageNumber);
  });
}
