$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="messages">
          <ul>
            <li class="message-list__message-name">
              ${message.user_name}
            </li>
            <li class="message-list__message-time">
              ${message.created_at}
            </li>
          </ul>
          <p class="messages">
              ${message.content}
          </p>
          <img src=${message.image} >
       </div>`
      return html
    } else {
      let html =
       `<div class="messages">
          <ul>
            <li class="message-list__message-name">
              ${message.user_name}
            </li>
            <li class="message-list__message-time">
              ${message.created_at}
            </li>
          </ul>
          <p class="messages">
              ${message.content}
          </p>
        </div>`
      return html
    };
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message)
      $(".chat-main__message-list").append(html)
      $('form')[0].reset()
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight})
      $('.submit-button').prop('disabled', false)
    })
    .fail(function(){
      alert("メーセージ送信に失敗しました。")
      $('.submit-button').prop('disabled', false)
    })
  })
})