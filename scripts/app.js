/**
* Load the cloud search widget & auth libraries. Runs after
* the initial gapi bootstrap library is ready.
*/
function onLoad() {
  gapi.load('client:auth2:cloudsearch-widget', initializeApp)
}
var clientId = "693111728850-p815gr1jpo2q0et73oj2tb9b0duea2j9.apps.googleusercontent.com";
var searchApplicationName = "searchapplications/693111728850-p815gr1jpo2q0et73oj2tb9b0duea2j9.apps.googleusercontent.com";
/**
 * Initialize the app after loading the Google API client &
 * Cloud Search widget.
 */
function initializeApp() {
  // Load client ID & search app.
  loadConfiguration().then(function() {
    // Set API version to v1.
    gapi.config.update('cloudsearch.config/apiVersion', 'v1');

    // Build the result container and bind to DOM elements.
    var resultsContainer = new gapi.cloudsearch.widget.resultscontainer.Builder()
      .setSearchApplicationId(searchApplicationName)
      .setSearchResultsContainerElement(document.getElementById('search_results'))
      .setFacetResultsContainerElement(document.getElementById('facet_results'))
      .build();

    // Build the search box and bind to DOM elements.
    var searchBox = new gapi.cloudsearch.widget.searchbox.Builder()
      .setSearchApplicationId(searchApplicationName)
      .setInput(document.getElementById('search_input'))
      .setAnchor(document.getElementById('suggestions_anchor'))
      .setResultsContainer(resultsContainer)
      .build();
  }).then(function() {
    // Init API/oauth client w/client ID.
    return gapi.auth2.init({
        'clientId': clientId,
        'scope': 'https://www.googleapis.com/auth/cloud_search.query'
    });
  });
}