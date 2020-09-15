function getGlobalData() {
  return axios.get("https://corona.lmao.ninja/v2/all?today");
}

function getCountriesData() {
  return axios.get("https://corona.lmao.ninja/v2/countries");
}
axios
  .all([getGlobalData(),getCountriesData()])
  .then(axios.spread(function(global,countries){
    var totalCases = global.data.cases.toLocaleString();
      var totalDeaths = global.data.deaths.toLocaleString();
      var totalRecovered = global.data.recovered.toLocaleString();
      var totalactive=global.data.active.toLocaleString();
      var todaycases = global.data.todayCases.toLocaleString();
      var todaydeath = global.data.todayDeaths.toLocaleString();
      var tests = global.data.tests.toLocaleString();
      var critical = global.data.critical.toLocaleString();

      document.getElementsByClassName(
        "globalcases"
      )[0].childNodes[1].innerHTML = totalCases;
      document.getElementsByClassName(
        "globalactive"
      )[0].childNodes[1].innerHTML = totalactive;
      document.getElementsByClassName(
        "globalrecovered"
      )[0].childNodes[1].innerHTML = totalRecovered;
      document.getElementsByClassName(
        "globaldeaths"
      )[0].childNodes[1].innerHTML = totalDeaths;
      document.getElementsByClassName(
        "todaycases"
      )[0].childNodes[1].innerHTML = todaycases;
      document.getElementsByClassName(
        "todaydeath"
      )[0].childNodes[1].innerHTML = todaydeath;
      document.getElementsByClassName(
        "tests"
      )[0].childNodes[1].innerHTML = tests;
      document.getElementsByClassName(
        "critical"
      )[0].childNodes[1].innerHTML = critical;


      const tbody = document.getElementsByTagName("tbody")[0];
      var countries = countries.data;
      countries.forEach(function (element, index, array) {
        const tr = document.createElement("tr");
        //  flag
        const img = document.createElement("img");
        img.src = element.countryInfo.flag;
        img.alt = element.countryInfo.iso2;
        img.setAttribute("title", element.countryInfo.iso2);
        var values = [
          element.country,
          element.cases,
          element.todayCases,
          element.deaths,
          element.todayDeaths,
          element.recovered,
          element.active,
          element.critical,
         /* element.casesPerOneMillion,
          element.deathsPerOneMillion,*/

        ];
        values.forEach(function (element, index, array) {
          const td = document.createElement("td");
          element =
            validation.isNumber(element) === "NaN"
              ? element
              : element.toLocaleString();
          if (!index) {
            let text = document.createTextNode(element);
            td.appendChild(img);
            td.appendChild(text);
          } else {
            td.innerHTML = element;
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    })
  )
  .catch(function (error) {
    console.log(error);
  });


var validation = {
  isNumber: function (str) {
    //  /^\d+$/g is equal to /^[0-9]+$/g;
    var patt = /^\d+$/g;
    return patt.test(str);
  }
};

var search = document.getElementById("search");
search.addEventListener("keyup", function () {
  var value = this.value.toLowerCase();
  console.log("value", value);
  const rows = document.querySelectorAll("tbody tr");
  const rowsArray = Array.prototype.slice.call(rows);
  rowsArray.forEach(function (element, index, array) {
    var tdCountry = element.childNodes[0].innerHTML.toLowerCase();
    if (tdCountry.indexOf(value) > -1) {
      //console.log(tdCountry, tdCountry.indexOf(value));
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
});

function changeOrder() {
  const value = document.getElementById("select").value;
  const index = document.getElementById("select").selectedIndex;
  //console.log(value, index);
  const rows = document.querySelectorAll("tbody tr");
  const rowsArray = Array.prototype.slice.call(rows);
  rowsArray
    .sort(function (A, B) {
      var num1 = A.childNodes[index].innerHTML;
      num1 = num1.replace(",", "");
      var num2 = B.childNodes[index].innerHTML;
      num2 = num2.replace(",", "");
      return num2 - num1;
    })
    .forEach(function (tr) {
      tr.parentElement.appendChild(tr);
    });
  //console.log(rowsArray);
}

document.querySelector(".arrow__up").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.querySelector(".arrow__down").addEventListener("click", function () {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
});