console.log(moment)
fetch("https://api.github.com/users/throvn/repos").then((data) => {
    if(data.status === 200) return data.json();
    }).then((data) => {
        let arr = [];
        data.forEach((el) => {
            if(el.name === 'TravelingSalesman' || el.name === 'throvn.github.io' || el.name === 'chat-app' || el.name === 'pong' || el.name === 'hangman' || el.name === "rushhour-browser") return;
            let content = 'no content'
            switch (el.language) {
                case 'JavaScript':
                    content = '<a class="text-dark no-decorations" href="'+el.html_url+'"><div class="card text-center border-warning mb-4"> <div class="card-header"> '+el.full_name+' </div><div class="card-body"> <h5 class="card-title">'+el.name+'</h5> <p class="card-text"> '+el.description+' </p><span class="badge badge-pill badge-warning">JavaScript</span> </div><div class="card-footer text-muted">'+moment(el.updated_at).fromNow()+'</div></div></a>'
                    break;
                case 'HTML':
                    content = '<a class="text-dark no-decorations" href="'+el.html_url+'"><div class="card text-center border-danger mb-4"> <div class="card-header"> '+el.full_name+' </div><div class="card-body"> <h5 class="card-title">'+el.name+'</h5> <p class="card-text"> '+el.description+' </p><span class="badge badge-pill badge-danger">HTML</span> </div><div class="card-footer text-muted">'+moment(el.updated_at).fromNow()+'</div></div></a>'
                    break;
                case 'Python':
                    content = '<a class="text-dark no-decorations" href="'+el.html_url+'"><div class="card text-center border-primary mb-4"> <div class="card-header"> '+el.full_name+' </div><div class="card-body"> <h5 class="card-title">'+el.name+'</h5> <p class="card-text"> '+el.description+' </p><span class="badge badge-pill badge-primary">Python</span> </div><div class="card-footer text-muted">'+moment(el.updated_at).fromNow()+'</div></div></a>'
                    break;
                default:
                    break;
            }
            if (content !== 'no content') arr.push(content)
        })
        arr.forEach((el, index) => {
            if(index % 2 === 0) $('#reposL').append(el)
            else if(index % 2 === 1) $('#reposR').append(el)
        })
    })