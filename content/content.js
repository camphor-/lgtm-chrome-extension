chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var textarea = document.getElementById('new_comment_field');
  textarea.value = textarea.value + "\n\n" + request.markdown;
});
