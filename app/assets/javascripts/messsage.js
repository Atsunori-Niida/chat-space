$(function(){ 
  function buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
      var html = `<div class= "message" data-message-id=${message.id}>
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      ${image}
      </div>
    </div>`
    return html;
  };

$('#new_message').on('submit', function(e){

 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: 'POST',
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(message){

    var html = buildHTML(message);
    $(".main_chat").append(html);
    $('.main_chat').animate({scrollTop: $('.main_chat')[0].scrollHeight}, 'fast');         
    $('#new_message')[0].reset();
    $('.form__submit').prop('disabled', false);
  })
  .fail(function(){
    alert('error');
    $('.form__submit').prop('disabled', false);
  });
  return false;
});
var reloadMessages = function () {
  
if (window.location.href.match(/\/groups\/\d+\/messages/)){
  var last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: 'api/messages',
    type: 'get',
    data: {id: last_message_id},
    dataType: 'json'
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message){
      insertHTML = buildHTML(message)
      $('.main_chat').append(insertHTML);
    })
    $('.main_chat').animate({scrollTop: $('.main_chat')[0].scrollHeight}, 'fast');
  })
  .fail(function() {
    alert('メッセージ送信に失敗しました');
  });
};
}
setInterval(reloadMessages, 4000);
})
