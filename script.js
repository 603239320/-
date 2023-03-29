$(document).ready(function() {
  // Set up OpenAI API key
  const OPENAI_API_KEY = "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";

  // Set up chatbot
  const chatbot = {
    send: function(message) {
      $.ajax({
        url: "https://api.openai.com/v1/engines/davinci-codex/completions",
        method: "POST",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);
        },
        data: JSON.stringify({
          prompt: "User: " + message + "\nBot:",
          max_tokens: 150,
          temperature: 0.5,
          n: 1,
          stop: "\n"
        }),
        contentType: "application/json",
        success: function(data) {
          const response = data.choices[0].text.trim();
          chatbot.display(response, "bot");
        }
      });
    },
    display: function(message, sender) {
      const conversation = $(".conversation");
      const messages = $("#messages");
      const listItem = $("<li></li>");
      listItem.addClass(sender);
      listItem.text(message);
      messages.append(listItem);
      conversation.scrollTop(conversation.prop("scrollHeight"));
    }
  };

  // Set up event listeners
  $("#send").click(function() {
    const input = $("#input").val().trim();
    if (input !== "") {
      chatbot.display(input, "user");
      chatbot.send(input);
      $("#input").val("");
    }
  });
  $("#input").keydown(function(event) {
    if (event.which === 13) {
      event.preventDefault();
      $("#send").click();
    }
  });
});
