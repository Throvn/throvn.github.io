fetch("https://api.github.com/users/throvn/repos").then((data) => {
    if(data.status === 200) return data.json();
    }).then((data) => {
        data.forEach(el => {
            if(el.name !== 'TravelingSalesman' && el.name !== 'throvn.github.io' && el.name !== 'react-navigation' && el.name !== 'chat-app' && el.name !== 'pong' && el.name !== 'hangman' && el.name !== 'haya')
            $("#repos").append('<li><a class="text-white" style="text-decoration: underline;" href="'+el.html_url+'">'+el.name+'</a><ul style="font-size: 25px;"><li>'+el.language+'</li><li>'+el.description+'</li></ul></li>');
        })
    })