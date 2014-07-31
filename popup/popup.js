var sendRequest = function(i) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://lgtm.camph.net/random.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      var image = document.getElementById('image-' + i);
      image.setAttribute('src', data.image_file);
      image.addEventListener('click', function() {
        chrome.tabs.sendMessage(tabId, {markdown: data.markdown}, function(response) {});
      });
    }
  };
  xhr.send();
};

var load = function() {
  var tabId = 0;
  chrome.tabs.query({active: true}, function(tab){
    tabId = tab[0].id;
  });
  for (var i = 0; i < 3; i++) {
    sendRequest(i);
  }
};

window.onload = function() {
  load();
  document.getElementById('reload-button').addEventListener('click', function() {
    load();
  });
};

