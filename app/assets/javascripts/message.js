$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<ul class="messages" data-message-id=${message.id}>
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
        <img src=${message.image} >`
      return html
    } else {
      let html =
      `<ul class="messages" data-message-id=${message.id}>
        <li class="message-list__message-name">
          ${message.user_name}
        </li>
        <li class="message-list__message-time">
          ${message.created_at}
        </li>
      </ul>
      <p class="messages">
          ${message.content}
      </p>`
      return html
    }
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

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('ul.messages:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});