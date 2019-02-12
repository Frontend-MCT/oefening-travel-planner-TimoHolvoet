{
  let countryHolder;
  const showCountries = data => {
    let countries = '';
    for (const c of data) {
      countries += `
      <article>
        <input id="${c.cioc}" class="o-hide c-country-input" type="checkbox">
        <label for="${c.cioc}" class="c-country"></label>
        <div class="c-country-header">
          <h2 class="c-country-header-name js-country">${c.name}</h2>
          <img class="c-country-header-flag js-country-flag" src="${c.flag}" alt="The flag of ${c.name}">
        </div>
        <p class="c-country__native_name js-country-native">${c.nativeName}</p>
        <img src="" alt="" class="">
      </article>
      `
    };
    countryHolder.innerHTML = countries;
  };

  const fetchCountries = (region) => {
    fetch(`https://restcountries.eu/rest/v2/region/${region}?fields=name;nativeName;flag`)
      .then(function(r) {
        return r.json();
      })
      .then(function(myJson) {
        showCountries(myJson);
      }).catch(err => console.error(`An error occured: , ${err}`));
  };

  const enableListeners = () => {
    countryHolder = document.querySelector(".js-country-holder");
    fetchCountries("europe");
    const regionButtons = document.querySelectorAll(".js-region-select");
    for (const button of regionButtons) {
      button.addEventListener("click", function() {
        //console.log(this);
        //console.log(this.innerText);
        //console.log(this.getAttribute("data-region"));
        let region = this.getAttribute("data-region");
        fetchCountries(region);
      });
    };
  };

  const init = () => {
    enableListeners();
  };

  document.addEventListener('DOMContentLoaded', init);
}