
document.addEventListener('DOMContentLoaded', function() {
    const rock = document.querySelector('#rock');
    const paper = document.querySelector('#paper');
    const sissor = document.querySelector('#sissor');
    const myimg = document.querySelector('#my_img');
    const comimg = document.querySelector('#com_img');
    let myArray = new Array();
    myArray[0] = "/game img/paper.png"
    myArray[1] = "/game img/rock.jpeg"
    myArray[2] = "/game img/sissor.jpeg"
    
    let a;

    function imagetime(){
        a = Math.floor(Math.random() * 3);
        comimg.src = myArray[a];
    }

    setInterval(imagetime, 150);
    
    sissor.onclick = () => {
        myimg.src = "/game img/sissor.jpeg";
        clearInterval();
        if(a == 0)
        {
            alert('승리');
        }
        else if(a == 2)
        {
            alert('비겼습니다');
        }
        else
        {
            alert('패배');
        }
    }

    rock.onclick = () => {
        myimg.src = "/game img/rock.jpeg";
        clearInterval();
        if(a == 0)
        {
            alert('패배');
        }
        else if(a == 2)
        {
            alert('승리');
        }
        else
        {
            alert('비겼습니다');
        }
    }

    paper.onclick = () => {
        myimg.src = "/game img/paper.png";
        clearInterval();
        if(a == 0)
        {
            alert('비겼습니다');
        }
        else if(a == 2)
        {
            alert('패배');
        }
        else
        {
            alert('승리');
        }
    }

    
});